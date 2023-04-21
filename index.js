const express = require('express');
const dbConnect = require('./config/dbConfig');
const app = express();


const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');


require('dotenv').config();
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors())

dbConnect(process.env.MONGODB_URL);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/notifications', notificationRoutes);



// custom middleswares
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Node js server running on ${port}`);
});
