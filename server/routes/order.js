const router = require("express").Router()


const orderModel = require('../models/order')


router.post('/api/order', async (req, res) => {
    try {
        const newOrder = new orderModel({
            order: req.body.order,
        })

        console.log(req.body.order)

        const saveOrder = await newOrder.save()
        res.status(200).json(saveOrder)
    } catch (err) {
        res.json(err)
    }
})



router.get('/api/order', async (req, res) => {
    try {
        const order = await orderModel.find({})
        res.status(200).json(order)
    } catch (error) {
        res.json(err)
    }
})

//update order
//update item
router.put('/api/order/:id', async (req, res) => {
    console.log(req.body)
    try {
        const updateOrder = await orderModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json(updateOrder);
    } catch (err) {
        res.json(err);
    }
})




module.exports = router