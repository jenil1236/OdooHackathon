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
            from: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            message: {
                type: String,
                default: "",
            },
            offers:
                [{
                    type: String,
                    required: true,
                    validate: {
                        validator: function (v) {
                            return Array.isArray(v) && v.length > 0;
                        },
                        message: 'Offers must be a non-empty array'
                    }
                }],
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
            time: {
                type: String,
                required: true,
                validate: {
                    validator: function (v) {
                        return Array.isArray(v) && v.length > 0;
                    },
                    message: 'Offers must be a non-empty array'
                }
            }
        }],
        accepted: [{
            from: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
                validate: {
                    validator: function (v) {
                        return Array.isArray(v) && v.length > 0;
                    },
                    message: 'Offers must be a non-empty array'
                },
            },
            message: {
                type: String,
                default: "",
            },
            offers:
                [{
                    type: String,
                    required: true,
                    validate: {
                        validator: function (v) {
                            return Array.isArray(v) && v.length > 0;
                        },
                        message: 'Offers must be a non-empty array'
                    }
                }]
            ,
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
            time: {
                type: String,
                required: true,
                validate: {
                    validator: function (v) {
                        return Array.isArray(v) && v.length > 0;
                    },
                    message: 'Offers must be a non-empty array'
                }
            }
        }],
        rejected: [{
            to: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
                validate: {
                    validator: function (v) {
                        return Array.isArray(v) && v.length > 0;
                    },
                    message: 'Offers must be a non-empty array'
                },
            },
            message: {
                type: String,
                default: "",
            },
            offers:
                [{
                    type: String,
                    required: true,
                    validate: {
                        validator: function (v) {
                            return Array.isArray(v) && v.length > 0;
                        },
                        message: 'Offers must be a non-empty array'
                    }
                }],
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
            time: {
                type: String,
                required: true,
                validate: {
                    validator: function (v) {
                        return Array.isArray(v) && v.length > 0;
                    },
                    message: 'Offers must be a non-empty array'
                }
            }
        }]
    }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
