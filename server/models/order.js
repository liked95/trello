const mongoose = require("mongoose")


const OrderSchema = new mongoose.Schema({
    order: {
        type: Array
    },
})



module.exports = mongoose.model("order", OrderSchema)