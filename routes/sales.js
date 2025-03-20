const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs");

//export axios
const axios = require("axios");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/sales.html"));
});

//fetch and payload json
let datawareHouse = [];
router.get("/getsales", async (req, res) => {
  // If data already exists, return it
  if (datawareHouse.length > 0) {
    return res.status(200).json({
      statusCode: 200,
      message: "DataWarehouse already contains sales data.",
      datawareHouse,
    });
  }

  // If empty, fetch new data
  const customerUrl = "http://localhost:3000/customers/getcustomers";
  const productUrl = "http://localhost:3000/products/getproducts";

  try {
    // Fetch customers and products
    const [customerResponse, productResponse] = await Promise.all([
      axios.get(customerUrl),
      axios.get(productUrl),
    ]);

    const customers = customerResponse.data.results; // 200 people
    const products = productResponse.data; // 20 products

    const customerNumber = customers.length;
    const productNumber = products.length;

    // Generate sales data only if empty
    const salesNumber = 400;
    let idCounter = 0;

    for (let i = 0; i < salesNumber; i++) {
      let randomProduct = products[Math.floor(Math.random() * productNumber)];
      let randomCustomer =
        customers[Math.floor(Math.random() * customerNumber)];

      let randomTransactionNumber = Math.floor(Math.random() * 10) + 1;

      let personSales = {
        id: idCounter++,
        customer: `${randomCustomer.name.first} ${randomCustomer.name.last}`,
        product: randomProduct.title,
        price: randomProduct.price,
        amount: randomTransactionNumber,
        totalPrice: randomTransactionNumber * randomProduct.price,
        customerCity: randomCustomer.location.city,
        customerState: randomCustomer.location.state,
        customerCountry: randomCustomer.location.country,
        customerGeoData: randomCustomer.location,
      };

      datawareHouse.push(personSales);
    }

    // Send response
    res.status(200).json({
      statusCode: 200,
      message: "DataWarehouse simulation successful.",
      datawareHouse,
    });
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Bad Request",
    });
  }
});

router.get("/salesgeodata", async (req, res) => {
  try {
    // Check if datawarehouse is empty
    if (datawareHouse.length === 0) {
      return res.status(200).json({
        message: "Datawarehouse is empty",
      });
    }

    // Create an object to store the count of customers per country
    let countryCount = {};
    let geopara = req.params.geoparam || "country";

    // Count occurrences of each country
    datawareHouse.forEach((sale) => {
      let country = sale.customerGeoData.country;
      countryCount[country] = (countryCount[country] || 0) + 1;
    });

    console.log("Country details", countryCount);

    return res.status(200).json({
      countryCount,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: `Error: ${error.message}`,
    });
  }
});

router.get("/exporttofile", async (req, res) => {
  try {
    if (datawareHouse.length === 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "No data available to export",
      });
    }

    // Convert to JSON and write to file
    fs.writeFileSync("sales.json", JSON.stringify(datawareHouse, null, 2));

    res.status(200).json({
      statusCode: 200,
      message: "Data successfully written to sales.json",
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error writing file",
      error: error.message, // Provide detailed error message
    });
  }
});

module.exports = router;
