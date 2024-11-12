# Controller Utilities 📦

## Description 📝

The `controllerUtils` directory provides a collection of utility functions that simplify common tasks in a Node.js application.
These utilities cover database querying, JWT generation, message handling, and data validation.
Each sub-module serves a specific purpose to improve code maintainability and reusability.

The sub-modules included are:

-   **findHandlers**: Utility functions for querying and filtering database records using Sequelize.
-   **generateJWT**: Functions for generating secure JSON Web Tokens (JWT) for user authentication.
-   **messagesHandler**: Utility to print colored messages to the console for better feedback and readability.
-   **validations**: A set of validation utilities to ensure data integrity and security, including checks for uniqueness, falsy values, and password validation.

## Purpose 🎯

The purpose of this directory is to centralize and simplify common tasks required in a web application, such as interacting with the database, generating JWT tokens, printing colored messages to the console, and validating user data.
By using these utilities, you can avoid code duplication and improve maintainability.

## How It Works 🔍

Each sub-module within `controllerUtils` performs the following tasks:

1. **findHandlers**:

    - Functions to query models in a Sequelize-based database, filter records, and handle exclusions and inclusions.
    - Examples: `findModelExcludingId`, `findRecordsByField`, `findRecordsByFieldInclude`.

2. **generateJWT**:

    - Generates a signed JWT using user credentials (ID, email, role).
    - Ensures secure token generation with secret keys and expiration time configured via environment variables.

3. **messagesHandler**:

    - Allows you to print colored messages to the console using ANSI color codes.
    - Includes functions for success and error messages with predefined formats.

4. **validations**:
    - Provides data validation utilities, including checking the uniqueness of fields, ensuring no falsy values, and validating passwords.
    - Examples: `checkFieldUniqueness`, `containsFalsyValues`, `getValidHashedPassword`.

## Output 📜

The output from these utilities typically includes:

-   **findHandlers**: A single record, an array of records, or `null`. In case of an error, a custom `ApiError` is thrown.
-   **generateJWT**: A signed JWT string.
-   **messagesHandler**: Color-coded success and error messages printed to the console.
-   **validations**: Validation results, either a boolean (for falsy value checks) or an error thrown if validation fails.

## Usage 📦

### **Step 1**: Import the necessary utility functions

    ```js
    // findHandlers
    const dbUtils = require("./path/to/findHandlers");
    // generateJWT
    const generateJWT = require("./path/to/generateJWT");
    // messagesHandler
    const { messages } = require("./path/to/messagesHandler");
    // validations
    const { checkFieldUniqueness, containsFalsyValues, getValidHashedPassword } = require("./path/to/validations");
    ```

### **Step 2**: Use the functions based on your needs

-   `findHandlers` Example:

    ```js
    const user = await dbUtils.findModelExcludingId(
        value,
        field,
        UserModel,
        userId
    );
    const records = await dbUtils.findAllRecords(Model);
    ```

-   `generateJWT` Example:

    ```js
    const token = generateJWT("userId", "userEmail", "userRole");
    console.log(token); // Generated JWT
    ```

-   `messagesHandler` Example:

    ```js
    console.log(messages.success("User", "created"));
    console.log(messages.errors.actionFailed("create", "User"));
    ```

-   `validations` Example:
    ```js
    await checkFieldUniqueness("user@example.com", "email", UserModel);
    const hashedPassword = await getValidHashedPassword("UserPassword123!");
    ```

## Conclusion 🚀

The controllerUtils directory provides essential utilities that simplify and standardize common operations in a Node.js application.
By using these utilities, you can ensure cleaner, more maintainable code that is easier to debug and scale.
Whether it's generating secure JWTs, querying a database, printing colored messages, or validating data, these utilities help streamline your development workflow.
