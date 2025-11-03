import React from 'react'
import { ExpenseProvider } from '../context/ExpenseContext'
import { ThemeProvider } from '../context/ThemeContext'
import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../components/Dashboard';

const index = () => {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      </ExpenseProvider>
    </ThemeProvider>
  );
};

export default index;