const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooks = (query)=>{
    return fetch(`${BASE_URL}?q=${query}&maxResults=12`)
    .then((response)=> response.json())
    .then((data)=> data.items || [])
    .catch((error)=>{
        console.error('Error fetching books:', error);
        return [];
    });
};


export const fetchBookDetails = (bookId)=>{
    return fetch(`${BASE_URL}/${bookId}`)
    .then((response)=> response.json())
    .catch((error)=>{
        console.error('Error fetching book details:', error);
        return null;
    });
};
