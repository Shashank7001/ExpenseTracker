import React from 'react';
import Index from './pages/index';
import NotFound from './pages/NotFound';
import { ExpenseProvider } from './context/ExpenseContext';

import { BrowserRouter,Routes, Route } from 'react-router-dom'


const App = () => {
  return <>
  <ExpenseProvider>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Index/>}/>
    <Route path="*" element={<NotFound/>}/>
    
    </Routes>
    
    </BrowserRouter>
    </ExpenseProvider>
  </>
}

export default App