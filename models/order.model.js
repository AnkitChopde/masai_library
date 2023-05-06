const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user : String,
	 books : [],
	 totalAmount: Number
},{
    versionKey:false
});

const OrderModel = mongoose.model("order",orderSchema);

module.exports = OrderModel