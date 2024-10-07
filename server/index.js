import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

//for the .env file
dotenv.config();

// Initialize the express app
const app = express();

// Set up the body-parser
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Memories API');
});

// Connect to the MongoDB database
// const CONNECTION_URL =
//   "mongodb+srv://admin:admin123@cluster0.gcugm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

