
import React from 'react';
import { Table } from 'react-bootstrap';

function ExpenseTable({ expenses }) {
  return (
    <div>
      <h2>Expense List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Amount</th>
            <th>Date Posted</th> {/* Add date column */}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.name}</td>
              <td>${expense.amount}</td>
              <td>{expense.date}</td> {/* Display date */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ExpenseTable;
