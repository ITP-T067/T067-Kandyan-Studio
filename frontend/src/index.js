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
import Cusdashboard from './pages/customer/onlineorder/cus_dashboard.jsx';
import Addtocart from './pages/customer/onlineorder/addToCart.jsx'
import Customercart from './pages/customer/onlineorder/customerCart.jsx';
import Myorder from './pages/customer/onlineorder/myOrders.jsx';
import Pendingorder from './pages/customer/onlineorder/pendingOrders.jsx';
import Processingorder from './pages/customer/onlineorder/ProcessingOrders.jsx';
import Completeorder from './pages/customer/onlineorder/CompletedOrders.jsx';
import Generatereport from './pages/customer/onlineorder/GenerateReports.jsx';

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
        <Route path='/myorder' element={<Myorder/>}/>
        <Route path='/pendingorder' element={<Pendingorder/>}/>
        <Route path='/processingorder' element={<Processingorder/>}/>
        <Route path='/completeorder' element={<Completeorder/>}/>
        <Route path='/generatereport' element={<Generatereport/>}/>

        {/* Customer addToCart */}
        <Route path='/addtocart' element={<Addtocart/>}/>
        <Route path='/customercart' element={<Customercart/>}/>

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
