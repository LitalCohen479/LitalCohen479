"use strict";
exports.__esModule = true;
var express_1 = require("express");
var productsCtrl_1 = require("../control/productsCtrl");
var router = express_1["default"].Router();
router
    .get("/get-items", productsCtrl_1.getItem)
    .post("/add-item", productsCtrl_1.addItem)["delete"]("/delete-item", productsCtrl_1.deleteItem)
    .patch("/update-item", productsCtrl_1.updateItem)
    .post("/addUser", productsCtrl_1.addUser)
    .get("/getCookie", productsCtrl_1.getCookie)
    .post("/login", productsCtrl_1.login);
exports["default"] = router;
