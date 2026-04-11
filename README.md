# UEats

*UEats* is a full-stack campus food discovery app for University of Calgary students. It helps users to browse restaurants, explore menus, save favourites, write reviews, and share recommendations for what to order. 

This project is split into a *React* frontend and a *Django* REST backend, with seed data included so the app is easy to work with locally.

## What the Repo Does

UEats supports the main flows you would expect in a student-focused restaurant finder:

- account signup, login, and JWT-based authentication
- student and non-student profile management
- restaurant browsing with menu, pricing, hours, and tag data
- favourites and personal food preferences
- restaurant reviews and restaurant replies to reviews
- user recommendations for menu items
- password reset flow
- Django admin access for managing app data

The seeded development data includes sample users plus campus restaurant records, reviews, and recommendations.

## Tech Stack

- Frontend: React 19, Vite, React Router, Axios, Tailwind CSS, MUI
- Backend: Django 6, Django REST Framework
- Local database: SQLite
- Production-oriented Docker setup: PostgreSQL

## Repo Structure

```text
.
|-- frontend/   # React + Vite client
|-- backend/    # Django API, models, seed commands, admin
|-- docker-compose.yml
|-- docker-compose.dev.yml
`-- docker-compose.prod.yml
```

## Local Setup

### 1. Environment file

Please ask a team member for the `.env` values and place the file in `backend/.env`!

For local development, the backend defaults to SQLite. Email-related values in the `.env` file are used for password reset functionality.

### 2. Start the backend

From the repository's root:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment (run the command depending on your system):

```bash
# macOS / Linux
source venv/bin/activate

# Windows Command Line
\venv\Scripts\Activate

# Windows PowerShell
.\venv\Scripts\Activate.ps1
```

Install dependencies and initialize the database:

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_db
```

Optional: create an admin user for the Django admin panel at `http://localhost:8000/admin/`

```bash
python manage.py createsuperuser
```

Start the backend server:

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`.

### 3. Start the frontend

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173/`.

## Seeded Test Data

After running `python manage.py seed_db`, the backend includes:

- sample user profiles
- restaurant listings and menu items
- sample reviews
- sample recommendations

More database details and seed command info are documented in [`backend/README.md`](./backend/README.md).

## Running with Docker

### Development containers

This starts the frontend and backend with development-oriented settings and mounted volumes for live reload.

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

### Production-style containers

This uses PostgreSQL and reads environment variables from the repo root `.env` file.

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

## Useful URLs

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000/api/`
- Django Admin: `http://localhost:8000/admin/`

## Contributions

UEats couldn't have been done by: Afrah Mohammad, Hooriya Amjad, Sahiti Akella, Nishan Soni and Wilson Zheng. :)