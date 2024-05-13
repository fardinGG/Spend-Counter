import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/expenseForm';
import ExpenseTable from './components/expenseTable';
import MonthlyTotal from './components/monthlyTotal';
import { Button } from 'react-bootstrap';

import * as XLSX from 'xlsx';

const conversionRates = {
  USD: 1,
  CAD: 0.75,
  GBP: 0.65,
  BDT: 84.85,
  EUR: 0.85,
  INR: 73.65,
};

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);
  }, []);

  const addExpense = (expense) => {
    const usdAmount = expense.amount / conversionRates[expense.currency];
    const expenseInUSD = { ...expense, amount: usdAmount };
    const updatedExpenses = [...expenses, expenseInUSD];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const updateExpense = (index, updatedExpense) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = updatedExpense;
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
      <ExpenseTable expenses={expenses} onUpdateExpense={updateExpense} />
      <Button onClick={downloadExpenses}>Download Expenses</Button>
      <Button variant="danger" onClick={clearExpenses}>Clear Expenses</Button>
      <MonthlyTotal expenses={expenses} />
    </div>
  );
}

export default App;
