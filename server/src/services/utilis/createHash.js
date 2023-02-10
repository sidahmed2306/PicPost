const crypto = require("crypto");

function createHash(password) {
  return crypto.createHash("sha512").update(password, "utf-8").digest("hex");
}

function createRandomSalt() {
  const saltLenghtInBytes = 32;
  const randomSalt = crypto.randomBytes(saltLenghtInBytes).toString("hex");
  return randomSalt;
}

module.exports = {
  createHash,
  createRandomSalt,
};
