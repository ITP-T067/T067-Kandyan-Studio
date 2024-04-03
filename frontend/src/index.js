import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Home
import Home from './pages/customer/onlineorder/home.jsx';

//Login
import Login from './pages/login';
import Router from './Components/Common/Router';

//Customer Dashboard



//Manager Dashboard
//Manager Dashboard - Stock Department
import StockMenu from './pages/manager/stock/menu';
import ItemList from './pages/manager/stock/items';
import StockLevels from './pages/manager/stock/stocklevels';
import SupplyRequest from './pages/manager/stock/supplyrequest';

//Manager Dashboard - Event Department

//Manager Dashboard - Finance Department

//Manager Dashboard - Employee Department

//Manager Dashboard - Supplier Department

//Manager Dashboard - Loyalty Department




//Cashier Dashboard
import Ordermain from './pages/cashier/order';
import StockAV from './pages/cashier/Stockavailability';
import AddNewOrder from './pages/cashier/addneworder';
import Pendingorders from './pages/cashier/pendingorders';
import Completedorders from './pages/cashier/Completedorders';



//Creator Dashboard


//Supplier Dashboard


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path='/' element={<Home />} />

        {/* Login */}
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Router />} />

        {/* Customer Dashboard */}
        <Route path='/cusdashboard' element={<Cusdashboard />} />

        {/* Customer addToCart */}
        <Route path='/addtocart' element={<Addtocart/>}/>


        {/* Cashier Dashboard */}
        <Route path='/cashier/ordermain' element={<Ordermain />} />
        <Route path='/cashier/stockavailability' element={<StockAV />} />
        <Route path='/cashier/addneworder' element={<AddNewOrder />} />
        <Route path='/cashier/pendingorders' element={<Pendingorders />} />
        <Route path='/cashier/completedorders' element={<Completedorders />} />
        



        {/* Manager Dashboard - Stock Department */}
        <Route path='/manager/stockdept' element={<StockMenu />} />
        <Route path='/manager/stockdept/items' element={<ItemList />} />
        <Route path='/manager/stockdept/stocklevels' element={<StockLevels />} />
        <Route path='/manager/stockdept/supplyrequest' element={<SupplyRequest />} />

        {/* Manager Dashboard - Event Department */}
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
