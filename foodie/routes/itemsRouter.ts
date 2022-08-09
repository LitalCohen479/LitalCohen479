import express from "express";
import {
  getItem,
  addItem,
  deleteItem,
  updateItem,
  addUser,
  getCookie,
  login,
} from "../control/productsCtrl";
const router = express.Router();

router
  .get("/get-items", getItem)
  .post("/add-item", addItem)
  .delete("/delete-item", deleteItem)
  .patch("/update-item", updateItem)
  .post("/addUser", addUser)
  .get("/getCookie", getCookie)
  .post("/login", login);

export default router;
