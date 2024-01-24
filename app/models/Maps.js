const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapsSchema = new Schema({
    path: { type: Schema.Types.String, required: true },
    name: { type: Schema.Types.String, required: true },
})

const Maps = mongoose.model('Maps', MapsSchema);

module.exports = Maps;