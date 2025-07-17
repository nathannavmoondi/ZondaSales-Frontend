# Zonda Sales System (Frontend)

A professional React + TypeScript + Vite application for managing customers and their products, featuring a modern UI, robust state management, and seamless API integration.

[![GitHub Repo](https://img.shields.io/badge/GitHub-View%20Repository-blue?logo=github)](https://github.com/nathannavmoondi/ZondaSales-Frontend)

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Development](#development)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [API Integration](#api-integration)
- [Custom Theming & Branding](#custom-theming--branding)
- [Credits](#credits)

---

## Features

- **Customer Management**
  - View customer details (name, email, phone)
  - Select customers from a dropdown
  - Robust error handling and fallback to mock data if API is unavailable

- **Product Management**
  - View, add, edit, and delete products for each customer
  - Product table with pagination and sortable columns
  - Dialogs for adding, editing, and confirming deletion of products
  - Real-time UI updates after operations

- **Professional UI/UX**
  - Responsive layout with sidebar navigation and top navbar
  - Consistent dark theme using Material-UI and Tailwind CSS
  - Custom SVG favicon and branding
  - Footer with copyright

- **State Management**
  - Global state via React Context (`useZondaSales`)
  - Defensive checks for async data and state updates

- **API Integration**
  - All customer and product operations use a backend API (with fallback to mock data)
  - Configurable API URL via environment variable

---

## Screenshots

> _Add screenshots here of the main dashboard, customer info, and product grid for best effect!_

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nathannavmoondi/ZondaSales-Frontend.git
   cd ZondaSales-Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the project root with the following (replace with your backend URL):

   ```
   VITE_BACKEND_API_URL=http://localhost:5204
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

---

## Development

### Scripts

- `npm run dev` — Start the Vite development server with HMR
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run ESLint on the codebase

### Linting & Formatting

- ESLint is configured for TypeScript and React.
- Tailwind CSS is used for utility-first styling.
- Material-UI (MUI) is used for UI components.

---

## Project Structure

```
ZondaSales-Frontend/
├── public/
│   ├── percentage-favicon.svg
│   ├── favicon.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MainPage.tsx
│   │   ├── CustomerInfo.tsx
│   │   ├── ProductDetails.tsx
│   │   └── ProductGrid.tsx
│   ├── context/
│   │   └── ZondaSalesContext.tsx
│   ├── services/
│   │   ├── ApiService.ts
│   │   ├── CustomerService.ts
│   │   └── ProductService.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **UI:** Material-UI (MUI), Tailwind CSS
- **State Management:** React Context API
- **API:** RESTful backend (configurable URL)
- **Tooling:** ESLint, PostCSS, Autoprefixer

---

## API Integration

- All customer and product operations (fetch, add, update, delete) are performed via the backend API.
- If the API is unavailable, the app falls back to mock data for seamless development and demoing.
- The API base URL is set via the `VITE_BACKEND_API_URL` environment variable.

---

## Custom Theming & Branding

- **Dark Theme:** Consistent dark backgrounds and white text for a professional look.
- **Custom Favicon:** Located at `public/percentage-favicon.svg` and used in the browser tab and Navbar.
- **Branding:** App name and author ("Nathan Moondi") are displayed in the Navbar, with a direct link to the [GitHub repository](https://github.com/nathannavmoondi/ZondaSales-Frontend).
- **Footer:** Displays copyright.

---

## Credits

- Developed by Nathan Moondi and Happy Dappy Technologies.
- [GitHub Repository](https://github.com/nathannavmoondi/ZondaSales-Frontend)

---

> _For any issues or feature requests, please open an issue on the [GitHub repository](https://github.com/nathannavmoondi/ZondaSales-Frontend)._

---
