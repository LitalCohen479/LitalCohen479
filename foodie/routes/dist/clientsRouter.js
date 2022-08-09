"use strict";
exports.__esModule = true;
var express_1 = require("express");
var productsCtrl_1 = require("../control/productsCtrl");
var router = express_1["default"].Router();
router
    .get('/hello', productsCtrl_1.setHello1);
exports["default"] = router;
