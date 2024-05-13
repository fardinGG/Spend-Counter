import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function ExpenseForm({ onAddExpense }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD'); // Default currency is USD

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    const expense = {
      name,
      amount: parseFloat(amount),
      currency,
      date: new Date().toLocaleString() // Add current date and time
    };
    onAddExpense(expense);
    setName('');
    setAmount('');
    setCurrency('USD'); // Reset currency to USD after submission
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Expense Name: </Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Amount: </Form.Label>
        <Form.Control
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Currency: </Form.Label>
        <Form.Control
          as="select"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="GBP">UK Pound</option>
          <option value="BDT">BDT</option>
          <option value="EUR">Euro</option>
          <option value="INR">INR</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Expense
      </Button>
    </Form>
  );
}

export default ExpenseForm;
