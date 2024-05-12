// App.js
import React, { useState } from 'react';
import ExpenseForm from './components/expenseForm';
import ExpenseTable from './components/expenseTable'
import MonthlyTotal from './components/monthlyTotal';
import { Button } from 'react-bootstrap'; // Import Button component
import * as XLSX from 'xlsx';

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
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
      <MonthlyTotal expenses={expenses} />
      
    </div>
  );
}






export default App;
