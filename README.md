MAGNiTT Analytics — React + TypeScript Application
Visual comparison of VC funding across KSA, UAE, and Singapore using Recharts
📌 Overview

MAGNiTT Analytics is a React + TypeScript web application that allows users to:

Select 1 to 3 countries (KSA, UAE, Singapore)

Compare Venture Capital funding trends over multiple years

Visualize Number of Deals (Bar Chart) and Total Amount Raised (Line Chart)

Explore data interactively using filters, responsive charts, and dynamic rendering

The project is implemented using the Atomic Design Architecture, ensuring scalability, reusability, and clean component organization.

Deployed on Vercel.

🚀 Live Demo

🔗 Production Deployment:https://analytics-chart-new.vercel.app/

🛠 Tech Stack
Layer	Tools
Frontend Framework	React 18 + TypeScript
Charting Library	Recharts
Architecture	Atomic Design Pattern
Styling	Inline styling (minimal; ready for future design system)
State Management	React Hooks (useState, useEffect, useMemo)
Deployment	Vercel
Data	Static JSON files loaded from src/data/
🧱 Atomic Design Architecture Explained

This project uses the Atomic → Molecule → Organism → Template → Page pattern.

🔹 Atoms

Smallest, reusable UI components with no dependencies.

Examples:

Checkbox

Card

Heading

🔹 Molecules

A combination of atoms to form meaningful functional units.

Example:

CountrySelector

Uses: Heading, Checkbox

Accepts selected countries + update callbacks

🔹 Organisms

Complex UI sections composed of multiple molecules and atoms.

Example:

FundingComparisonChart

Uses: Recharts components

Visualizes multi-country data

Shows bars + lines, dual y-axis, tooltips

🔹 Templates

Layout structures that define where organisms/molecules appear.

Example:

AnalyticsDashboardLayout

Left sidebar (filters)

Main content (chart)

🔹 Pages

Actual page views → fetch data, manage state, assemble templates.

Example:

FundingAnalyticsPage

Loads JSON per country

Caching logic:

Country data loads only once (per country)

Subsequent selection uses localStorage cache

Cache TTL: 5 minutes

Why Atomic Design?

Atomic design ensures:

🔄 Reusability → Atoms & molecules reused across project

🎯 Maintainability → Clear boundaries between UI levels

📐 Scalability → Easier to add features (dark mode, new filters, new charts)

🧼 Cleaner Separation of Concerns → Pages handle logic, organisms handle UI

Handles caching

Manages selected country state

Renders the entire dashboard

Getting Started Locally
1️⃣ Clone the repo

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm start


Runs at:
👉 http://localhost:3000/

4️⃣ Build for production
npm run build


Output goes to /build folder.
