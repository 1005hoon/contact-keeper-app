const express = require('express');
const app = express();

const connectDB = require('./config/db');
connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Contact Keeper API',
  });
});

// Router 연결하기
app.use('/api/v1/users', require('./routes/userRouter'));
app.use('/api/v1/auths', require('./routes/authRouter'));
app.use('/api/v1/contacts', require('./routes/contactRouter'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
