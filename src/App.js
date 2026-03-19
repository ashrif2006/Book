
import './App.css';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import { BookProvider } from './context/BookContext';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BookProvider>
      

      <div className="App">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/book/:id' element={<BookDetails />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
      </div>
      
    </BookProvider>
  );
}

export default App;
