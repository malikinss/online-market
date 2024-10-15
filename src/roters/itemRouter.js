const Router = require("express");
const router = new Router();
const itemController = require("../controllers/itemController");

// http://127.0.0.1:3000/api/item
// POST маршрут для добавления элемента
router.post('/', itemController.addItem);

// GET маршрут для получения всех элементов (заглушка)
router.get('/', itemController.getAllItems); 

// TO DO
// router.post('/', itemController.create);
// router.get('/', itemController.getAll);
// router.get('/:id', itemController.getOne);

module.exports = router;