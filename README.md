# 📊 MusaFly Admin Dashboard

Welcome to the **MusaFly Admin Dashboard** repository. This is a sleek, premium dark-themed administrative interface built for managing MusaFly's business operations. It connects to the MusaFly backend API to perform CRUD operations on Tours, Flights, Visas, and Umrah packages.

## 🚀 Technologies Used
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS v4
* **HTTP Client:** Axios
* **Icons:** Lucide React
* **Language:** TypeScript
* **Deployment:** Vercel

## 📦 Getting Started

First, install the dependencies:

```bash
npm install
```

Before running, make sure the **MusaFly Backend** is running locally on port 8000 so the API requests work properly.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure
- `/src/app/(dashboard)`: Contains the layout and CRUD pages for all the managed entities.
- `/src/components`: Reusable components (e.g., Sidebar).
- `/src/app/globals.css`: Contains global styles and Tailwind v4 configurations including MusaFly brand colors.

## 🔗 Live Site
- **Production URL:** [https://musafly-admin-dashboard.vercel.app](https://musafly-admin-dashboard.vercel.app)
