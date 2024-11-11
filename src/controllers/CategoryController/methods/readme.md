# CategoryController Methods 📂

## Description 📝

This directory contains various methods to manage Category records in the database.
These methods enable CRUD operations (Create, Read, Update, Delete) on categories, providing an efficient way to interact with category data through a API in an Express.js application.

## Purpose 🎯

The purpose of these methods is to facilitate operations on Category data.

## Method 🔍

1. `createCategory.js`

-   Functionality: Creates a new category.
-   Parameters:
    -   `req`: Express request object; expects `name` in `req.body`.
    -   `res`: Express response object to send the response.
    -   `next`: Express middleware function for error handling.
-   Returns: JSON object of the newly created category.
-   Exceptions: Throws an `ApiError` if the creation fails or if input validation fails.

2. `deleteCategory.js`

-   Functionality: Deletes a category by its ID.
-   Parameters:
    -   `req`: Express request object; expects `id` in `req.params`.
    -   `res`: Express response object to send the success message.
    -   `next`: Express middleware function for error handling.
-   Returns: JSON object with a success message.
-   Exceptions: Throws `ApiError` if the ID is not provided or if the category is not found.

3. `getCategories.js`

-   Functionality: Retrieves all category records.
-   Parameters:
    -   req: Express request object.
    -   res: Express response object to send the array of categories.
    -   next: Express middleware function for error handling.
-   Returns: JSON array of all categories.
-   Exceptions: Throws `ApiError` if no categories are found or if there is an error in fetching data.

4. `updateCategory.js`

-   Functionality: Updates the name of an existing category by its ID.
-   Parameters:
    -   req: Express request object; expects `id` in `req.params` and `newName` in `req.body`.
    -   res: Express response object to send the updated category.
    -   next: Express middleware function for error handling.
-   Returns: JSON object of the updated category.
-   Exceptions: Throws `ApiError` if the ID or new name is not provided, if the category is not found, or if the update fails.

## Usage 📦

1. **Create a New Category**:

    - Endpoint: `POST /categories`
    - Body: `{ "name": "New Category" }`

2. **Delete a Category by ID**:

    - Endpoint: `DELETE /categories/:id`
    - Params: `id` (ID of the category to delete)

3. **Retrieve All Categories**:

    - Endpoint: `GET /categories`

4. **Update a Category's Name by ID**:

    - Endpoint: `PUT /categories/:id`
    - Params: `id` (ID of the category to update)
    - Body: `{ "newName": "Updated Category Name" }`

## Conclusion 🚀

These methods provide a robust way to manage `Category` records in the database.
By following the CRUD principles, this setup allows for a streamlined experience when handling category data.
Proper error handling and response messaging are implemented for reliable and user-friendly API interactions.
