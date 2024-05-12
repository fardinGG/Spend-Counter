
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function ExpenseForm({ onAddExpense }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    const expense = { name, amount: parseFloat(amount) };
    onAddExpense(expense);
    setName('');
    setAmount('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Expense Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Expense
      </Button>
    </Form>
  );
}

export default ExpenseForm;
