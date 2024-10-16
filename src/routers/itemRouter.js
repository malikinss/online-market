const Router = require("express");
const router = new Router();
const itemController = require("../controllers/itemController");

// http://127.0.0.1:3000/api/item
// POST Create item
router.post('/', itemController.create);

// GET all items || all items by category id
router.get('/', itemController.getAll);

// GET item by id
router.get('/:id', itemController.getOne);

module.exports = router;
