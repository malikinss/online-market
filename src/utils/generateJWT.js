const generateJWT = (id, email, role) => {
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
        throw new Error(
            "SECRET_KEY is not defined in the environment variables."
        );
    }

    const userData = { id, email, role };

    return jwt.sign(userData, secretKey, {
        expiresIn: process.env.JWT_EXPIRATION || "24h", // Expiration configurable via environment variables
    });
};

module.exports = generateJWT;
