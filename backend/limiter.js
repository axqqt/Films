const rateLimit = require("express-rate-limiter");

const limiter = new rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  db: "mongodb+srv://deranged248:derangedfrfrlmao@deranged.bvcwyla.mongodb.net/Videos?retryWrites=true&w=majority",
});

module.exports = limiter;
