const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const PORT = 9003;
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.listen(PORT, () => console.log("Server ready at port", PORT));
