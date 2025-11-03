import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create a context to share expense and income data across the app
const ExpenseContext = createContext();

// Initial state loads any stored data from localStorage
const initialState = {
  expenses: JSON.parse(localStorage.getItem("expenses")) || [],
  income: JSON.parse(localStorage.getItem("income")) || [],
  loading: false,
  error: null,
};

/**
 * Reducer function that handles all expense and income related actions.
 * It updates the state immutably based on the action type.
 *
 * @param {Object} state - The current state of the expense context.
 * @param {Object} action - The dispatched action with type and payload.
 * @returns {Object} The updated state.
 */
const financeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      // Add a new expense entry to the list
      return { ...state, expenses: [...state.expenses, action.payload] };

    case "DELETE_EXPENSE":
      // Remove a specific expense using its unique ID
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload.id),
      };

    case "SET_EXPENSES":
      // Replace all expenses (useful for resetting or loading from external data)
      return { ...state, expenses: action.payload };

    case "ADD_INCOME":
      // Add a new income record
      return { ...state, income: [...state.income, action.payload] };

    case "DELETE_INCOME":
      // Remove income entry by ID
      return {
        ...state,
        income: state.income.filter((i) => i.id !== action.payload.id),
      };

    case "SET_INCOME":
      // Replace all income records
      return { ...state, income: action.payload };

    default:
      return state;
  }
};

/**
 * ExpenseProvider component
 *
 * Wraps the app (or part of it) and provides state + actions
 * for managing expenses and income. Data is persisted to localStorage.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The components that should have access to this context.
 */
export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  /**
   * Persist data to localStorage whenever expenses or income change.
   * Wrapped in a try/catch to handle possible serialization errors.
   */
  useEffect(() => {
    try {
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
      localStorage.setItem("income", JSON.stringify(state.income));
    } catch (err) {
      console.error("Error saving data:", err);
    }
  }, [state.expenses, state.income]);

  // Define context actions for cleaner access in components
  const value = {
    ...state,

    /**
     * Add a new expense to the list.
     * Generates a unique ID for each entry.
     * @param {Object} expense - The expense object (amount, category, etc.).
     */
    addExpense: (expense) => {
      dispatch({
        type: "ADD_EXPENSE",
        payload: { ...expense, id: crypto.randomUUID() },
      });
    },

    /**
     * Delete an expense by its ID.
     * @param {string} id - The unique expense ID to remove.
     */
    deleteExpense: (id) => {
      dispatch({ type: "DELETE_EXPENSE", payload: { id } });
    },

    /**
     * Add a new income entry to the list.
     * @param {Object} income - The income object (amount, source, etc.).
     */
    addIncome: (income) => {
      dispatch({
        type: "ADD_INCOME",
        payload: { ...income, id: crypto.randomUUID() },
      });
    },

    /**
     * Delete an income record by ID.
     * @param {string} id - The unique income ID to remove.
     */
    deleteIncome: (id) => {
      dispatch({ type: "DELETE_INCOME", payload: { id } });
    },
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

/**
 * Custom hook to access the expense and income context.
 * Throws an error if used outside the ExpenseProvider.
 *
 * @returns {Object} The context value with state and action functions.
 */
export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};
