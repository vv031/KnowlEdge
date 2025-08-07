const db = require('../db');

// Process a payment and store details in the database
const processPayment = (req, res) => {
  const { payments_user_id, payments_course_id, amount, paymentMethod } = req.body;
  const query = 'INSERT INTO payments (payments_user_id, payments_course_id, amount, payment_method, paid_at) VALUES (?, ?, ?, ?, NOW())';

  db.execute(query, [payments_user_id, payments_course_id, amount, paymentMethod], (err, result) => {
    if (err) {
      console.error('Error processing payment:', err);
      res.status(500).send({ message: 'Error processing payment' });
    } else {
      res.status(200).send({ message: 'Payment processed successfully' });
    }
  });
};

// Get payment options (dummy)
const getPaymentOptions = (req, res) => {
  const paymentOptions = [
    { method: 'Credit Card', description: 'Pay with credit card' },
    { method: 'Debit Card', description: 'Pay with debit card' },
    { method: 'UPI', description: 'Pay with UPI' },
  ];

  res.status(200).send(paymentOptions);
};

module.exports = { processPayment, getPaymentOptions };
