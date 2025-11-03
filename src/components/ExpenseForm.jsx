import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";

/**
 * ExpenseForm component
 *
 * Handles the creation of new expense entries. Includes validation,
 * formatting, and state management for each input field.
 * 
 * @returns {JSX.Element} Form for adding a new expense
 */
const ExpenseForm = () => {
  const { addExpense } = useExpenses();

  // Form input states
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dropdown options for expense categories
  const categoryOptions = [
    { value: "food", label: "Food & Dining" },
    { value: "transport", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "utilities", label: "Utilities" },
    { value: "health", label: "Health & Medical" },
    { value: "other", label: "Other" },
  ];

  /**
   * Handles the form submission for adding a new expense.
   * Includes validation and sanitization before calling context action.
   *
   * @param {React.FormEvent} e - The form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Description validation
      if (!description.trim()) {
        throw new Error("Please enter a description");
      }

      // Remove extra whitespace and commas from amount
      const trimmedAmount = String(amount).trim();

      if (!trimmedAmount) {
        throw new Error("Please enter an amount");
      }

      const parsedAmount = parseFloat(trimmedAmount.replace(/,/g, ""));

      if (isNaN(parsedAmount) || !isFinite(parsedAmount)) {
        throw new Error("Please enter a valid amount");
      }

      if (parsedAmount <= 0) {
        throw new Error("Amount must be greater than zero");
      }

      // Round to two decimal places to ensure consistent precision
      const roundedAmount = Number((Math.round(parsedAmount * 100) / 100).toFixed(2));

      if (isNaN(roundedAmount) || roundedAmount <= 0) {
        throw new Error("Invalid amount calculated");
      }

      // Save the new expense using global context
      addExpense({
        description: description.trim(),
        amount: roundedAmount,
        category,
        date,
      });

      toast.success("Expense added successfully");

      // Reset form fields after successful submission
      setDescription("");
      setAmount("");
      setCategory("food");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      // Show user-friendly error toast if validation fails
      toast.error(error.message || "Failed to add expense");
    } finally {
      // Always re-enable the form
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="expense-form"
      className="bg-gradient-to-br from-white via-purple-50/30 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-6 w-full border-2 border-purple-200/50 dark:border-gray-700 sticky top-8 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all"
    >
      {/* ----- Header ----- */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-expense-dark dark:text-expense mb-2">
          Add Expenses
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Track your spending
        </p>
      </div>

      {/* ----- Expense Input Form ----- */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Description field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="e.g., Groceries, Movie tickets..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-expense focus:border-transparent transition-all"
            disabled={isSubmitting}
          />
        </div>

        {/* Amount field with inline validation */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
              ₹
            </span>
            <input
              type="text"
              inputMode="decimal"
              id="amount"
              placeholder="0.00"
              value={amount}
              onChange={(e) => {
                // Only allow numbers and one decimal point
                const value = e.target.value.replace(/[^0-9.]/g, "");
                const parts = value.split(".");
                if (parts.length > 2) {
                  setAmount(parts[0] + "." + parts.slice(1).join(""));
                } else {
                  setAmount(value);
                }
              }}
              onBlur={(e) => {
                // Auto-format value to 2 decimals when input loses focus
                const value = e.target.value.trim();
                if (value && !isNaN(parseFloat(value))) {
                  const num = parseFloat(value);
                  if (!isNaN(num) && num > 0) {
                    setAmount(num.toFixed(2));
                  }
                }
              }}
              className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-expense focus:border-transparent transition-all"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Category selection dropdown */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-expense focus:border-transparent transition-all cursor-pointer"
            disabled={isSubmitting}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date picker */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-expense focus:border-transparent transition-all"
            disabled={isSubmitting}
          />
        </div>

        {/* Submit button (shows loader while submitting) */}
        <button
          type="submit"
          className="w-full bg-expense hover:bg-expense-dark text-white py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-expense focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            // Spinner and text when loading
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Adding...
            </span>
          ) : (
            "Add Expense"
          )}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
