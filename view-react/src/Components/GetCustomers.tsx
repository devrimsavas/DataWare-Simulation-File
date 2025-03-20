import { useState, useEffect } from "react";

const GetCustomers = () => {
  const [customers, setCustomers] = useState<
    {
      name: { first: string; last: string };
      location: { city: string; state:string,country: string};
      email: string; // Using email as a unique key
    }[]
  >([]);

  

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/customers/getcustomers"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setCustomers(data.results); 
        
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    getCustomers();
  }, []); 

  return (
    <div id="customer-table">
      <table>
        <thead>
          <tr>
            <th>Id </th>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer,index) => (
            <tr key={customer.email}>
              
              <td>{index}</td>
              <td>
                {customer.name.first} {customer.name.last}
              </td>
              
              <td>{customer.location.city}</td>
              <td>{customer.location.state}</td>
              
              <td>{customer.location.country}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetCustomers;
