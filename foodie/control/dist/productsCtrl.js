"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.insertProducts = exports.addFoodCalorie = exports.getMyProducts = exports.setHello1 = exports.getCookie = exports.login = exports.addUser = exports.updateItem = exports.deleteItem = exports.addItem = exports.getItem = void 0;
var helpers_1 = require("./helpers");
var productModel_1 = require("../model/productModel");
var productModel_2 = require("../model/productModel");
var items = [
    {
        id: "1",
        name: "Burger",
        price: 89,
        description: "The Tasty Burger",
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
    },
    {
        id: "2",
        name: "Pizza",
        price: 75,
        description: "The Cheesy Pizza",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
    },
    {
        id: "3",
        name: "Tea",
        price: 25,
        description: "The Informative Tea",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
    }
];
function getItem(req, res) {
    try {
        res.send({ items: items });
        console.log(items, 'items');
    }
    catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}
exports.getItem = getItem;
function addItem(req, res) {
    console.log("first2");
    try {
        var name = req.body.name;
        var _a = req.body, price = _a.price, description = _a.description, image = _a.image;
        if (!name)
            throw new Error("Name of product is requires");
        var id = helpers_1["default"]();
        if (!id)
            throw new Error("Id is missing");
        items.push({ name: name, id: id, price: price, description: description, image: image });
        res.send({ items: items });
        console.log("first");
    }
    catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}
exports.addItem = addItem;
function deleteItem(req, res) {
    try {
        var itemId_1 = req.body.itemId;
        if (!itemId_1)
            throw new Error("itemId is missing");
        items = items.filter(function (item) { return item.id !== itemId_1; });
        res.send({ items: items });
    }
    catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}
exports.deleteItem = deleteItem;
function updateItem(req, res) {
    try {
        var _a = req.body, id_1 = _a.id, newName = _a.newName;
        if (!id_1)
            throw new Error('Id is missing');
        if (!newName)
            throw new Error('newName is missing');
        var index = items.findIndex(function (item) { return item.id === id_1; });
        if (index === -1)
            throw new Error("Couldnt find product with id " + id_1 + " in products");
        items[index].name = newName;
        res.send({ items: items });
    }
    catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}
exports.updateItem = updateItem;
exports.addUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, error, user, userDB, cookie, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                error = productModel_1.userValidation.validate({ email: email, password: password }).error;
                if (error)
                    throw error;
                user = new productModel_1["default"]({ email: email, password: password });
                return [4 /*yield*/, user.save()];
            case 1:
                userDB = _b.sent();
                //check if email exists
                //  if dont exists add email and password
                console.log(userDB);
                //  const findUser = await userModel.findOne({email});
                if (userDB) {
                    cookie = userDB._id;
                    console.log(cookie);
                    res.cookie("user", cookie);
                    res.send({ ok: true, user: user });
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                res.send({ error: error_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, userDB, count, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, productModel_1["default"].findOne({ email: email, password: password })];
                case 1:
                    userDB = _b.sent();
                    if (!userDB)
                        throw new Error("User or password are inccorect");
                    count = userDB.count;
                    if (!count)
                        count = 0;
                    count++;
                    return [4 /*yield*/, productModel_1["default"].updateOne({ email: email }, { count: count })];
                case 2:
                    _b.sent();
                    console.log(count);
                    res.send({ count: count });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    res.send({ error: error_2.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function getCookie(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, userDB, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log(req.cookie);
                    user = req.cookie.user;
                    console.log("user", user);
                    return [4 /*yield*/, productModel_1["default"].findById({ user: user })];
                case 1:
                    userDB = _a.sent();
                    console.log(userDB);
                    res.send({ ok: true, userDB: userDB });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.send({ error: error_3 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCookie = getCookie;
function setHello1(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            try {
                console.log(req.headers);
                id = req.cookies.id;
                console.log('id', id);
                if (id) {
                    console.log("Client with id " + id + " returned");
                    //save some data on name2
                }
                else {
                    res.cookie("id", Math.floor(Math.random() * 10000000));
                    console.log("we have a new user");
                }
                res.send({ ok: true }); //Sets name = express
            }
            catch (error) {
                res.send({ error: error.message });
            }
            return [2 /*return*/];
        });
    });
}
exports.setHello1 = setHello1;
function getMyProducts(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, userId, productsDB, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    //get user id
                    console.log("getmyproducts");
                    user = req.cookies.user;
                    if (!user)
                        throw new Error("User is missing!!!!!");
                    console.log('user', user);
                    userId = user;
                    return [4 /*yield*/, productModel_2["default"].find({ ownerId: userId })];
                case 1:
                    productsDB = _a.sent();
                    console.log('userid', userId);
                    res.send({ ok: true, products: productsDB });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    res.send({ error: error_4.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getMyProducts = getMyProducts;
function addFoodCalorie(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cart, _a, FoodName, FoodCalories, newFoodDB, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('addFoodCalorie');
                    cart = new productModel_2["default"]({ title: 'ice cream!!!',
                        price: 19,
                        ownerId: '222',
                        count: 1,
                        description: 'best ice cream in the world',
                        image: 'https://cdn.auth0.com/blog/whatabyte/pizza-sm.png' });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    _a = req.body, FoodName = _a.FoodName, FoodCalories = _a.FoodCalories;
                    if (!FoodName)
                        throw new Error("FoodName is missing!!!!!");
                    console.log('FoodName', FoodName);
                    return [4 /*yield*/, new productModel_2["default"]({ FoodName: FoodName, FoodCalories: FoodCalories })];
                case 2:
                    newFoodDB = _b.sent();
                    res.send({ ok: true, cart: newFoodDB });
                    return [4 /*yield*/, cart.save()];
                case 3:
                    _b.sent();
                    console.log("addFoodCalorie!");
                    console.log(cart);
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _b.sent();
                    console.log(error_5);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.addFoodCalorie = addFoodCalorie;
function insertProducts(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var foodName, days, food, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    foodName = req.body.foodName;
                    days = req.body.days;
                    food = new productModel_2["default"]({ foodName: foodName, daysSinceIAte: days });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, food.save()];
                case 2:
                    _a.sent();
                    res.send("inserted data");
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    console.log(error_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.insertProducts = insertProducts;
;
