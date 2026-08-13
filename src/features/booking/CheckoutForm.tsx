import { useActionState, useState } from "react";
import type { Booking } from "../../shared/types/booking";
import { createBooking } from "./api";
import { SubmitButton } from "../../shared/ui/SubmitButton";
import { estimateStayTotal } from "../../shared/lib/pricing";

import "./CheckoutForm.css"

interface Props {
    stayId: string
    pricePerNight: number;
    onCreated: (booking: Booking) => void
}

type FormState = { error: string } | null

export function CheckoutForm({ stayId, pricePerNight, onCreated }: Props) {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('') 
    
    const [state, checkoutAction] = useActionState(
        async (_prev: FormState, formData: FormData): Promise<FormState> => {
            const guestName = String(formData.get('guestName') ?? '').trim();
            const guestEmail = String(formData.get('guestEmail') ?? '').trim();
            const checkIn = String(formData.get('checkIn') ?? '').trim();
            const checkOut = String(formData.get('checkOut') ?? '').trim();
            const cardNumber = String(formData.get('cardNumber') ?? '').replace(/\D/g, '');

            if (!guestName || !guestEmail || !checkIn || !checkOut) {
                return { error: 'Name, email, and dates are required.' };
            }
            
            if (checkOut <= checkIn) {
                return { error: 'Check out must be after check in.' };
            }

            const paymentLast4 = cardNumber.slice(-4) || undefined;

            try {
                const booking = await createBooking({
                    stayId,
                    guestName,
                    guestEmail,
                    checkIn,
                    checkOut,
                    paymentLast4,
                });
                onCreated(booking);
                return null;
            } catch (error) {
                return {
                    error: error instanceof Error ? error.message : 'Failed to create booking'
                }
            }
        },
        null
    )

    const total = estimateStayTotal(pricePerNight, checkIn, checkOut);

    return (
        <form className="checkout-form" action={checkoutAction}>
            <h2 className="checkout-form__title">Checkout</h2>
            <div className="checkout-form__field">
                <label htmlFor="guest-name">Name</label>
                <input id="guest-name" name="guestName" type="text" autoComplete="name" required />
            </div>
            <div className="checkout-form__field">
                <label htmlFor="guest-email">Email</label>
                <input id="guest-email" name="guestEmail" type="email" autoComplete="email" required />
            </div>
            <div className="checkout-form__field">
                <label htmlFor="check-in">Check in</label>
                <input id="check-in" name="checkIn" type="date" required onChange={(e) => setCheckIn(e.target.value)} />
            </div>
            <div className="checkout-form__field">
                <label htmlFor="check-out">Check out</label>
                <input id="check-out" name="checkOut" type="date" required onChange={(e) => setCheckOut(e.target.value)} />
            </div>
            <div className="checkout-form__field">
                <label htmlFor="card-number">Card number</label>
                <input
                    id="card-number"
                    name="cardNumber"
                    type="text"
                    inputMode="numeric"
                    minLength={4}
                    placeholder="4242 4242 4242 4242"
                    required
                />
            </div>

            {state?.error ? (
                <p className="checkout-form__error" role="alert">
                {state.error}
                </p>
            ) : null}

            {total && (
                <div className="checkout-form__summary">
                    <div className="checkout-form__summary-row">
                        <span>
                            ${total.nightlyRate} × {total.nights}{' '}
                            {total.nights === 1 ? 'night' : 'nights'}
                        </span>
                        <span>${total.total}</span>
                    </div>
                    <div className="checkout-form__summary-total">
                        <span>Total</span>
                        <strong>${total.total}</strong>
                    </div>
                </div>
            )}

            <SubmitButton label="Confirm booking" pendingLabel="Booking…" />
        </form>
    )
}