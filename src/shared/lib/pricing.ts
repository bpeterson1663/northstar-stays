export function estimateStayTotal(
    pricePerNight: number,
    checkIn: string,
    checkOut: string,
  ) {
    if (!checkIn || !checkOut || checkOut <= checkIn) {
        return null
    }

    const nights = Math.round(
      (Date.parse(checkOut) - Date.parse(checkIn)) / (1000 * 60 * 60 * 24),
    )

    if (nights < 1) {
        return null
    }
    
    return {
        nights,
        nightlyRate: pricePerNight,
        total: pricePerNight * nights,
    }
  }