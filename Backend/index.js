require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const postRoutes = require('./routes/postRoutes');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const allowedOrigins = [process.env.FRONTEND_URL];
app.use(cors({
    origin: allowedOrigins,
    credentials: true // Allow credentials 
}));
app.use(express.json());

// routing
app.use('/api/posts', postRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/payments', paymentRoutes);


// server starting
const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
    console.log('Server is running on port 3000');

    db.execute('SELECT 1', (err) => {
        if (err) return console.error('Error executing query:', err);

        console.log('MySQL DB is connected');
    });
});
