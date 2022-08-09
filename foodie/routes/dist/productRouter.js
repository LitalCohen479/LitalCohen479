"use strict";
exports.__esModule = true;
var express_1 = require("express");
var productsCtrl_1 = require("../control/productsCtrl");
var jwt_simple_1 = require("jwt-simple");
var router = express_1["default"].Router();
router
    .get('/get-my-products', productsCtrl_1.getMyProducts)
    .post('/get-the-food', productsCtrl_1.addFoodCalorie);
//middleware 
function isAdmin(req, res, next) {
    var user = req.cookies.user;
    if (!user)
        throw new Error("no cookie is found on path");
    var secret = process.env.JWT_SECRET;
    var decodedCookie = jwt_simple_1["default"].decode(user, secret);
    console.log(decodedCookie);
    var role = decodedCookie.role;
    if (role !== 'admin') {
        res.status(403).send({ error: 'Not authorized' });
    }
    else {
        next();
    }
}
exports["default"] = router;
