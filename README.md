# CamHotel Frontend Web App

<p align="center">
  <strong>Premium hotel booking and operations platform (Frontend)</strong>
</p>

<table align="center">
  <tr>
    <th align="center">CamHotel</th>
    <th align="center">School</th>
  </tr>
  <tr>
    <td align="center">
      <img src="public/logo-tran.svg" alt="CamHotel Website Logo" width="220" />
    </td>
    <td align="center">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="public/logo/istad-dark.png" />
        <img src="public/logo/istad-light.png" alt="ISTAD School Logo" width="220" />
      </picture>
    </td>
  </tr>
</table>

CamHotel Frontend is the complete web interface for guests, staff, and admins in the CamHotel platform.  
It includes public marketing pages, room discovery, booking flows, role-based dashboards, and operational management screens connected to a backend API through Next.js route-handler proxies.

This project is organized by **ISTAD** (Institute of Science and Technology Advanced Development).

## All Features

### Public Website

- Home page with hero sections, room highlights, live ratings/testimonials, and CTAs.
- About page for team, mission, and vision.
- Contact page with inquiry form integration via EmailJS.
- Facilities page that loads rich facility content and images from backend data.
- Room listing page with:
  - keyword search
  - room type filter
  - date-range filters (check-in / check-out)
  - sorting (room number, price, top rating)
  - pagination
- Room detail page with amenities, pricing, rating display, and related rooms.
- Privacy policy page.
- Responsive UI and dark/light theme support.

### Authentication And Access

- User registration with validation and privacy-policy consent.
- User login with validation and secure redirect handling.
- Role-based redirects after login (`ADMIN`, `STAFF`, `CUSTOMER`).
- Protected route guards for admin, staff, and customer areas.
- Session bootstrap via `/auth/me`.
- Access-token handling with automatic refresh flow (`/auth/refresh`).
- Logout flow with token cleanup.

### Customer Features

- Customer dashboard with booking/room metrics and activity table.
- Book room flow with:
  - room selection by URL params
  - check-in/check-out validation
  - booking-policy enforcement (`leadTimeHours`, `maxBookingDays`)
  - total-night and total-price calculation
  - profile sync during booking (name/phone update)
- My Bookings page with booking status, date range, and total price view.
- Profile management:
  - update personal info
  - upload profile image
- My Rating module:
  - create rating
  - update rating
  - delete rating
  - star selector and description with limits
- Customer settings page (theme/preferences UI).

### Staff Features

- Staff dashboard overview.
- Booking Queue:
  - booking list with status filter
  - status update actions (workflow operations)
  - pagination
- Room Operations:
  - room list with status filter
  - update room status (`AVAILABLE`, `OCCUPIED`, `CLEANING`, `MAINTENANCE`)
  - pagination
- Payment Operations:
  - payment listing with status/keyword filtering
  - payment status update
  - create payment by booking ID
  - operational summary cards (counts/totals)
- Staff settings page (theme/preferences UI).

### Admin Features

- Admin dashboard with platform-wide metrics.
- Room Management:
  - create room
  - edit room
  - soft delete room
  - update room status
  - upload room image
  - filter by room type and status
- Room Type Catalog:
  - create room type
  - edit room type
  - pagination
- Booking Management:
  - view all bookings
  - filter by booking status
  - update booking status
  - pagination
- User Management:
  - list users
  - create staff account
  - change user role
  - soft delete user
- Facilities Management:
  - edit public facilities content
  - update facilities images
- Payment Management:
  - monitor all payments
  - update payment status
  - create payment
  - dashboard totals and stats
- Admin settings page (theme/preferences UI).

### Platform And Architecture Features

- Next.js 16 App Router architecture.
- BFF-style proxy route handlers:
  - `/api/v1/[...path]` for backend API forwarding
  - `/uploads/[...path]` for media proxying
- Unified API client with Redux Toolkit Query.
- Shared token storage and auth utilities.
- Global toast notifications (`sonner`).
- Reusable UI system with shadcn/ui components.
- Page animations and responsive layout patterns.

<!-- ## Route Map

### Public

- `/`
- `/about`
- `/contact`
- `/facilities`
- `/rooms`
- `/rooms/[id]`
- `/privacy-policy`

### Auth

- `/login`
- `/register`

### Customer

- `/customer`
- `/customer/book`
- `/customer/mybookings`
- `/customer/profile`
- `/customer/rating`
- `/customer/settings`

### Staff

- `/staff`
- `/staff/bookings`
- `/staff/rooms`
- `/staff/payments`
- `/staff/settings`

### Admin

- `/admin`
- `/admin/bookings`
- `/admin/rooms`
- `/admin/room-types`
- `/admin/payments`
- `/admin/facilities`
- `/admin/users`
- `/admin/settings`

### System / Proxy

- `/dashboard` (role-based redirect entry)
- `/api/v1/[...path]`
- `/api/v1/auth/login`
- `/api/v1/auth/register`
- `/api/v1/auth/me`
- `/uploads/[...path]`

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript + React 19
- **Styling:** Tailwind CSS v4
- **State Management:** Redux Toolkit + RTK Query
- **UI Components:** shadcn/ui + Radix UI primitives
- **Forms & Validation:** React Hook Form + Zod
- **Charts/Tables:** Recharts + TanStack Table
- **Notifications:** Sonner

## Environment Variables

Create `.env` in project root and configure:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API` | Yes | Backend API base URL used by frontend/proxy routes |
| `API_BASE_URL` | Optional | Server-side API base URL override for route handlers |
| `NEXT_PUBLIC_API_PROXY_BASE_URL` | Optional | Frontend API base path (default: `/api/v1`) |
| `NEXT_PUBLIC_BASE_URL` | Optional | Fallback origin for media URL resolution |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Required for contact form | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Required for contact form | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Required for contact form | EmailJS public key |
| `NEXT_PUBLIC_EMAILJS_TO_NAME` | Optional | Target recipient name for inquiry emails |

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env`.

3. Start development server:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
``` -->

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Create production build
- `npm run start` - Run production server
- `npm run lint` - Run ESLint checks

## Team Structure

### Mentors (3)

| No. | Name | Area |
| --- | --- | --- |
| 1 | Chan Chhaya | Backend Mentorship |
| 2 | Mom Reksmey | Frontend Mentorship |
| 3 | Kit Tara | Database Mentorship |

### Members (4)

| No. | Name | Role |
| --- | --- | --- |
| 1 | Keo Menglong | Fullstack Developer |
| 2 | Bo Vibol | UI Developer & Tester |
| 3 | Saroeun Sothearith | UI Developer & Tester |
| 4 | Toch Ratana | Fullstack & Deployment |
