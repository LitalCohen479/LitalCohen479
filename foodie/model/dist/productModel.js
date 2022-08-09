"use strict";
exports.__esModule = true;
exports.userValidation = void 0;
var mongoose_1 = require("mongoose");
var joi_1 = require("joi");
var productSchema = new mongoose_1["default"].Schema({
    title: { type: String, require: true },
    price: { type: Number, required: true },
    ownerId: { type: String, required: false },
    count: { type: Number },
    description: { type: String },
    image: { type: String }
});
var productModel = mongoose_1["default"].model("productModel", productSchema);
exports["default"] = productModel;
exports.userValidation = joi_1["default"].object({
    email: joi_1["default"].string().email().required(),
    password: joi_1["default"].string().required()
});
