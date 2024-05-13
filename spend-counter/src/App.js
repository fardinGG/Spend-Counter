import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/expenseForm';
import ExpenseTable from './components/expenseTable'
import MonthlyTotal from './components/monthlyTotal';
import { Button } from 'react-bootstrap'; 

import * as XLSX from 'xlsx';

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);
  }, []);

  const addExpense = (expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };
  const clearExpenses = () => {
    setExpenses([]);
    localStorage.removeItem('expenses');
  };

  const downloadExpenses = () => {
    const worksheet = XLSX.utils.json_to_sheet(expenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
    XLSX.writeFile(workbook, 'expenses.xlsx');
  };

  return (
    <div className="container">
      <h1>Spend Counter</h1>
      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseTable expenses={expenses} />
      <Button onClick={downloadExpenses}>Download Expenses</Button>
      <Button variant="danger" onClick={clearExpenses}>Clear Expenses</Button>
      <MonthlyTotal expenses={expenses} />
      
    </div>
  );
}

export default App;
