# Data Warehouse Simulation

This project is a **student-oriented proof of concept** that simulates a simple Data Warehouse pipeline.  
It combines customer and product data from two different APIs, generates sales records, and provides  
export and visualization functionality through a React/Vite frontend.

---

## 🚀 Features

- **Backend (Node.js + Express):**

  - Fetch customers from [RandomUser API](https://randomuser.me/).
  - Fetch products from [FakeStore API](https://fakestoreapi.com/).
  - Generate simulated sales data by combining customers and products.
  - Export sales data to:
    - JSON
    - CSV
  - REST endpoints to fetch customers, products, and sales.
  - Basic in-memory + JSON file persistence.

- **Frontend (React + Vite + Bootstrap + Chart.js):**
  - Display combined sales records in a table.
  - Filter customers by country.
  - Export data to CSV.
  - Show bar charts for customer distribution per country.
  - Simple UI to simulate data analysis and reporting.

---

## 🛠️ Tech Stack

- **Backend:**

  - Node.js
  - Express.js
  - Axios
  - CSV export
  - File system (JSON persistence)

- **Frontend:**
  - React (Vite setup)
  - Bootstrap
  - Chart.js

---

## 📂 Project Structure

data-warehouse-sim/
│── backend/ # Express backend
│ ├── routes/ # Customers, Products, Sales
│ ├── views/ # Simple HTML frontend for testing
│ └── customers.json / sales.json
│
│── frontend/ # React Vite frontend
│ ├── components/ # Table, Chart, Filters
│ └── ...

yaml
Copy code

---

## ⚡ Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
Backend will start at:
http://localhost:3000
```

### Frontend

```bash

cd frontend
npm install
npm run dev
Frontend will start at:
http://localhost:5173
```

# 📊 Example Use Case

- Backend fetches customers and products from external APIs.

- Sales data is generated with random transactions.

### Frontend displays:

- Sales table

- Country-based filtering

- Customer distribution chart

Export to CSV → can be used in Excel / Power BI for further analysis.

### Screenshots

![PipeLine Table Screenshot](docs/datawaresim1.png)

### ⚠️ Disclaimer

This project is a student assignment / educational demo.
It is not production-ready — data is simulated and persistence is minimal.
Main purpose: learn API integration, data processing, and basic BI visualization.
