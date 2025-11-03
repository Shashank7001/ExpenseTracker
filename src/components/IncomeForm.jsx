import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";
import { DollarSign } from "lucide-react";

/**
 * Handles income entry form where users can add their earnings.
 * Includes input validation, formatted amount handling, and feedback messages.
 * @returns {JSX.Element} A styled form component for adding income.
 */
const IncomeForm = () => {
  const { addIncome } = useExpenses();

  // Local form states for managing input fields and submission state
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validates form fields and adds income entry to global context.
   * Provides inline error handling and visual feedback using toast notifications.
   * @param {Event} e - The form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default page reload
    setIsSubmitting(true);

    try {
      // Basic validation for description
      if (!description.trim()) {
        throw new Error("Please enter a description");
      }

      // Clean up and validate the amount string
      const trimmedAmount = String(amount).trim();
      if (!trimmedAmount || trimmedAmount === "") {
        throw new Error("Please enter an amount");
      }

      // Convert to a number and handle commas
      const parsedAmount = parseFloat(trimmedAmount.replace(/,/g, ""));
      if (isNaN(parsedAmount) || !isFinite(parsedAmount)) {
        throw new Error("Please enter a valid amount");
      }

      // Prevent zero or negative values
      if (parsedAmount <= 0) {
        throw new Error("Amount must be greater than zero");
      }

      // Round to 2 decimal places for currency consistency
      const roundedAmount = Number((Math.round(parsedAmount * 100) / 100).toFixed(2));

      if (isNaN(roundedAmount) || roundedAmount <= 0) {
        throw new Error("Invalid amount calculated");
      }

      // Add income entry to context
      addIncome({
        description: description.trim(),
        amount: roundedAmount,
        date,
      });

      toast.success("Income added successfully!");

      // Reset form fields after successful submission
      setDescription("");
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      // Display specific error message if available
      toast.error(error.message || "Failed to add income");
    } finally {
      // Always re-enable submit button
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-green-50/30 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-6 border-2 border-green-200/50 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-500/30 transition-all">
      {/* Header section with icon and title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
          <DollarSign size={24} className="text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-expense-dark dark:text-expense">
            Add Income
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your earnings
          </p>
        </div>
      </div>

      {/* Income input form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description field */}
        <div>
          <label
            htmlFor="income-description"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="income-description"
            placeholder="e.g., Salary, Freelance..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            disabled={isSubmitting}
          />
        </div>

        {/* Amount field with currency prefix */}
        <div>
          <label
            htmlFor="income-amount"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Amount
          </label>
          <div className="relative">
            {/* Currency symbol */}
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
              ₹
            </span>
            <input
              type="text"
              inputMode="decimal"
              id="income-amount"
              placeholder="0.00"
              value={amount}
              onChange={(e) => {
                // Only allow numeric input with a single decimal point
                const value = e.target.value.replace(/[^0-9.]/g, "");
                const parts = value.split(".");
                if (parts.length > 2) {
                  setAmount(parts[0] + "." + parts.slice(1).join(""));
                } else {
                  setAmount(value);
                }
              }}
              onBlur={(e) => {
                // Format value on blur to two decimal places
                const value = e.target.value.trim();
                if (value && !isNaN(parseFloat(value))) {
                  const num = parseFloat(value);
                  if (!isNaN(num) && num > 0) {
                    setAmount(num.toFixed(2));
                  }
                }
              }}
              className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Date field */}
        <div>
          <label
            htmlFor="income-date"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Date
          </label>
          <input
            type="date"
            id="income-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            disabled={isSubmitting}
          />
        </div>

        {/* Submit button with loading animation */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              {/* Small spinner during submission */}
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                     5.291A7.962 7.962 0 014 12H0c0 3.042 
                     1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Adding...
            </span>
          ) : (
            "Add Income"
          )}
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;
