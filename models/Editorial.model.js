const { Schema, model } = require("mongoose")

const editorialSchema = new Schema({
    title: {
        type: String,
        max: 50
    },
    category: {
        type: String,
        enum: ['Exhibitions', 'Editorial', 'News']
    },
    subtitle: {
        type: String,
        max: 150
    },
    text: {
        type: String,
        max: 2000
    },
    imgNameCard: String,
    imageURLCard: String,
    publicIdCard: String,
    imgNamePost: String,
    imageURLPost: String,
    publicIdPost: String,
    inFocus: Boolean,
    author: {
        type: String,
        max: 100
    }
})

const Editorial = model("Editorial", editorialSchema);

module.exports = Editorial;