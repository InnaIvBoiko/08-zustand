# NoteHub

A production-ready note-taking app built with Next.js (App Router): SEO metadata and Open Graph/Twitter cards on every
page, the Roboto font via `next/font/google`, tag-based note filtering via parallel routes, a note-details modal via
intercepted routes, and note creation on its own route with a Zustand-backed, `localStorage`-persisted draft. Browse,
search, filter by tag, create, delete, and preview notes, with SSR + CSR powered by TanStack Query.

- **Live demo:** https://08-zustand-rho-eight.vercel.app/
- **Repository:** https://github.com/InnaIvBoiko/08-zustand

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [TanStack Query](https://tanstack.com/query) (React Query)
- [Axios](https://axios-http.com)
- [Zustand](https://zustand.docs.pmnd.rs) (with `persist` middleware) for the note creation draft
- [next/font/google](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for the Roboto font
- CSS Modules

## Routes

| Route                              | Description                                                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                | Home page with general information about the app.                                                                               |
| `/notes/filter/all`                | All notes, with search and pagination (SSR prefetch + CSR hydration).                                                           |
| `/notes/filter/[...slug]`          | Notes filtered by tag, with a parallel `@sidebar` slot for tag navigation (catch-all route; unknown tags render the 404 page).  |
| `/notes/action/create`             | Dedicated note creation page; the form auto-saves a draft to Zustand/`localStorage` as you type.                                |
| `/notes/[id]` (direct navigation)  | Full-page note details (SSR prefetch + CSR hydration).                                                                          |
| `/notes/[id]` (from a filter page) | Note details intercepted and rendered as a modal over the current list; closing returns to the route the modal was opened from. |
| any unknown route                  | Custom "404 - Page not found" page.                                                                                             |

Every route above ships its own SEO `metadata` (static, or `generateMetadata` for the dynamic filter/details/create
pages) with Open Graph and Twitter card tags.

## Project structure

- `app/` — routes, layouts, loading/error boundaries, and page-level `metadata`/`generateMetadata`.
    - `app/notes/filter/[...slug]/` — catch-all route for tag filtering.
    - `app/notes/filter/@sidebar/` — parallel route rendering the tag navigation menu.
    - `app/notes/action/create/` — dedicated note creation route.
    - `app/@modal/(.)notes/[id]/` — intercepted route rendering note details as a modal.
- `components/` — shared, route-agnostic UI components, each in its own folder with a `.tsx` and `.module.css` file.
- `lib/api/` — Axios client and API request modules.
- `lib/store/` — Zustand store (`noteStore.ts`) for the persisted note creation draft.
- `types/` — shared TypeScript types, including the hardcoded list of note tags.

## Getting started

1. Install dependencies:

    ```bash
    npm install
    ```

2. Create a `.env` file based on `.env.example` and set your NoteHub API token:

    ```bash
    NEXT_PUBLIC_NOTEHUB_TOKEN=your_token_here
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` — start the development server.
- `npm run build` — build the app for production.
- `npm run start` — start the production server.
- `npm run lint` — run ESLint.
- `npm run format` — format the code with Prettier.
- `npm run format:check` — check code formatting with Prettier.
