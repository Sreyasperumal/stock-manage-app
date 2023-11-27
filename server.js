const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errMiddleware");
const userRoutes = require("./routes/userRoutes")
const productRoute = require("./routes/productRoute")
const contactRoute = require("./routes/contactRoute")
const cookieParser = require("cookie-parser")
const path = require("path")

const app = express()
//middlewares
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({ 
    orgin:["http://localhost:3000","https://invent-app.vercel.app"],
    credentials:true
}));

app.use("/uploads",express.static(path.join(__dirname,"uploads")))

//routes middlewares
app.use("/api/user",userRoutes);
app.use("/api/products",productRoute);
app.use("/api/contactus",contactRoute);

//routes
app.get("/",(req,res) =>{
    res.send("Home Page");
});

//err middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
//connect to db and start server

mongoose
    .connect(process.env.MONGO_URL)
    .then(() =>{
        app.listen(PORT,() =>{
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => console.log(err))