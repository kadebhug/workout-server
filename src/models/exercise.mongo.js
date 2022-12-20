const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    instruction: {
        type: String
    },
    muscle_group: {
        type: String
    },
    equipment: {
        type: String
    },
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);