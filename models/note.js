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
    let query = {};
    let pagination = {
        limit: 100,
    };

    if ('' !== q) {
        query = {
            $or: [
                {title: qRegex},
                {body: qRegex},
            ],
        };
    }

    if (0 < page && 0 < limit) {
        pagination = {
            page: page,
            limit: limit,
        };
    }

    return this.model('Note').paginate(query, pagination);
};

module.exports = mongose.model('Note', NoteSchema);
