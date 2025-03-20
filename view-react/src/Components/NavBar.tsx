import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div id="navbar-group">
      <ul id="navbar">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/customers">Customers</Link>
        </li>
        <li>
          <Link to="/sales">Sales</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
