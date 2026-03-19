import { useEffect, useState } from "react";
import BookCard from "../components/BookCard/BookCard";
import SearchBar from "../components/SearchBar/SearchBar";
import { useBook } from "../context/BookContext";
import { RotatingLines } from "react-loader-spinner";
import './Home.css';
import Navbar from "../components/Navbar/Navbar";

const Home = () => {
  const {books , loading , searchBooks} = useBook();

  useEffect(() => {
    searchBooks('js');
  }, []);



  return (
    <>
        <Navbar />
        <SearchBar />
        {loading ? (
            <div className="loader-container">
                <RotatingLines
                    visible={true}
                    height="80"
                    width="80"
                    color="#3b82f6"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                />
                <p>Curating your library...</p>
            </div>
        ) : (
            <div className="book-list">
                {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>

        )}
    </>
  );
};

export default Home;
