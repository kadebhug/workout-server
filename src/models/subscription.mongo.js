const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    trainer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Subscription", subscriptionSchema);