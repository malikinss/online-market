const messages = {
  requirements: {
    firstName:
      "First name must contain only Latin letters and be between 2 and 20 symbols long.",
    lastName:
      "The last name must be longer than 1 symbol and contain only Latin letters.",
    email:
      "Email must contain only Latin letters and follow the format username@domain.country_code",
    password:
      "Password must have a length between 8 to 20 symbols and include a-z, A-Z, 0-9, and next special symbols: !@#$%^&*.",
    phone: "Phone number must start with 0 and be 10 digits long.",
    role: "Role must be either user or admin.",
    country:
      "The country name must contain only Latin letters, spaces, hyphens, apostrophes and must be between 2 and 100 characters long.",
    city: "The city name must contain only Latin letters, spaces, hyphens, apostrophes and must be between 2 and 100 characters long.",
    street:
      "The street name must contain only Latin letters, spaces, hyphens, apostrophes and must be between 2 and 100 characters long.",
    building: "The building number must be an integer from 1 to 9999.",
    appartment: "The apartment number must be an integer from 1 to 9999.",
    postal:
      "The postal code must be 7 digits long and comply with the Israeli postal code format.",
    status:
      "The order status must be in [Created, Paid, Awaiting payment, Payment error, Payment cancelled]",
    price:
      "The price must be a number with a maximum of 8 digits before the decimal point and no more than 2 digits after the decimal point.",
    img: "The image URL must end with .jpg, .jpeg, .png, or .gif",
    
  },

  success: {
    template: "Here will be any message", // TEMPLATE
  },

  error: {
    requirements: (element) => `The ${element} does not meet the requirements`,
  },
};

module.exports = { messages };
