
import {BrowserRouter,Route,Routes} from "react-router-dom";

import "./App.css"




import NavBar from "./Components/NavBar";
import Index from "./Components/Index";
import Products from "./Components/Products";
import Customers from "./Components/Customers"
import Sales from "./Components/Sales";

function App() {
  

  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Index/>} />
      <Route path="/products" element={<Products/>} />
      <Route path="/customers" element={<Customers/>} />
      <Route path="/sales" element={<Sales/>} />
    </Routes>
    </BrowserRouter>

  )
}

export default App
