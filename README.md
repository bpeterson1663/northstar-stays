# Northstar Stays

Northstar Stays is a React + TypeScript travel booking application focused on Minnesota cabins, lake homes and lodges.

**Live application:** https://northstar-stays.web.app/
**Backend API Docs:** https://northstar-stays-api-509218226750.us-central1.run.app/docs/
**Backend repository:** https://github.com/bpeterson1663/northstar-stays-backend

## Features
* Browse and search stays
* View stay details
* View and add reviews
* View pricing
* Complete a mocked checkout flow
* Responsive layouts
* Loading, empty and error states

## Tech Stack
### Frontend
* React
* TypeScript
* Vite
* React Router
* Native CSS
* Firebase Hosting
### Backend
* Go
* Gin
* In-memory seeded data
* OpenAPI documentation
* Docker
* Google Cloud Run

## Architecture
The frontend is organized primarily by product feature:

```text
src/
├── app/
├── features/
│   ├── booking/
│   ├── reviews/
│   └── stays/
├── pages/
└── shared/
    ├── api/
    ├── lib/
    ├── styles/
    ├── types/
    └── ui/
```

Feature-specific UI, API functions and hooks stay close to the domain they belong to. Route-level components live under `pages`, while reusable infrastructure and domain-agnostic UI live under `shared`.

The frontend and backend are intentionally maintained as separate applications with a REST API contract between them.

Third-party dependencies were kept to a minimum. If a dependency did not provide meaningful value for the current scope, it was not introduced.

## State Management

I intentionally did not introduce Redux or another global state library.

State is kept according to its ownership:

* Search and filter state lives in URL search parameters
* API request state is handled through feature-specific hooks
* Form state remains local to the component that owns it

The feature-driven architecture also keeps the door open to introducing a dedicated state library later if the application grows to require more complex cross-feature state.

## API

The frontend communicates with a small Go API.

```text
GET  /api/stays
GET  /api/stays/:id
GET  /api/stays/:id/reviews
POST /api/stays/:id/reviews
POST /api/bookings
GET  /api/bookings/:id
```

Generic HTTP behavior is isolated in the frontend's shared API client, while domain-specific requests remain with their respective features.

## Key Tradeoffs

**No global state library**
The application does not currently have enough cross-feature client state to justify the additional complexity. If future features introduced more complex shared state, a library such as Redux Toolkit could be added without changing the overall feature structure.

**Native fetch instead of Axios**
The HTTP requirements are straightforward and the shared API layer isolates the underlying transport implementation.

**Native CSS instead of a styling framework**
The UI surface is small enough that introducing Tailwind, Sass or a component library would add more setup than value.

**Mocked payment**
Payment behavior is simulated rather than integrating a real payment processor.

## Running Locally

The frontend defaults to the hosted Cloud Run API, so you do not need to run the backend to review the app.

```bash
npm install
npm run dev
```

To point at a local API instead, set `VITE_API_BASE_URL`, for example:

```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

Backend setup and API documentation are available in the [backend repository](https://github.com/bpeterson1663/northstar-stays-backend).

Note: the hosted API uses in-memory storage, so reviews and bookings are shared across users and reset when the Cloud Run instance restarts.

## Testing

Tests focus on meaningful behavior rather than maximizing coverage, including pricing calculations, rendering states, form behavior and API validation.

## What I Would Build Next

With additional time, I would prioritize:

* More advanced search and filtering
* Pagination for stays
* Date-based availability and server-side booking conflict validation
* Looking up previous bookings
* Broader integration and end-to-end testing

## AI Usage

I used AI as an implementation and review assistant during the project.

It helped with brainstorming, edge cases, architecture discussion, accessibility review and repetitive implementation work. I reviewed generated suggestions before using them and did not introduce patterns or dependencies I could not independently explain.

Architecture, product scope, tradeoffs and final code decisions remained my responsibility.
