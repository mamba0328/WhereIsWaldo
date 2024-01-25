const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharactersSchema = new Schema({
    name: { type: Schema.Types.String, required: true, },
    map_id : { type: Schema.Types.ObjectId, ref: 'Maps', required: true, },
    hint: {type: Schema.Types.String, minLength: 5, maxLength: 100, },
    position: {
        top_left: {
            x: {type: Schema.Types.Number, min: 0, max: 100, required: true},
            y: {type: Schema.Types.Number, min: 0, max: 100, required: true},
        },
        bottom_right: {
            x: {type: Schema.Types.Number, min: 0, max: 100, required: true},
            y: {type: Schema.Types.Number, min: 0, max: 100, required: true},
        }
    }
})

const Characters = mongoose.model('Characters', CharactersSchema);

module.exports = Characters;