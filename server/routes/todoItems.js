const router = require("express").Router()


const todoItemsModel = require('../models/todoItems')

// first route
router.post('/api/item', async (req, res) => {
    try {
        const newItem = new todoItemsModel({
            title: req.body.title,
            cardOrder: req.body.cardOrder,
            cards: req.body.cards,
        })

        const saveItem = await newItem.save()
        res.status(200).json(saveItem)
    } catch (err) {
        res.json(err)
    }
})


router.get('/api/item', async (red, res) => {
    try {
        const allTodoItems = await todoItemsModel.find({})
        res.status(200).json(allTodoItems)
    } catch (error) {
        res.json(error)
    }
})


//update item
router.put('/api/item/:id', async (req, res) => {
    try {
        //find the item by its id and update it
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        console.log(req.body)
        res.status(200).json(updateItem);
    } catch (err) {
        res.json(err);
    }
})


//Delete item from database
router.delete('/api/item/:id', async (req, res) => {
    try {
        //find the item by its id and delete it
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteItem);
    } catch (err) {
        res.json(err);
    }
})

module.exports = router