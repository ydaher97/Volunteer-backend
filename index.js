require("dotenv").config();
const express = require('express')
const app = express()
const cors = require("cors");
const connection = require('./db')
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const organizationRoutes = require('./routes/organizationRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const getUser = require('./routes/user'); 
//middelware
connection();

app.use(express.json())
app.use(cors())

// const crypto = require('crypto');

// // Generate a random secret key
// const secretKey = crypto.randomBytes(32).toString('hex'); // Change the byte size as needed

// console.log('Generated Secret Key:', secretKey);


// routes

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/users', getUser);

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log('connect'))