const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoute = require("./routes/user")

dotenv.config();

//mongodb connection url
mongoose.connect(process.env.MONGO_URL
).then(()=> console.log("DB connected")).catch((err)=>
    console.log(err)
);

// access http requests

app.use("/api/users", userRoute);



app.listen(process.env.PORT || 5000, () => {
    console.log("server is running");
})

