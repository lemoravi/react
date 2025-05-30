import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import PrivateComponent from './components/PrivateComponent';
import { BrowserRouter ,Routes , Route } from 'react-router-dom';
import UpdateProduct from './components/UpdateProduct';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <div className="App">
      <header className="App-headerr">
        <BrowserRouter>
        <Nav/>
        <Routes>
          <Route element={<PrivateComponent/>}>
            <Route path='/' element={<ProductList/>}></Route>
            <Route path='/add' element={<AddProduct/>}></Route>
            <Route path='/update/:id' element={<UpdateProduct/>}></Route>
            <Route path='/logout' element={<h1>Product update</h1>}></Route>
          </Route>
          
          <Route path='/signup' element={<SignUp/>}>SignUp</Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

        </Routes>
        </BrowserRouter>       
      </header>
      <Footer/>
    </div>
  );
}

export default App;
