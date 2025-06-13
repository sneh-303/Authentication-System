const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const cors = require('cors');
const multer = require('multer');




// middleware

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  
}));
// Routes
app.use('/api/auth', require('./routes/authRoute'));

app.use('/uploads',express.static('uploads'))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));