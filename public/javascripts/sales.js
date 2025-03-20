console.log("sales script");

//global array to store sales data
//we need to save it as csv
let salesData = [];

//const datawarehouseTable = require("tablecreate.js");

//fetch datawarehouse table
async function getDataWareHouse() {
  const url = "http://localhost:3000/sales/getsales";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching");
    }
    const data = await response.json();

    const dataWareHouse = data.datawareHouse;

    //pass datawarehouse to salesData
    salesData = dataWareHouse;
    datawarehouseTable();
  } catch (error) {
    console.error("error", error);
    alert(error);
  }
}

// Function to export stored sales data to CSV
function exportToCsv() {
  if (salesData.length === 0) {
    alert("No sales data available to export!");
    return;
  }

  let csvContent = "ID,Customer,Product,Price,City,State,Country\n"; // CSV headers
  salesData.forEach((sale) => {
    csvContent += `${sale.id},${sale.customer},${sale.product},${sale.price},${sale.customerCity},${sale.customerState},${sale.customerCountry}\n`;
  });
  // Create a Blob and download the file
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "sales_data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

//export to json
async function exportToFile() {
  console.log(salesData);
  const response = await fetch("http://localhost:3000/sales/exporttofile");
  if (!response.ok) {
    throw new Error("error creating file");
  }
  const data = response.json();
  alert(data);
}

//search by country
document
  .getElementById("search-country-input")
  .addEventListener("input", (e) => {
    const county = e.target.value.toLowerCase();
    const customerCountries = salesData.filter((sale) =>
      sale.customerCountry.toLowerCase().includes(county)
    );
    customerCountries.forEach((c) => console.log(c.customer));
  });

//display datawarehouse table

function datawarehouseTable() {
  const container = document.querySelector(".table-responsive"); // Select the container where the table should be inserted
  container.innerHTML = ""; // Clear previous content

  const table = document.createElement("table");
  table.id = "sales-table";
  table.classList.add("table");
  table.classList.add("table-striped");
  table.classList.add("table-dark");
  table.classList.add("p-4");
  table.classList.add("bordered");

  table.innerHTML = `
    <thead>
      <tr>
        <th>Id</th>
        <th>Customer</th>
        <th>Product</th>
        <th>Price</th>
        <th>Total Amount</th>
        <th>Total Payment</th>
        <th>Customer City</th>
        <th>Customer State</th>
        <th>Customer Country</th>
      </tr>
    </thead>
    <tbody id="sale-table-tbody">
    </tbody>
  `;

  container.appendChild(table); // Append the dynamically created table to the container

  // Now populate the table body
  const tbody = document.getElementById("sale-table-tbody");

  let row = "";
  salesData.forEach((sale) => {
    row += `                
      <tr> 
        <td>${sale.id}</td>
        <td>${sale.customer}</td>
        <td>${sale.product}</td>
        <td>${sale.price.toFixed(2)} USD</td>
        <td>${sale.amount}</td>
        <td>${sale.totalPrice}</td>
        <td>${sale.customerCity}</td>
        <td>${sale.customerState}</td>
        <td>${sale.customerCountry}</td>              
      </tr>`;
  });

  tbody.innerHTML = row; // Insert rows inside the table body
}

async function getGeoData() {
  const url = "http://localhost:3000/sales/salesgeodata";
  try {
    const container = document.querySelector(".table-responsive"); // Select container
    container.innerHTML = ""; // Clear previous content

    const response = await fetch(url);
    const data = await response.json();
    console.log(data.countryCount);

    const geoTable = document.createElement("table");
    geoTable.id = "geotable";
    geoTable.classList.add("table");
    geoTable.classList.add("table-striped");
    geoTable.classList.add("table-dark");
    geoTable.classList.add("p-4");
    geoTable.classList.add("bordered");

    geoTable.innerHTML = `
    <thead>
        <tr>
            <th>Country</th>
            <th>Customer Number</th>
        </tr>
    </thead>
    <tbody id="geo-table-body">
    </tbody>
    `;

    container.appendChild(geoTable); // Append table to the container first!

    const geoTableBody = document.getElementById("geo-table-body");

    let row = "";
    Object.entries(data.countryCount).forEach(([country, count]) => {
      row += `
        <tr>
            <td>${country}</td>
            <td>${count}</td>
        </tr>
      `;
    });

    geoTableBody.innerHTML = row; // Add all rows at once for efficiency
  } catch (error) {
    console.error("Error:", error);
  }
}

async function showGraphic() {
  const url = "http://localhost:3000/sales/salesgeodata";
  console.log("Fetching geo data...");

  const dialog = document.getElementById("geodata-div");
  const dimension = document.getElementById("dimensions");

  // Show & position the dialog
  dialog.showModal(); // Use showModal() instead of show() for centering

  dialog.style.alignItems = "center";
  dialog.style.justifyContent = "center";

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    // Convert `countryCount` object into arrays
    const labels = Object.keys(data.countryCount);
    const values = Object.values(data.countryCount);

    // Destroy previous chart instance if it exists
    if (window.myChart) {
      window.myChart.destroy();
    }

    // Create new chart
    window.myChart = new Chart(dimension, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Number of Customers",
            data: values,
            backgroundColor: "rgba(242, 255, 255, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allows resizing
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

function closeGraphic() {
  const dialog = document.getElementById("geodata-div");
  dialog.close();
}
