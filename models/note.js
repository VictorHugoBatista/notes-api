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

NoteSchema.statics.list = function (q, page, limit) {
    const qRegex = new RegExp(q, 'i');
    const query = '' !== q ?
        {
            $or: [
                {title: qRegex},
                {body: qRegex},
            ],
        } : {};
    return this.model('Note').paginate(query, {page: page, limit: limit});
};

module.exports = mongose.model('Note', NoteSchema);
