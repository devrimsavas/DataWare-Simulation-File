const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs").promises; // Use async-friendly fs.promises
const axios = require("axios");

// Serve the index page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/customers.html"));
});

// Fetch 500 people or return saved data
router.get("/getcustomers", async (req, res) => {
  const filePath = "customers.json";

  try {
    // Check if file exists
    try {
      const data = await fs.readFile(filePath, "utf-8"); // Read file synchronously
      console.log("Reading existing file.");
      return res.status(200).json(JSON.parse(data)); // Send saved data and return
    } catch (err) {
      console.log("File not found, fetching new data.");
    }

    // If file doesn't exist, fetch from API
    const personNumber = 500;
    const url = `https://randomuser.me/api/?results=${personNumber}`;

    const response = await axios.get(url);
    const data = response.data;

    await saveFile(data); // Save new data

    return res.status(200).json(data); // Send fresh data
  } catch (error) {
    console.error("Error fetching customers:", error);
    return res.status(500).json({
      statusCode: "500",
      message: "Bad Request",
    });
  }
});

//search by country 




//save file function 

async function saveFile(dataSource) {
  const filePath = "customers.json";

  try {
    await fs.writeFile(filePath, JSON.stringify(dataSource, null, 2));
    console.log("File saved successfully.");
  } catch (error) {
    console.error("Failed to save file:", error);
  }
}




module.exports = router;
