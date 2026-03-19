import React from 'react';
import { useBook } from '../context/BookContext';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useBook();

  if (cart.length === 0) {
    return (
      <div className="cart-page empty">
        <div className="empty-cart-container">
          <h2>Your cart is empty 📚</h2>
          <p>Explore our library and add some books to your collection!</p>
          <Link to="/" className="browse-btn">Browse Books</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart ({cart.length})</h1>
        <Link to="/" className="back-home-link">← Continue Shopping</Link>
      </div>
      
      <div className="cart-items">
        {cart.map((book) => (
          <div key={book.id} className="cart-item">
            <img 
              src={(book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/100x150?text=No+Cover").replace("http://", "https://")} 
              alt={book.volumeInfo.title} 
            />
            <div className="cart-item-info">
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
              
              <div className="quantity-controls">
                <button 
                  className="qty-btn" 
                  onClick={() => updateQuantity(book.id, -1)}
                  disabled={book.quantity <= 1}
                >
                  −
                </button>
                <span className="qty-value">{book.quantity || 1}</span>
                <button 
                  className="qty-btn" 
                  onClick={() => updateQuantity(book.id, 1)}
                >
                  +
                </button>
              </div>

              <button 
                className="remove-btn" 
                onClick={() => removeFromCart(book.id)}
              >
                Remove Item
              </button>
            </div>
            <Link to={`/book/${book.id}`} className="view-details">Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;