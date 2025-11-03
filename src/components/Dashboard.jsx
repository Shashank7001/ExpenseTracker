import React from "react";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseChart from "./ExpenseChart";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import IncomeForm from "./IncomeForm";
import IncomeList from "./IncomeList";

/**
 * Dashboard component
 * 
 * Acts as the main container for all expense tracking views —
 * including summaries, charts, forms, and transaction lists.
 * Organizes the UI into clean sections for better readability and flow.
 */
const Dashboard = () => {
  return (
    // Main dashboard layout with responsive padding and vertical spacing
    <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* ----- Summary Section ----- */}
      {/* Displays a quick overview of income, expenses, and remaining balance */}
      <section id="dashboard">
        <ExpenseSummary />
      </section>

      {/* ----- Forms Section ----- */}
      {/* Side-by-side layout on large screens for adding expenses and income */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="expense">
        <div>
          {/* Expense entry form */}
          <ExpenseForm />
        </div>
        <div id="income">
          {/* Income entry form */}
          <IncomeForm />
        </div>
      </section>

      {/* ----- Charts Section ----- */}
      {/* Visual representation of expense and income trends */}
      <section id="charts">
        <ExpenseChart />
      </section>

      {/* ----- Transaction History Section ----- */}
      {/* Lists all past transactions separated by income and expenses */}
      <section id="transactions" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-expense-dark dark:text-expense mb-6">
            All Transactions
          </h2>

          {/* Income History List */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">
                Income History
              </h3>
            </div>
            <IncomeList />
          </div>

          {/* Expense History List */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
                Expense History
              </h3>
            </div>
            <ExpenseList />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
