const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Code Royale Backend is running 🚀");
});

const PORT = 8080;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
