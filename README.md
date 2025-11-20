# Axiom Pulse Replica 

A pixel-perfect, high-performance replica of the Axiom Trade token discovery table, built with **Next.js 14**, **TypeScript**, and **Redux Toolkit**.

![Lighthouse Score](https://img.shields.io/badge/Lighthouse_Score-91%2B-success?style=for-the-badge&logo=lighthouse)
![Responsiveness](https://img.shields.io/badge/Responsiveness-Mobile_Compatible_(320px)-blue?style=for-the-badge)

## ⚡ Live Demo


---

## 🛠️ Tech Stack
* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS + CSS Variables (Dark Mode)
* **State Management:** Redux Toolkit (Filtering/Sorting) & React Query
* **UI Library:** shadcn/ui (Radix Primitives)
* **Testing:** Vitest + React Testing Library

## ✨ Key Features

### 1. Real-Time Market Simulation
* Custom `useTokenSocket` hook simulates a WebSocket connection.
* Sub-second price updates with **color-coded flash animations** (Green/Red).
* Data persistence handling to prevent layout shifts.

### 2. Complex Interaction Patterns
* **Modal:** Detailed token view with extended market metrics (Market Cap, Txns).
* **Popover:** "System Status" indicator showing network health.
* **Tooltip:** Contextual help on table headers (e.g., Liquidity explanation).
* **Sorting & Filtering:** Interactive table headers and category tabs powered by Redux.

### 3. Performance & Optimization
* **Lighthouse Score:** ≥ 91/100 (Mobile).
* **Atomic Architecture:** Components organized into Atoms, Molecules, and Organisms for maximum reusability.
* **Image Optimization:** Configured `next.config.ts` for remote patterns and strict caching headers.
* **Zero Layout Shift:** Implemented Skeleton loading states for initial data fetch.

---

## 📱 Responsive Design (320px Support)
The layout is fully responsive down to **320px (Mobile S)**. Complex columns (Liquidity, Volume) automatically hide on smaller screens to maintain readability.

![Mobile Layout Snapshot](./public/mobile-snapshot.png)


---

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/v-oathkeeper/axiom-replica.git
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Run Unit Tests**
    ```bash
    npm run test
    ```

---

