import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
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
import CusDashWedding from './pages/customer/event/cusDashWedding.jsx';
import CusDashBdayParty from './pages/customer/event/cusDashBdayParty.jsx';
import CusDashSocial from './pages/customer/event/cusDashSocial.jsx';
import BookingEvent from './pages/customer/event/BookingEvent.jsx';
import EditEvent from './pages/customer/event/EditEvent.jsx';
import Customercart from './pages/customer/onlineorder/customerCart.jsx';
import Myorder from './pages/customer/onlineorder/myOrders.jsx';
import Pendingorder from './pages/customer/onlineorder/pendingOrders.jsx';
import Processingorder from './pages/customer/onlineorder/ProcessingOrders.jsx';
import Completeorder from './pages/customer/onlineorder/CompletedOrders.jsx';
import Generatereport from './pages/customer/onlineorder/GenerateReports.jsx';
import Payorder from './pages/customer/onlineorder/payOrder.jsx';

//Manager Dashboard
//Manager Dashboard - Stock Department
import StockMenu from './pages/manager/stock/menu';
import ItemList from './pages/manager/stock/items';
import StockLevels from './pages/manager/stock/stocklevels';
import SupplyRequest from './pages/manager/stock/supplyrequest';
import RequestForm from './pages/manager/stock/requestform';
import CustomRequestForm from './pages/manager/stock/customreqform';
import AddItemForm from './pages/manager/stock/additemform';
import EditItemForm from './pages/manager/stock/edititemform';

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
import Projects from './pages/creator/Projects.jsx';
import ProjectOrders from './pages/creator/Orders.jsx';
import CompletedProjects from './pages/creator/CompletedProjects.jsx';
import PhysicalOrders from './pages/creator/PhysicalOrders.jsx';
import OrderPayment from './pages/creator/OrderPayment.jsx';

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
        <Route path='/customer/event/cusDashWedding' element={<CusDashWedding/>}/>
        <Route path='/customer/event/cusDashBdayParty' element={<CusDashBdayParty/>}/>
        <Route path='/customer/event/cusDashSocial' element={<CusDashSocial/>}/>
        <Route path='/customer/event/BookingEvent' element={<BookingEvent/>}/>
        <Route path='/customer/event/EditEvent' element={<EditEvent/>}/>
        <Route path='/myorder' element={<Myorder/>}/>
        <Route path='/pendingorder' element={<Pendingorder/>}/>
        <Route path='/processingorder' element={<Processingorder/>}/>
        <Route path='/completeorder' element={<Completeorder/>}/>
        <Route path='/generatereport' element={<Generatereport/>}/>
        <Route path='/payorder' element={<Payorder/>}/>

        {/* Customer addToCart */}
        <Route path='/addtocart' element={<Addtocart/>}/>
        <Route path='/customercart' element={<Customercart/>}/>

        {/* Manager Dashboard - Stock Department */}
        <Route path='/manager/stockdept' element={<StockMenu />} />
        <Route path='/manager/stockdept/items' element={<ItemList />} />
        <Route path='/manager/stockdept/stocklevels' element={<StockLevels />} />
        <Route path='/manager/stockdept/supplyrequest' element={<SupplyRequest />} />
        <Route path='/manager/stockdept/stocklevels/request' element={<RequestForm />} />
        <Route path='/manager/stockdept/stocklevels/customreq' element={<CustomRequestForm />} />
        <Route path='/manager/stockdept/items/additem' element={<AddItemForm />} />
        <Route path='/manager/stockdept/items/edititem' element={<EditItemForm />} />

        {/* Manager Dashboard - Event Department */}
        <Route path='/manager/eventdept' element={<MgrDashboardEvent/>}/>
        <Route path='/manager/eventdept/mgrDashWedding' element={<MgrDashWedding/>}/>
        <Route path='/manager/eventdept/mgrDashBdayParty' element={<MgrDashBdayParty/>}/>
        <Route path='/manager/eventdept/mgrDashSocial' element={<MgrDashSocial/>}/>
        <Route path='/manager/eventdept/AddPackages' element={<AddPackages/>}/>
        <Route path='/manager/eventdept/EditPackages' element={<EditPackages/>}/>
        <Route path='/manager/eventdept/EventsList' element={<EventsList/>}/>

        {/* Creator Dashboard*/}
        <Route path='/creator/' element={<Projects/>}/>
        <Route path='/creator/projectOrders/' element={<ProjectOrders/>}/>
        <Route path='/creator/completedProjects' element={<CompletedProjects/>}/>
        <Route path='/creator/physicalOrders' element={<PhysicalOrders/>}/>
        <Route path='/creator/orderPayments' element={<OrderPayment/>}/>
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
