import { useState, useEffect } from "react";
interface IProduct {
    id:number;
    title:string;
    price:number;
    category:string;
}
const GetProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        "http://localhost:3000/products/getproducts"
      );
      const products = await response.json();
      setProducts(products);
    };
    getProducts();
  }, []);

  return (
    <div id="product-table">
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Title</td>
            <td>Price</td>
            <td>Category</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product:IProduct) => (
            <tr key={product.id}>
              <td> {product.id}</td>
              <td> {product.title} </td>
              <td> {product.price}</td>
              <td> {product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetProducts;
