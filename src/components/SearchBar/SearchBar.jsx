import React, { useState } from 'react'
import { useBook } from '../../context/BookContext';
import './SearchBar.css';

const SearchBar = () => {
    const [query , setQuery] = useState('');
    const {searchBooks} = useBook();
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if(query.trim())
            searchBooks(query);

    }

    return (
    <form onSubmit={handleSubmit}>
        <input 
            type = "text"
            placeholder='Search for books...'
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
        />
        <button type='submit'>Search</button>

       
    </form>
  )
}

export default SearchBar
