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
<<<<<<< HEAD
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
=======
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
            isSent:{
                type:Boolean,
                required:true
>>>>>>> d6d7f9f08ba8ad570f7e2d9fa492b83b83424ea5
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
<<<<<<< HEAD
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
=======
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
            isSent:{
                type:Boolean,
                required:true
>>>>>>> d6d7f9f08ba8ad570f7e2d9fa492b83b83424ea5
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
<<<<<<< HEAD
            {
                type: String,
                required: true,
            },
=======
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
>>>>>>> d6d7f9f08ba8ad570f7e2d9fa492b83b83424ea5
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
<<<<<<< HEAD
            isSent: {
                type: Boolean,
                required: true
=======
            isSent:{
                type:Boolean,
                required:true
>>>>>>> d6d7f9f08ba8ad570f7e2d9fa492b83b83424ea5
            },
            time: {
                type: String,
                required: true,
            }
        }]
    }
);

const Request = mongoose.model("Request", requestSchema);

<<<<<<< HEAD
module.exports = Request;
=======
module.exports = Request;
>>>>>>> d6d7f9f08ba8ad570f7e2d9fa492b83b83424ea5
