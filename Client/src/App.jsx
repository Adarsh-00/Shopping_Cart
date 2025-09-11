import { useEffect, useState } from "react";
import AddDataForm from "./Components/AddDataForm";
import Navbar from "./Components/Navbar";
import ShoppingItems from "./Components/ShoppingItems";
import Cart from "./Components/Cart";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  useEffect(() => {
    if(darkMode === true){
      document.body.style.backgroundColor = '#1f1f1f';
      document.body.style.color = '#ccd9cf';
    }
    else {
      document.body.style.backgroundColor = '#ccd9cf';
      document.body.style.color = '#1f1f1f';
    }
  }, [darkMode]);
  return (
    <>
      <Navbar night={darkMode} setNight={setDarkMode} />
      <Routes>
        <Route path="/add-data" element={<AddDataForm night={darkMode} />} />
        <Route path="/" element={
          <div className='d-flex flex-wrap flex-md-row my-4 mx-4' style={{ gap: '6rem' }}>
            <ShoppingItems night={darkMode} addItems={setCartItem} product={cartItem} />
          </div>
        } />
        <Route path="/my-cart" element={<Cart product={cartItem} addItems={setCartItem}/>} />

      </Routes>
    </>
  );
}

export default App;
