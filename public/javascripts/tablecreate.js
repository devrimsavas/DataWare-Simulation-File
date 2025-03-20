console.log("table data");

let salesData = [];

function datawarehouseTable() {
  const container = document.querySelector(".table-responsive"); // Select the container where the table should be inserted
  container.innerHTML = ""; // Clear previous content

  const table = document.createElement("table");
  table.id = "sales-table";
  table.classList.add("table");

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

module.exports = datawarehouseTable();
