class NotFoundError extends Error {
  constructor(message, options) {
    super(`404 not found: ${message}, options: ${options}`);
  }
}

class InvalidInputError extends Error {
  constructor(message, options) {
    super(`400 invalid Input: ${message}, options: ${options}`);
  }
}
  
  module.exports = {NotFoundError,InvalidInputError};