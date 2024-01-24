const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: { type: Schema.Types.String, required: true, },
    address: { type: Schema.Types.String, required: true },
})

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;