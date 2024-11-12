# Console Color Output Utility and Messages Handling 🎨

## Description 📝

This utility allows you to print colored messages to the console using ANSI color codes.
It provides an easy way to distinguish different types of messages (e.g., success, error) by coloring the text in various colors.

## Purpose 🎯

The main purpose of this utility is to make console outputs more readable and visually distinguishable.
It is particularly useful for providing feedback on actions such as success or failure, making the user experience more interactive.

## How It Works 🔍

The utility defines a set of ANSI color codes and functions for formatting console messages in those colors.
The main function, `coloredString`, takes the text to be colored and the color name, and it wraps the text in the corresponding ANSI escape codes.

-   **Colored Messages**: The function `coloredString` accepts a `text` string and a `color` string (e.g., `green`, `red`, `blue`, etc.).
-   **Predefined Messages**: It includes predefined success and error messages, allowing easy formatting of messages related to successful actions and error handling.

## Output 📜

-   **Success Messages**: Messages printed in green color.
-   **Error Messages**: Messages printed in orange-red color.

## Usage 📦

1. Clone or download the repository.
2. Import the utility into your project:
    ```js
    const { messages } = require("./path_to_this_file");
    ```
3. Use the `messages.success` or `messages.errors` to print success or error messages:
    ```js
    console.log(messages.success("User", "created"));
    console.log(messages.errors.actionFailed("create", "User"));
    ```

### Example Usage:

```js
const { messages } = require("./path_to_this_file");

// Success message
console.log(messages.success("File", "uploaded"));

// Error message
console.log(messages.errors.actionFailed("delete", "File"));

// General error message
console.log(messages.errors.general("update", "User", "Database error"));
```

## Conclusion 🚀

This utility simplifies the process of printing colorful messages to the console, making it easier to convey feedback in applications.
By using this utility, you can improve the visual appeal and clarity of your program’s console outputs.
