# GTNA TradeBoard - Frontend Client

## Description
This is the client-side user interface for the GTNA TradeBoard application. It allows authenticated Customers to post requests and Service Providers to manage jobs, featuring live search and category filtering.

## Tech Stack
- **Next.js (App Router)**
- **Tailwind CSS**
- **Fetch API**

## Environment Variables
Create a `.env.local` file in the root directory and add the following key:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
*(Or replace with your live backend URL if deployed)*

## Installation & Setup Instructions
1. Clone the repository and navigate to the frontend directory.
2. Install the required dependencies using npm:
```bash
npm install
```

## How to Run
Start the development server using npm:
```bash
npm run dev
```

## Architecture / Core Screens
- **Home Page:** Displays job requests as interactive cards with a live Search Bar and category filter dropdown.
- **Login/Register:** Handles user authentication and stores JWT tokens securely.
- **New Job Form:** Protected route that allows authenticated users to post requests with robust client-side validation.
- **Job Detail Page:** Full job insights with status updates (Open, In Progress, Closed) and a protected delete action.

## Features Included
- **Local Storage Token Management:** Secure handling and storage of JWTs for authentication.
- **Dynamic Navigation:** Conditional rendering of navigation elements based on the user's authentication state.
- **Polished UI Interactions:** Clean, modern, and responsive user interface utilizing official GTNA branding.