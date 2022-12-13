const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json()); // <-- this guy!

app.use(express.json())


const PORT = process.env.PORT || 5500

app.use(cors())


// import routes
const TodoItemRoute = require("./routes/todoItems")
const OrderRoute = require("./routes/order")


mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err))



// app.use("/", [TodoItemRoute, OrderRoute])
app.use("/", [TodoItemRoute, OrderRoute])
// app.use("/", TodoItemRoute)



//connect to server
app.listen(PORT, () => console.log("Server connected"));