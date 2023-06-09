const mongoose = require("mongoose")

const StorageSchema = new mongoose.Schema(
    {
        url:{
            type: String
        },
        file: {
            type: Number
        }
    },
    {
        timestamps: true, //TODO createAt, updateAt,
        versionKey: false
    }
)

module.exports = mongoose.model("storages", StorageSchema)
