const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const port = process.env.PORT || 5000;
const dbConnection = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

dbConnection();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/salary', require('./routes/salaryRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use("/api/public", express.static('uploads'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));