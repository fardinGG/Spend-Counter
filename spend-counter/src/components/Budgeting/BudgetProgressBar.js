import React from 'react';
import { ProgressBar } from 'react-bootstrap';

function BudgetProgressBar({ expenses, budget }) {
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = budget - totalExpense;
  const percentage = (totalExpense / budget) * 100;

  return (
    <ProgressBar now={percentage} label={`${percentage.toFixed(2)}%`} />
  );
}

export default BudgetProgressBar;
