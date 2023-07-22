const mongoose = require('mongoose');

const userSchema = {
    email : {type: String, required: true},
    firstName: String,
    id: mongoose.Schema.Types.ObjectId
}

module.exports = mongoose.model("user", userSchema)