import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home';
import { useEffect, useState } from "react";
import Cart from './pages/Cart';
import { products } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "./redux/Slices/CartSlice";

const App = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state)
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    setPosts(products);
    setLoading(false);
  }, []);
  let updatedItems=posts;
  const removeFromHomepage = (itemId) => {
     updatedItems = updatedItems.filter((item) => item.id !== itemId);
    setPosts(updatedItems);
  };

  const checkoutHandler = () => {
    cart.forEach((item) => {
      dispatch(remove(item.id));
      removeFromHomepage(item.id);
    });
  };

  return (
    <div>
      <div className="bg-slate-900">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home posts={posts} loading={loading} />} />
        <Route path="/cart" element={<Cart posts={posts} loading={loading} checkoutHandler={checkoutHandler} />} />
      </Routes>
    </div>
  )
};

export default App;
