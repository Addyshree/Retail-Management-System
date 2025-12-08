import React from "react";
import SalesDashboard from "./pages/SalesDashboard";
// Note: If you choose to use React Router for future features,
// the <SalesDashboard /> would be wrapped in a <Route> here.

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>TruEstate Sales Manager</h1>
        <p>Advanced Search, Filter, Sort, and Pagination Demo</p>
      </header>

      <main className="app-main-content">
        {/* The main dashboard component that handles all the logic and UI */}
        <SalesDashboard />
      </main>

      <footer className="app-footer">
        &copy; {new Date().getFullYear()} TruEstate Assignment
      </footer>
    </div>
  );
}

export default App;
