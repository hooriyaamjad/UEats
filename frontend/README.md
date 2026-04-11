# UEats Frontend

This is the React frontend for UEats, a campus food discovery app that helps users browse university-area restaurants, explore menus, save favourites, write reviews, and share recommendations.

The frontend is built with Vite and connects to the Django REST backend.

## Frontend Includes

The client app covers the main user flows for UEats:

- landing page with guest access
- signup, login, and password reset flows
- protected profile pages for authenticated users
- restaurant browsing with search and tag filtering
- restaurant detail pages with menu, recommendations, and reviews tabs
- favourites, personal preferences, and profile editing
- review creation and restaurant replies
- recommendation creation and voting

## Project Structure

```text
frontend/
|-- public/
|-- src/
|   |-- assets/        # images and icons
|   |-- components/    # reusable UI components
|   |-- context/       # shared React context
|   |-- pages/         # route-level screens
|   `-- utils/         # API client and helpers
|-- package.json
`-- vite.config.js
```

## Running the Frontend

From the `frontend/` directory:

```bash
npm install
npm run dev
```

The app will start on:

```text
http://localhost:5173
```

## Available Scripts

- `npm run dev` starts the Vite development server
- `npm run build` creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint

## Routing Overview

Some of the main routes in the app include:

- `/` landing page
- `/login` and `/signup` authentication flows
- `/view-restaurants` restaurant listing page
- `/restaurant/:id/:tab` restaurant detail page
- `/home` authenticated home screen
- `/profile` and `/edit-profile` profile management
- `/my-reviews` and `/my-recommendations` personal activity pages