const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coordinatesSchema = new Schema({
    x: {type: Schema.Types.Number, min: 0, max: 100, required: true},
    y: {type: Schema.Types.Number, min: 0, max: 100, required: true},
})

const positionSchema = new Schema({ //Box of the character in which he can be found
    top_left: {
        type: coordinatesSchema,
        required: true,
    },
    bottom_right: {
        type: coordinatesSchema,
        required: true,
    }
})

const CharactersSchema = new Schema({
    name: { type: Schema.Types.String, required: true, },
    map_id : { type: Schema.Types.ObjectId, ref: 'Maps', required: true, },
    hint: {type: Schema.Types.String, minLength: 5, maxLength: 100, },
    position: {type: positionSchema, required: true, }
})

const Characters = mongoose.model('Characters', CharactersSchema);

module.exports = Characters;