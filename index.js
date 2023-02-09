const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const asyncHandler = require('express-async-handler');
const db = require('./config/dbConnection')
const env = require('dotenv').config();
const authRoute = require('./routes/authRoute');
const { notFound, errorhandler } = require('./middleware/errorhandler');
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/productRoute')
const morgan = require('morgan')
const PORT = process.env.PORT || 4000;
db();
app.use(express.json());
app.use(morgan())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}))
app.use(cookieParser())
app.use('/api/users',authRoute)
app.use('/api/product', productRouter)
app.use(notFound)
app.listen(PORT,()=>{console.log(`server running on ${PORT}`)})
