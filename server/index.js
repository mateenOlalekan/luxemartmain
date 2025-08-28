const express = require("express");
const dotenv = require("dotenv").config();
const logger = require("./middleware/logger"); 

const app = express();
const port = process.env.PORT || 6880;


app.use(express.json());
app.use(logger)





// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
