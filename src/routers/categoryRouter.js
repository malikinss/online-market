const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController")

router.post('/', categoryController.create);
router.get('/', categoryController.getAll);
router.put('/:id', categoryController.updateById);
router.delete('/:id', categoryController.deleteById);

module.exports = router;