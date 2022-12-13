const mongoose = require("mongoose")


const TodoItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    cardOrder: {
        type: Array
    },

    cards: {
        type: Array 
    }
})



module.exports = mongoose.model("todo", TodoItemSchema)