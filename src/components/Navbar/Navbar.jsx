import './Navbar.css';
import { Link } from 'react-router-dom';
import { useBook } from '../../context/BookContext';

function Navbar() {
  const { cart } = useBook();
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2>📚 BookStore</h2>
        </Link>
      </div>
      

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/cart" className="cart-link">
          Cart <span className="cart-count">({totalItems})</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;