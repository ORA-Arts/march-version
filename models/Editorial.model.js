const { Schema, model } = require("mongoose")

const editorialSchema = new Schema({
    title: {
        type: String,
        max: 50
    },
    Category: {
        type: String,
        enum: ['Exhibitions', 'Editorial', 'News']
    }
})