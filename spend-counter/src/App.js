import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/expenseForm';
import ExpenseTable from './components/expenseTable';
import MonthlyTotal from './components/monthlyTotal';
import { Button, Modal, ProgressBar } from 'react-bootstrap';
import FloatSection from './components/FloatableWeatherAPI/FloatSection';
import BudgetModal from './components/Budgeting/BudgetModal';
import BudgetProgressBar from './components/Budgeting/BudgetProgressBar';
import BudgetSetterModal from './components/Budgeting/BudgetSetterModal';

import * as XLSX from 'xlsx';

const conversionRates = {
  USD: 1.5,
  CAD: 1,
  GBP: 0.65,
  BDT: 84.85,
  EUR: 0.85,
  INR: 73.65,
};

function App() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(500);
  const [showReminder, setShowReminder] = useState(false);
  const [showExceeded, setShowExceeded] = useState(false);

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

    // Check if remaining budget is less than $100
    if (budget - usdAmount <= 100) {
      setShowReminder(true);
    }

    // Check if budget is exceeded
    if (usdAmount > budget) {
      setShowExceeded(true);
    }
  };

  const updateExpense = (index, updatedExpense) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = updatedExpense;
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const handleSetBudget = (amount) => {
    setBudget(amount);
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
      <div className="weatherAPI">
      <FloatSection />
      </div>
      <center>
      <div>
      <h1>Spend Counter</h1>
      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseTable expenses={expenses} onUpdateExpense={updateExpense} />
      <Button onClick={downloadExpenses}>Download Expenses</Button>
      <Button variant="danger" onClick={clearExpenses}>Clear Expenses</Button>
      <MonthlyTotal expenses={expenses} />
      </div>
      </center>

      <BudgetModal show={showReminder} handleClose={() => setShowReminder(false)} message="You have less than $100 remaining in your budget!" />
      <BudgetModal show={showExceeded} handleClose={() => setShowExceeded(false)} message="You have exceeded your budget!" />
      <BudgetProgressBar expenses={expenses} budget={budget} />
      
      
    </div>
  );
}

export default App;
