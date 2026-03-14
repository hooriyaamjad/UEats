# UEats

## On Boarding

Before starting development do the following things.

### Env File
Please reach out to a team member for the .env file details and place the file in the project root.

### Backend

Navigate to the backend directory, make a venv, and install dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Run migrations to initialize the local sqlite db
```bash
python manage.py migrate
```

Populate database with seed data
```bash
python manage.py seed_db
```

Create a local superuser so you can access the admin panel (localhost:.../admin)
```
python manage.py createsuperuser
```


## Running the App

You can run the app with Docker or by running the individual components

### Run by starting the Individual Components
Backend
```bash
cd backend
python manage.py runserver
```

Frontend
```bash
cd frontend
npm run dev
```

### Run with Docker

Dev Environment
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

Prod Environment
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```