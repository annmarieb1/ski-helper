# Ski Helper

Ski Helper helps you find an ideal mountain/resort to ski and snowboard at based on your preferences, including drive time from starting location, lift ticket price, pass access, and ski/snowboard level.

# Tech Stack
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Tech Stack
Frontend
- React - JavaScript library
- Next.js (App Router)
  - Server-side API routes
  - Easier deployment
  - SEO
  - Server components for static mountain information
- TypeScript - language
- Tailwind CSS - styling
- shadcn/ui - component library
- TanStack Query (React Query) - fetching and caching API data

Backend
- Next.js Route Handlers
- TypeScript

Database
- `mountains.json` - Since this project is mostly based on utilizing data from external sources (Google Maps, OpenWeather, Snow API), we keep static mountain data in a JSON (for now).

Hosting
- Vercel
- GitHub
- GitHub Actions

## Project Structure
```
.next         -- Next.js files
app/          -- Next.js routing
components/   -- reusable React components
│
├── common/   -- generic components, such as EmptyState, ErrorMessage
├── layout/   -- components that appear on every page, such as NavBar, Header, Footer
├── filters/  -- user preference filters, such as DriveTimeSlider, DifficultyFilter
├── mountain/ -- anything specific to ski resorts, such as MountainCard, MountainTable
└── ui/       -- the user interface (UI)
data/         -- static data
hooks/        -- custom React hooks, such as useMountains() and useWeather()
lib/          -- shared libraries and configuration
public/       -- public, viewable images
services/     -- communication with APIs
types/        -- TypeScript interfaces
utils/        -- small helper functions, such as formatDriveTime() and sortMountains()
styles/       -- styling
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
