# UCab: Cab Booking System (MERN)

A full-stack cab booking platform with separate **rider** and **admin** experiences. Riders browse cabs and book rides; admins manage the fleet, users and bookings from a dashboard with charts.

## Features

**Riders**
- Register / login (JWT, bcrypt)
- Browse available cabs with type, price and photo
- Book a ride with pickup / drop state, city, date and time
- View booking history and status

**Admins**
- Separate admin auth and role-protected routes
- Add, edit and delete cabs, with image upload via **Multer**
- Manage users and all bookings, and update booking status
- Dashboard with stats and charts (**Recharts**)

## API overview

| Area | Endpoints |
|---|---|
| Users | `POST /api/users/register`, `POST /api/users/login`, `GET /api/users/profile`, admin: `GET /api/users/all`, `PUT/DELETE /api/users/:id` |
| Admin | `POST /api/admin/register`, `POST /api/admin/login`, `GET /api/admin/dashboard` |
| Cars | `GET /api/cars`, `GET /api/cars/:id`, admin: `POST /api/cars`, `PUT/DELETE /api/cars/:id` (multipart image) |
| Bookings | `POST /api/bookings`, `GET /api/bookings/my`, admin: `GET /api/bookings/all`, `PUT /api/bookings/:id/status`, `DELETE /api/bookings/:id` |

## Project structure

```
server.js         Express entry point (serves /uploads statically)
controllers/      user, admin, car and booking logic
middlewares/      JWT auth, admin guard, Multer upload config
models/           User, Admin, Car, Booking schemas
routes/           REST routes
client/           React 18 + Vite frontend (rider pages + admin dashboard)
```

## Run locally

```bash
npm install
cp .env.example .env      # set MONGO_URI, JWT_SECRET, PORT
node server.js            # API on http://localhost:8000

cd client
npm install
npm run dev
```

Set the API base URL in `client/src/api.js` to your local or deployed backend.

## Stack

MongoDB · Express · React · Node.js · JWT · Multer · Recharts · Axios · Vite
