
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
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.name}</td>
              <td>${expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ExpenseTable;
