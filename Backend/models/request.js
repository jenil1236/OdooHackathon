const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        pending: [{
            receiver: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            message: {
                type: String,
                default: "",
            },
            offers:
            {
                type: String,
                required: true,
            },
            wants:
            {
                type: String,
                required: true,
            }
            ,
            isSent: {
                type: Boolean,
                required: true
            },
            time: {
                type: String,
                required: true,
            }
        }],
        accepted: [{
            receiver: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            message: {
                type: String,
                default: "",
            },
            offers:
            {
                type: String,
                required: true,
            },
            wants:
            {
                type: String,
                required: true,
            },
            isSent: {
                type: Boolean,
                required: true
            },
            time: {
                type: String,
                required: true,
            }
        }],
        rejected: [{
            receiver: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            message: {
                type: String,
                default: "",
            },
            offers:
            {
                type: String,
                required: true,
            },
            wants: [
                {
                    type: String,
                    required: true,
                    validate: {
                        validator: function (v) {
                            return Array.isArray(v) && v.length > 0;
                        },
                        message: 'Offers must be a non-empty array'
                    }
                }
            ],
            isSent: {
                type: Boolean,
                required: true
            },
            time: {
                type: String,
                required: true,
            }
        }]
    }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;