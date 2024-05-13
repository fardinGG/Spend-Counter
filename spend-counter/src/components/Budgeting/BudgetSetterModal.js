import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function BudgetSetterModal({ handleSetBudget }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    handleSetBudget(parseFloat(amount));
  };

  return (
    <Modal show={true} onHide={() => {}}>
      <Modal.Header closeButton>
        <Modal.Title>Set Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Budget Amount:</Form.Label>
          <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>Set Budget</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BudgetSetterModal;
