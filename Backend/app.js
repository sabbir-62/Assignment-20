// Requirements
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const app = express();


const mongoose = require('mongoose');
const router = require('./routers/userRoute');
const { mongodbConnection } = require('./secret');


//Middlewares
app.use(morgan('dev'));
app.use(xssClean());
app.use(express.json());
app.use(express.urlencoded({extended: true}))


//Set rate limiter
const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,    // 1 minute
    max: 5,
    message: 'Too many request from this IP. Please try again later'
})

app.use(rateLimiter);


//Database Connection
mongoose.connect(mongodbConnection).then(()=>{
  console.log("Database Connected Successfully");

  mongoose.connection.on('error', (error) => {
    console.error("DB connection error: ", error)
  })
}).catch((err) => {
  console.log(err);
})


//Routing
app.use("/api/v1", router)


// // Client error handle
// app.use((req, res, next) => {
//     createErrors(404, 'Router not found');
//     next();
// })


// //Server error handle
// app.use((err, req, res, next) => {
//     return res.status(err.status || 500).json({
//         success: false,
//         message: err.message
//     })
// })




// Client error handle
app.use((req, res, next) => {
  const error = createError(404, 'Router not found');
  next(error); // Pass the error to the next middleware
});



// Server error handle
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  });



  


module.exports = app;