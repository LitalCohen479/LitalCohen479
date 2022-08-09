"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const productModel_1 = __importDefault(require("./model/productModel"));
const port = process.env.PORT || 3010;
require('dotenv').config();
const app = express_1.default();
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
const mongodb_uri = process.env.MONGODB_URI;
mongoose_1.default.connect(mongodb_uri).then(() => {
    console.log('connected to DB');
}).catch(err => {
    console.log('At mongoose.connect:');
    console.error(err.message);
});
const helpers_1 = __importDefault(require("./control/helpers"));
console.log(helpers_1.default());
const itemsRouter_1 = __importDefault(require("./routes/itemsRouter"));
app.use('/items', itemsRouter_1.default);
const userRoute_1 = __importDefault(require("./routes/userRoute"));
app.use("/users", userRoute_1.default);
const clientsRouter_1 = __importDefault(require("./routes/clientsRouter"));
app.use('/clients', clientsRouter_1.default);
const productRouter_1 = __importDefault(require("./routes/productRouter"));
app.use('/products', productRouter_1.default);
const insertRouter_1 = __importDefault(require("./routes/insertRouter"));
app.use('/insert', insertRouter_1.default);
const pizza = new productModel_1.default({ title: "Pizza", ownerId: "12345", price: 89 });
pizza.save();
const Burger = new productModel_1.default({ title: "Burger", ownerId: "123456", price: 75 });
Burger.save();
const Milky = new productModel_1.default({ title: "Milky", ownerId: "123458", price: 38 });
Milky.save();
const Pasta = new productModel_1.default({ title: "Pasta", ownerId: "123450", price: 64 });
Pasta.save();
const Kinder = new productModel_1.default({ title: "Kinder", ownerId: "123452", price: 24 });
Kinder.save();
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
