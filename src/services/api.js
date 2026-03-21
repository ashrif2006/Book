const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const getCache = (key) => {
    const cached = sessionStorage.getItem(key);
    return cached ? JSON.parse(cached) : null;
};

const setCache = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
};


export const fetchBooks = (query)=>{
    const cacheKey = `books_search_${query}`;
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
        return Promise.resolve(cachedData);
    }

    return fetch(`${BASE_URL}?q=${query}&maxResults=12`)
    .then((response)=> response.json())
    .then((data)=> {
        const items = data.items || [];
        setCache(cacheKey, items);
        return items;
    })
    .catch((error)=>{
        console.error('Error fetching books:', error);
        return [];
    });
};



export const fetchBookDetails = (bookId)=>{
    const cacheKey = `book_details_${bookId}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) {
        return Promise.resolve(cachedData);
    }

    return fetch(`${BASE_URL}/${bookId}`)
    .then((response)=> response.json())
    .then((data) => {
        setCache(cacheKey, data);
        return data;
    })
    .catch((error)=>{
        console.error('Error fetching book details:', error);
        return null;
    });
};

