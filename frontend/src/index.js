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


//Manager Dashboard
//Manager Dashboard - Stock Department
import StockMenu from './pages/manager/stock/menu';
import ItemList from './pages/manager/stock/items';
import StockLevels from './pages/manager/stock/stocklevels';
import SupplyRequest from './pages/manager/stock/supplyrequest';

//Manager Dashboard - Event Department
import MgrDashboardEvent from './pages/manager/event/mgrDashboardEvent.jsx';
import MgrDashWedding from './pages/manager/event/mgrDashWedding.jsx'
import MgrDashBdayParty from './pages/manager/event/mgrDashBdayParty.jsx'
import MgrDashSocial from './pages/manager/event/mgrDashSocial.jsx'
import AddPackages from './pages/manager/event/AddPackages.jsx';
import EditPackages from './pages/manager/event/EditPackages.jsx';
import EventsList from './pages/manager/event/EventsList.jsx';

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

        {/* Customer addToCart */}
        <Route path='/addtocart' element={<Addtocart/>}/>


        {/* Manager Dashboard - Stock Department */}
        <Route path='/manager/stockdept' element={<StockMenu />} />
        <Route path='/manager/stockdept/items' element={<ItemList />} />
        <Route path='/manager/stockdept/stocklevels' element={<StockLevels />} />
        <Route path='/manager/stockdept/supplyrequest' element={<SupplyRequest />} />

        {/* Manager Dashboard - Event Department */}
        <Route path='/manager/eventdept' element={<MgrDashboardEvent/>}/>
        <Route path='/manager/eventdept/mgrDashWedding' element={<MgrDashWedding/>}/>
        <Route path='/manager/eventdept/mgrDashBdayParty' element={<MgrDashBdayParty/>}/>
        <Route path='/manager/eventdept/mgrDashSocial' element={<MgrDashSocial/>}/>
        <Route path='/manager/eventdept/AddPackages' element={<AddPackages/>}/>
        <Route path='/manager/eventdept/EditPackages' element={<EditPackages/>}/>
        <Route path='/manager/eventdept/EventsList' element={<EventsList/>}/>
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
