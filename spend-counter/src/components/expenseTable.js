import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function ExpenseTable({ expenses, onUpdateExpense }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedAmount, setEditedAmount] = useState('');
  const [editedDate, setEditedDate] = useState('');

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedName(expenses[index].name);
    setEditedAmount(expenses[index].amount);
    setEditedDate(expenses[index].date);
  };

  const handleSave = () => {
    onUpdateExpense(editIndex, {
      name: editedName,
      amount: parseFloat(editedAmount),
      date: editedDate
    });
    setEditIndex(null);
  };

  return (
    <div>
      <h2>Expense List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Amount</th>
            <th>Date Posted</th>
            <th>Actions</th> {/* Add column for actions */}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{editIndex === index ? <Form.Control value={editedName} onChange={(e) => setEditedName(e.target.value)} /> : expense.name}</td>
              <td>{editIndex === index ? <Form.Control value={editedAmount} onChange={(e) => setEditedAmount(e.target.value)} /> : `$${expense.amount}`}</td>
              <td>{editIndex === index ? <Form.Control value={editedDate} onChange={(e) => setEditedDate(e.target.value)} /> : expense.date}</td>
              <td>
                {editIndex === index ? (
                  <>
                    <Button variant="success" onClick={handleSave}>Save</Button>
                    <Button variant="secondary" onClick={() => setEditIndex(null)}>Cancel</Button>
                  </>
                ) : (
                  <Button variant="info" onClick={() => handleEdit(index)}>Edit</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ExpenseTable;
