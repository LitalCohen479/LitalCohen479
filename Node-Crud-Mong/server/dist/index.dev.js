"use strict";

var express = require('express');

var mongoose = require('mongoose');

var cors = require('cors');

var app = express();

var FoodModel = require('./models/Food');

var _require = require('express'),
    text = _require.text;

var count = 0;
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://Lital:O7uzorYhU9dO9QnZ@cluster0.kuj1lnc.mongodb.net/food?retryWrites=true&w=majority', {
  useNewUrlParser: true
}).then(function () {
  console.log('connected to DB');
})["catch"](function (err) {
  console.log('At mongoose.connect:');
  console.error(err.message);
});
app.post('/insert', function _callee(req, res) {
  var foodName, days, calories, food;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          foodName = req.body.foodName;
          days = req.body.days;
          calories = req.body.calories;
          food = new FoodModel({
            foodName: foodName,
            daysSinceIAte: days,
            calories: calories
          });
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(food.save());

        case 7:
          res.send("inserted data");
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](4);
          console.log(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 10]]);
});
app.get('/read', function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          FoodModel.find({}, function (err, result) {
            if (err) {
              res.send(err);
            }

            res.send(result);
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.put('/update', function _callee3(req, res) {
  var newFoodName, id;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log('put');
          newFoodName = req.body.newFoodName;
          id = req.body.id;

          if (newFoodName) {
            _context3.next = 5;
            break;
          }

          throw new Error('no new food name');

        case 5:
          _context3.prev = 5;
          _context3.next = 8;
          return regeneratorRuntime.awrap(FoodModel.findById(id, function (err, updatedFood) {
            updatedFood.foodName = newFoodName;
            console.log(newFoodName);
            updatedFood.save();
            res.send("update");
          }));

        case 8:
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](5);
          console.log(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 10]]);
});
app["delete"]('/delete/:id', function _callee4(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(FoodModel.findByIdAndRemove(id).exec());

        case 3:
          res.send('deleted');

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.get('/calories:calories', function _callee5(req, res) {
  var calories;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          calories = req.params.calories;
          console.log('callll', calories);
          _context5.next = 4;
          return regeneratorRuntime.awrap(function getTotalCalories() {
            var totalCalories = 1200;
            console.log('totalCalories', totalCalories);
            var remainCalories = totalCalories - calories;
            console.log('remainCalories', remainCalories, 'calories', calories);
          });

        case 4:
          res.send(calories);

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.listen(3003, function () {
  console.log('Server running on port 3003');
});