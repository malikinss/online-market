const UserAddress = require("../models/UserAddresses");
const ApiError = require("../error/ApiError");

const checkForFalsyValues = require("../utils/falsyChecker");
const findByField = require("../utils/findByField");

class UserAddressController {
    async create(req, res, next) {
        try {
            const { country, city, street, buillding, apartment, postal } =
                req.body;

            checkForFalsyValues([
                country,
                city,
                street,
                buillding,
                apartment,
                postal,
            ]);

            const address = await UserAddress.create({
                country,
                city,
                street,
                buillding,
                apartment,
                postal,
            });
            return res.json(address);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const addresses = await UserAddress.findAll();
            return res.json(addresses);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAddress(req, res, next) {
        try {
            const { id } = req.params;
            const address = await findByField(id, UserAddress, next);
            return res.json(address);
        } catch (e) {
            next(ApiError.badRequest(e.request));
        }
    }

    async updateById(req, res, next) {
        try {
            const { id } = req.params;
            const { country, city, street, buillding, apartment, postal } =
                req.body;

            const address = await findByField(id, UserAddress, next);

            address.country = country || address.country;
            address.city = city || address.city;
            address.street = street || address.street;
            address.buillding = buillding || address.buillding;
            address.apartment = apartment || address.apartment;
            address.postal = postal || address.postal;

            await address.save();

            return res.json(address);
        } catch (e) {
            next(e);
        }
    }

    async deleteById(req, res, next) {
        try {
            const { id } = req.params;

            const address = await findByField(id, UserAddress, next);

            await address.destroy();

            return res.json({ message: "Category deleted successfully" });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserAddressController();
