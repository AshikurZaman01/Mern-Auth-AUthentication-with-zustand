const express = require('express');
const cors = require('cors'); // Importing cors
const cookieParser = require('cookie-parser');
const DBConnection = require('./config/DBconnection');
const { notFound, defaultErrorHandler } = require('./Middlewear/ErrorHandler/errorHandler');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/api", (req, res) => {
    res.send("hello");
});

app.use("/api/users", require("./Routes/UserRoute/userRoute"));

// Error handling middlewares
app.use(notFound);
app.use(defaultErrorHandler);

// Connecting to the database
DBConnection().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch((err) => {
    console.log(err);
})
