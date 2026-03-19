import React, { useEffect, useState } from 'react';
import { fetchBookDetails } from '../services/api';
import { useParams, Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { useBook } from '../context/BookContext';
import './BookDetails.css';

function BookDetails() {
  const { id } = useParams(); // بيسحب الـ id من الـ URL
  const { addToCart } = useBook();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookDetails(id).then((data)=>{
      setBook(data);
    })
  }, [id]);

  if (!book) {
    return (
      <div className="loader-container">
        <RotatingLines
          visible={true}
          height="80"
          width="80"
          strokeColor="#3b82f6"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
        <p>Fetching book details...</p>
      </div>
    );
  }

  const info = book.volumeInfo;

  return (
    <div className="details-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      <div className="details-container">
        <img 
          src={
            (info.imageLinks?.extraLarge || 
            info.imageLinks?.large || 
            info.imageLinks?.medium || 
            info.imageLinks?.thumbnail || 
            "https://via.placeholder.com/400x600?text=No+Cover+Available").replace("http://", "https://")
          } 
          alt={info.title} 
        />
        <div className="info-side">
          <div className="title-section">
            <h1>{info.title}</h1>
            <button 
              className="details-add-cart-btn"
              onClick={() => addToCart(book)}
            >
              Add to Cart
            </button>
          </div>
          
          <div className="description-container" dangerouslySetInnerHTML={{ __html: info.description }} />
          
          <div className="meta-info">
            {info.authors && (
              <div className="meta-item">
                <span className="meta-label">Authors</span>
                <span className="meta-value">{info.authors.join(', ')}</span>
              </div>
            )}
            
            {info.publishedDate && (
              <div className="meta-item">
                <span className="meta-label">Published</span>
                <span className="meta-value">{info.publishedDate}</span>
              </div>
            )}

            {info.pageCount && (
              <div className="meta-item">
                <span className="meta-label">Pages</span>
                <span className="meta-value">{info.pageCount}</span>
              </div>
            )}

            {info.categories && (
              <div className="meta-item">
                <span className="meta-label">Category</span>
                <span className="meta-value">{info.categories[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;