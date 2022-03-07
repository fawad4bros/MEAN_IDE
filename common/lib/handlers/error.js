module.exports = class OtsError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.message = message;
  }

  get body() {
    return {
      response: this.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : this.stack,
    };
  }
};
