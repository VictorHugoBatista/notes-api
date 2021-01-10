const mongose = require('mongoose');
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

module.exports = mongose.model('Note', NoteSchema);
