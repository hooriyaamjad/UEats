# Database Information

UEats uses **SQLite**  via Django. The schema is defined through Django models and applied using Django's migration system.

## Schema

Django migrations serve as the schema script. Running `python manage.py migrate` creates all tables from the migration files in each app. 

The schema consists of the following tables:

### `auth_user` (Django built-in)
Django's built-in user table, used for authentication.

| Column | Type | Notes |
|---|---|---|
| id | integer | Primary key |
| username | varchar | Unique |
| email | varchar | |
| first_name | varchar | |
| last_name | varchar | |
| password | varchar | Hashed |
| is_active | boolean | |
| is_staff | boolean | |
| date_joined | datetime | |

### `profiles_profile`
Stores additional information for each user account.

| Column | Type | Notes |
|---|---|---|
| id | integer | Primary key |
| user_id | integer | FK → `auth_user.id` (one-to-one, CASCADE) |
| is_student | boolean | Whether the user is a student |
| university | varchar | University name |
| student_id | varchar | Nullable; unique together with `university` |
| preferences | JSON | Dietary preferences, cuisines, price range |
| created_at | datetime | Auto-set on creation |
| updated_at | datetime | Auto-updated |

### `profiles_profile_favourites` (join table)
Many-to-many between `Profile` and `Restaurant`.

| Column | Type | Notes |
|---|---|---|
| id | integer | Primary key |
| profile_id | integer | FK → `profiles_profile.id` |
| restaurant_id | integer | FK → `restaurants_restaurant.id` |

### `restaurants_restaurant`
Stores restaurant listings.

| Column | Type | Notes |
|---|---|---|
| id | integer | Primary key |
| name | varchar(255) | |
| description | text | |
| location | varchar(255) | |
| image_url | varchar | Nullable |
| menu_items | JSON | Array of `{"name": string, "price": number}` objects |
| min_price | decimal(6,2) | |
| max_price | decimal(6,2) | |
| days_of_operation | varchar(255) | e.g. `"Daily"`, `"Mon-Fri"` |
| opening_hours | varchar(255) | e.g. `"09:00"` |
| closing_hours | varchar(255) | e.g. `"20:00"` |
| rating | decimal(2,1) | Default 0.0 |
| created_at | datetime | Auto-set on creation |
| updated_at | datetime | Auto-updated |

### `restaurants_review`
User reviews for restaurants.

| Column | Type | Notes |
|---|---|---|
| id | integer | Primary key |
| profile_id | integer | FK → `profiles_profile.id` (CASCADE) |
| restaurant_id | integer | FK → `restaurants_restaurant.id` (CASCADE) |
| rating | decimal(2,1) | Default 0.0 |
| description | text | |
| created_at | datetime | Auto-set on creation |
| updated_at | datetime | Auto-updated |

### `restaurants_recommendation`
User recommendations for specific menu items at a restaurant.

| Column | Type | Notes |
|---|---|---|
| id | integer | Primary key |
| profile_id | integer | FK → `profiles_profile.id` (CASCADE) |
| restaurant_id | integer | FK → `restaurants_restaurant.id` (CASCADE) |
| description | text | |
| like_count | integer | Default 0 |
| dislike_count | integer | Default 0 |
| created_at | datetime | Auto-set on creation |
| updated_at | datetime | Auto-updated |



## Running the Schema Script

Django migrations act as the schema script. Migration files live in:
- `profiles/migrations/`
- `restaurants/migrations/`

To apply them and create all tables, run from the `backend/` directory:

```bash
python manage.py migrate
```

## Seeding Scripts

Seed data is split into four management commands:

| Command | File | What it seeds |
|---|---|---|
| `seed_restaurants` | `restaurants/management/commands/seed_restaurants.py` | 20 University of Calgary campus restaurants with full menus, pricing, and hours |
| `seed_profiles` | `profiles/management/commands/seed_profiles.py` | 3 sample user accounts with profiles and favourite restaurants |
| `seed_reccomendations` | `restaurants/management/commands/seed_reccomendations.py` | 1 recommendation per restaurant |
| `seed_reviews` | `restaurants/management/commands/seed_reviews.py` | 1 review per restaurant |
| `seed_db` | `common/management/commands/seed_db.py` | Master command — runs all four above in the correct order |

**Order matters:** restaurants must be seeded before profiles, and both must exist before reviews or recommendations can be seeded.

## Running the Seeding Script

The easiest way is to run the master `seed_db` command from the `backend/` directory, which handles ordering automatically:

```bash
python manage.py seed_db
```

To run individual seeders:

```bash
python manage.py seed_restaurants
python manage.py seed_profiles
python manage.py seed_reccomendations
python manage.py seed_reviews
```

> **Note:** Each seeder clears its own table before inserting fresh data, so running them multiple times is safe.

## Sample Seed Accounts

After running `seed_db`, the following accounts are available for testing:

| Username | Password | Student | University |
|---|---|---|---|
| `user123` | `SecurePass123!` | Yes | University of Calgary |
| `jane_smith` | `SecurePass456!` | Yes | University of Calgary |
| `mike_ross` | `SecurePass789!` | No | University of Alberta |
