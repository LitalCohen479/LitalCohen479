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
function uid() {
    try {
        return "id-" + Math.random().toString(16).slice(2);
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
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
    },
];
function handleGetItems(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var data, items_1, error, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ev.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.get("/items/get-items")];
                case 2:
                    data = (_a.sent()).data;
                    console.log("data", data);
                    items_1 = data.items, error = data.error;
                    console.log(data, items_1);
                    if (error)
                        throw new Error(error);
                    renderProducts(items_1);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleAddfood(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var name, id, price, description, image, data, items_2, error, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("trying to create a new item");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    ev.preventDefault();
                    name = ev.target.elements.name.value;
                    id = uid();
                    price = 56;
                    description = "Golda is good";
                    image = "stillanimage";
                    console.log(name, "is the new item name");
                    if (!name)
                        throw new Error("Name is missing");
                    return [4 /*yield*/, axios.post("/items/add-item", {
                            name: name,
                            id: id,
                            price: price,
                            description: description,
                            image: image
                        })];
                case 2:
                    data = (_a.sent()).data;
                    console.log(data, "me2");
                    items_2 = data.items, error = data.error;
                    if (error)
                        throw new Error(error);
                    renderProducts(items_2);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleDeleteItem(itemId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, items_3, error, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!itemId)
                        throw new Error("itemId is missing");
                    return [4 /*yield*/, axios["delete"]("/items/delete-item", {
                            data: { itemId: itemId }
                        })];
                case 1:
                    data = (_a.sent()).data;
                    items_3 = data.items, error = data.error;
                    if (error)
                        throw new Error(error);
                    renderProducts(items_3);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleUpdateItem(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var newName, id, data, items_4, error, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    newName = ev.target.value;
                    if (!newName)
                        throw new Error("Name is missing");
                    id = ev.target.id;
                    if (!id)
                        throw new Error("Id is missing");
                    return [4 /*yield*/, axios.patch("/items/update-item", {
                            id: id,
                            newName: newName
                        })];
                case 1:
                    data = (_a.sent()).data;
                    items_4 = data.items, error = data.error;
                    renderProducts(items_4);
                    if (error)
                        throw new Error(error);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function renderProducts(items) {
    try {
        console.log("hello render");
        var html_1 = "";
        items.forEach(function (item) {
            html_1 += "<div class=\"productCard\">\n      <h1 class=\"item__name\">" + item.name + "</h1>\n      <h1 class=\"item__price\">" + item.price + "</h1>\n      <h1 class=\"item__description\">" + item.description + "</h1><div class=\"edit__title\">\n      <input id='" + item.id + "' type='text' value='" + item.name + "' onblur='handleUpdateItem(event)'/>\n      <button  class=\"btn__update__item\" onclick='handleUpdateItem(\"" + item.id + "\")'>Update Name</button>\n       </div>\n       <div class=\"edit__title\">\n      <input id='" + item.id + "' type='text' value='" + item.price + "' onblur='handleUpdateItem(event)'/>\n      <button  class=\"btn__update__item\" onclick='handleUpdateItem(\"" + item.id + "\")'>Update Price</button>\n       </div>\n       <div class=\"edit__title\">\n      <input id='" + item.id + "' type='text' value='" + item.description + "' onblur='handleUpdateItem(event)'/>\n      <button  class=\"btn__update__item\" onclick='handleUpdateItem(\"" + item.id + "\")'>Update Description</button>\n       </div>\n       <div class=\"edit__title\">\n       <input id='" + item.id + "' type='text' value='" + item.image + "' onblur='handleUpdateItem(event)'/>\n       <button  class=\"btn__update__item\" onclick='handleUpdateItem(\"" + item.id + "\")'>Update Image</button>\n        </div>\n      <button  class=\"btn__delete__item\" onclick='handleDeleteItem(\"" + item.id + "\")'>Delete</button>\n     <div  class=\"img__root\"><img src=" + item.image + " alt=\"img\"/></div>\n\n      </div>";
        });
        var root = document.querySelector("#root");
        if (!root)
            throw new Error("No root was captured from DOM");
        root.innerHTML = html_1;
    }
    catch (error) {
        console.error(error);
    }
}
