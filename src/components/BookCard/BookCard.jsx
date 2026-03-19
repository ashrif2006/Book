import "./BookCard.css";
import { Link } from "react-router-dom";
import { useBook } from "../../context/BookContext";

function BookCard({ book }) {
  const { addToCart } = useBook();
  
  return (
    <div className="book-card">
      <img
        style={{ width: "100px" }}
        src={(book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/100x150?text=No+Cover").replace("http://", "https://")}
        alt="cover"
      />
      <div style={{ maxWidth: "50%" }}>
        <h3 style={{ maxWidth: "300px" }}>{book.volumeInfo.title}</h3>
        <p>Published: {book.volumeInfo.publishedDate}</p>
        <div className="card-actions">
          <Link to={`/book/${book.id}`} className="details-btn">
            Details
          </Link>
          <button 
            className="add-to-cart-btn"
            onClick={() => addToCart(book)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
