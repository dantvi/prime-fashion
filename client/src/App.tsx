import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './pages/Navigation';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Products from './pages/Products';
import UpdateProductForm from './components/UpdateProductForm';
import Customers from './pages/Customers';
import UpdateCustomerForm from './components/UpdateCustomerForm';
import Orders from './pages/Orders';
import UpdateOrderStatusForm from './components/UpdateOrderStatusForm';
import OrderDetails from './pages/OrderDetails';
import OrderConfirmation from './pages/OrderConfirmation';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<h1>Welcome to our shop!</h1>} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/products' element={<Products />} />
        <Route path='/update-product/:id' element={<UpdateProductForm />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/update-customer/:id' element={<UpdateCustomerForm />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/update-order/:id' element={<UpdateOrderStatusForm />} />
        <Route path='/order-details/:id' element={<OrderDetails />} />
        <Route path='/order-confirmation' element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
