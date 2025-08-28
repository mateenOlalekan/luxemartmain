const logger = (req, res, next) => {
    const time = new Date().toString(); // Correctly create and stringify current date
    console.log(`${time} - ${req.method} - ${req.url}`);
    next(); // Proceed to next middleware/route
  };
  
  module.exports = logger; // Optional: export if in a separate file
  