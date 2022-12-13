const mongoose = require("mongoose")


const ListOrderSchema = new mongoose.Schema({


    listOrder: {
        type: Array
    },


})



module.exports = mongoose.model("listOrder", ListOrderSchema)