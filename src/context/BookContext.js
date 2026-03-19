import { createContext, useContext, useState  , useEffect} from "react";
import { fetchBooks } from "../services/api";


const BookContext = createContext();

export const BookProvider = ({children})=>{
    const [books,setBook] = useState([]);
    const [loading,setLoading] = useState(false);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('bookCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('bookCart', JSON.stringify(cart));
    }, [cart]);

    const searchBooks =(query)=>{
        setLoading(true);
        fetchBooks(query).then((data)=>{
            setBook(data);
            setLoading(false);
        })
    }

    const addToCart = (book) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === book.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === book.id 
                        ? { ...item, quantity: (item.quantity || 1) + 1 } 
                        : item
                );
            }
            return [...prevCart, { ...book, quantity: 1 }];
        });
    };

    const updateQuantity = (bookId, delta) => {
        setCart((prevCart) => 
            prevCart.map((item) => {
                if (item.id === bookId) {
                    const newQuantity = (item.quantity || 1) + delta;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
                }
                return item;
            })
        );
    };

    const removeFromCart = (bookId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
    };

    const value = {books,loading,searchBooks, cart, addToCart, removeFromCart, updateQuantity};

    return(
        <BookContext.Provider value={value}>
            {children}
        </BookContext.Provider>
    )
}

export const useBook = ()=>useContext(BookContext);