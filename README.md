Act as an expert technical writer. Please generate a highly professional, clean README.md file for the frontend repository of my "GTNA TradeBoard" project. 

The frontend is built using Next.js (App Router) and Tailwind CSS, utilizing the official Global Training Network Alliances brand colors.

The README must include these exact sections with proper Markdown formatting:
1. Project Title: GTNA TradeBoard - Frontend Client
2. Description: A brief summary stating this is the client-side user interface for the GTNA TradeBoard application, allowing Customers to post requests and Service Providers to manage jobs.
3. Tech Stack: A bulleted list showing Next.js (App Router), Tailwind CSS, and Fetch API.
4. Environment Variables: A code block showing the required keys for a `.env.local` file:
   - NEXT_PUBLIC_API_URL=http://localhost:5000/api (or your live Railway backend URL)
5. Installation & Setup Instructions: Step-by-step terminal commands (`npm install`).
6. How to Run: Commands for starting the development server (`npm run dev`).
7. Architecture / Core Screens: A bulleted list explaining the 3-screen structure:
   - Home Page: Displays job requests as interactive cards with hover animations and a category filter dropdown.
   - New Job Form: Allows homeowners to post requests with robust client-side validation.
   - Job Detail Page: Full job insights with status updates (Open, In Progress, Closed) and a delete action.