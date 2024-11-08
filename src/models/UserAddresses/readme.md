# UserAddress Model 🏠

## Description 📝

The `UserAddress` model represents the schema for storing user addresses, leveraging Sequelize to map address information into database records.
It defines essential fields like country, city, street, and building, while allowing optional fields like apartment.

## Purpose 🎯

This model helps maintain accurate and structured address information for each user in the application, providing easy access and validation for address data entries, which can be used in the context of shipping, billing, or user profiles.

## How It Works 🔍

1. **Database Connection**: Connects to the Sequelize instance configured in `dbConnect`.
2. **Field Definitions**:
    - `id`: Primary key, auto-incremented integer that uniquely identifies each address.
    - `country`: Required string representing the user's country.
    - `city`: Required string for the user's city.
    - `street`: Required string for the user's street name.
    - `building`: Required integer indicating the building number.
    - `apartment`: Optional integer for apartment number, if applicable.
    - `postal`: Required integer representing the postal code.
3. **Validation**:
    - Each field uses `createValidation` with rules from `validationRules` to ensure data integrity, checking for expected formats or values.

## Fields 📜

-   **id**: Auto-incremented integer, primary key.
-   **country**: String, required, validated using custom rules.
-   **city**: String, required, validated using custom rules.
-   **street**: String, required, validated using custom rules.
-   **building**: Integer, required, representing the building number.
-   **apartment**: Integer, optional, for apartment number.
-   **postal**: Integer, required, for postal code.

## Usage 📦

1. **Import Model**:
    ```javascript
    const UserAddress = require("./models/UserAddresses/UserAddresses");
    ```
2. **Create a New Address**:

    ```javascript
    UserAddress.create({
        country: "USA",
        city: "New York",
        street: "5th Avenue",
        building: 101,
        apartment: 12,
        postal: 10001,
    })
        .then((address) => console.log("Address created:", address))
        .catch((error) => console.error("Failed to create address:", error));
    ```

3. **Update Address**:

    ```javascript
    UserAddress.update({ city: "San Francisco" }, { where: { id: 1 } })
        .then(() => console.log("Address updated"))
        .catch((error) => console.error("Failed to update address:", error));
    ```

4. **Retrieve All Addresses**:
    ```javascript
    UserAddress.findAll()
        .then((addresses) => console.log("User addresses:", addresses))
        .catch((error) =>
            console.error("Failed to retrieve addresses:", error)
        );
    ```

## Conclusion 🚀

The UserAddress model is essential for managing user address data, incorporating validation to ensure address accuracy and supporting easy data retrieval and modification for address-related functionalities within the application.
