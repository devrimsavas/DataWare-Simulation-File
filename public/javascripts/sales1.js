console.log("sales script");

//global array to store sales data
//we need to save it as csv
let salesData = [];

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

    //create table and table head

    //create a row
    let row = "";
    dataWareHouse.forEach(
      (sale) =>
        (row += `                
                <tr> 
                    <td> ${sale.id} </td>
                    <td> ${sale.customer} </td>
                    <td> ${sale.product} </td>
                    <td> ${sale.price.toFixed(2)} USD </td>
                    <td> ${sale.amount} </td>
                    <td> ${sale.totalPrice}
                    <td> ${sale.customerCity} </td>
                    <td> ${sale.customerState} </td>
                    <td> ${sale.customerCountry} </td>              
                    
                    </tr>                           
                    
                    `)
    );
    document.getElementById("sale-table-tbody").innerHTML = ""; // Clear table before adding new data
    document.getElementById("sale-table-tbody").innerHTML = row;
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
    //customerCountries.forEach((c) => console.log(c.customer));
  });

//display datawarehouse table
function datawarehouseTable() {
  const table = document.createElement("table");
  table.innerHTML = "";
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
                <!--dynamic data-->
            </tbody>

    
    `;

  //create a row
  let row = "";
  salesData.forEach(
    (sale) =>
      (row += `                
                <tr> 
                    <td> ${sale.id} </td>
                    <td> ${sale.customer} </td>
                    <td> ${sale.product} </td>
                    <td> ${sale.price.toFixed(2)} USD </td>
                    <td> ${sale.amount} </td>
                    <td> ${sale.totalPrice}
                    <td> ${sale.customerCity} </td>
                    <td> ${sale.customerState} </td>
                    <td> ${sale.customerCountry} </td>              
                    
                    </tr>                           
                    
                    `)
  );

  table.innerHTML = row;
}
