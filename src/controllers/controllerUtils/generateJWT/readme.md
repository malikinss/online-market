# JWT Generation Utility 🎯

## Description 📝

This utility generates a JSON Web Token (JWT) for a user using the `jsonwebtoken` package.
It takes the user's ID, email, and role as input and returns a signed JWT that can be used for authentication in a web application.
The JWT is signed using a secret key stored in the environment variables.

## Purpose 🎯

The purpose of this utility is to securely generate a JWT for a user, which can then be used for authenticating requests in a system that requires user validation.
This token is created with a configurable expiration time and is signed using a secret key stored in the environment.

## How It Works 🔍

1. The function `generateJWT` accepts three parameters: `id`, `email`, and `role` of the user.
2. It checks if the required environment variables `SECRET_KEY` and `JWT_EXPIRATION` are set.
3. If the secret key is not found, it throws an error.
4. It uses the `jsonwebtoken` package to sign the user data into a JWT and returns it.
5. If any required user data is missing or if an error occurs during the signing process, it throws an appropriate error.

## Output 📜

The function returns a signed JWT token as a string, which can be used in the Authorization header of HTTP requests.

## Usage 📦

1. Ensure that the environment variables `SECRET_KEY` and `JWT_EXPIRATION` are defined:
    - `SECRET_KEY`: The secret key used to sign the JWT.
    - `JWT_EXPIRATION`: The expiration time of the token (default is 24 hours).
2. Import the `generateJWT` function in your Node.js application:
    ```javascript
    const generateJWT = require("./path/to/generateJWT");
    ```
3. Call the function with the required parameters:
    ```js
    const token = generateJWT("userId", "userEmail", "userRole");
    console.log(token); // This is the generated JWT
    ```
4. Use the generated JWT in your API requests to authenticate the user.

## Conclusion 🚀

This utility simplifies the process of generating a secure JWT for user authentication in a Node.js environment.
It ensures the safety of the token generation by verifying the necessary environment variables and handling errors appropriately.
