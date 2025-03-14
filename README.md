# HomeScope

A React Native property rental app for browsing, exploring, and booking residential properties — built to showcase a clean, production-grade mobile codebase.

## Tech Stack

- **React Native** + **Expo** (SDK 52)
- **TypeScript** (strict)
- **Appwrite** — auth, database, storage
- **Expo Router** — file-based navigation
- **Gorhom Bottom Sheet** — booking and filter modals
- **Moti** — skeleton loaders
- **React Native Maps** — property location view

## Key Features

- Google OAuth authentication
- Property browsing with type filters and search
- Advanced filters (price range, area) via bottom sheet
- Property detail pages with image carousel, agent info, map, and reviews
- Full-screen image gallery
- Multi-step booking flow (guest info → payment)
- User profile management
- Booking and payment history

## Running Locally

```bash
npm install
```

Copy `.env.example` to `.env` and fill in your Appwrite credentials:

```bash
cp .env.example .env
```

Start the app:

```bash
npx expo start
```

### Seeding Data

One-off seed scripts live in `scripts/`. Run them directly with `ts-node` or via the Expo REPL after configuring your Appwrite credentials.

## Demo Credentials

Sign in with any Google account — a user document is created automatically on first login.
