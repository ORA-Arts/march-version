const { Schema, model } = require("mongoose")

const editorialSchema = new Schema({
    title: {
        type: String,
        max: 50
    },
    category: {
        type: String,
        enum: ['exhibitions', 'editorial', 'news']
    },
    subtitle: {
        type: String,
        max: 150
    },
    text: {
        type: String,
        max: 3000
    },
    imgName: String,
    imgPath: String,
    publicId: String,

    inFocus: Boolean,
    author: {
        type: String,
        max: 50
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Editorial = model("Editorial", editorialSchema);

module.exports = Editorial;