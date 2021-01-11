const mongose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
});

NoteSchema.plugin(mongoosePaginate);

module.exports = mongose.model('Note', NoteSchema);
