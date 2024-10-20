const Item = require("../models/Items");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const { title } = require("process");

class ItemController {
  async create(req, res, next) {
      try {
          const { name, description, price, stock, categoryId } = req.body;
          const { img } = req.files;
          let fileName = uuid.v4() + ".jpg";
          img.mv(path.resolve(__dirname, '..', 'static', fileName));
          const item = await Item.create({ name, description, price, stock, categoryId, img: fileName });

          return res.json(item);
      } catch (e) {
          next(ApiError.badRequest(e.message));
      }
  }

  async getAll(req, res, next) {
      try {
          const { categoryId } = req.query;
          const whereClause = {};

          if (categoryId) {
              whereClause.categoryId = categoryId;
          }

          const items = await Item.findAll({ where: whereClause });

          return res.json(items);
      } catch (e) {
          next(ApiError.badRequest(e.message));
      }
  }

  async getOne(req, res, next) {
      const { id } = req.params;
      const item = await Item.findOne({ where: { id } });

      if (!item) {
          return next(ApiError.notFound('Item not found'));
      }

      return res.json(item);
  }

  async updateById(req, res, next) {
      try {
          const { id } = req.params;
          const { name, description, price, stock, categoryId } = req.body;

          const item = await Item.findOne({ where: { id } });

          if (!item) {
              return next(ApiError.notFound('Item not found'));
          }

          item.name = name || item.name;
          item.description = description || item.description;
          item.price = price || item.price;
          item.stock = stock || item.stock;
          item.categoryId = categoryId || item.categoryId;

          await item.save();

          return res.json(item);
      } catch (e) {
          next(ApiError.badRequest(e.message));
      }
  }

  async deleteById(req, res, next) {
      try {
          const { id } = req.params;
          const item = await Item.findOne({ where: { id } });

          if (!item) {
              return next(ApiError.notFound('Item not found'));
          }

          await item.destroy();

          return res.json({ message: "Item deleted successfully" });
      } catch (e) {
          next(ApiError.badRequest(e.message));
      }
  }
}

module.exports = new ItemController();
