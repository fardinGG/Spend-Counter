
import React from 'react';

function MonthlyTotal({ expenses }) {
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div>
      <h2>Monthly Total Expense</h2>
      <p>Total: ${totalExpense}</p>
    </div>
  );
}

export default MonthlyTotal;
