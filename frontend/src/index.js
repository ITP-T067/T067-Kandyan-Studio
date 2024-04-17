import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Home
import Home from './pages/home.jsx';

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

//Manager Dashboard - Finance Department

//Manager Dashboard - Employee Department

//Manager Dashboard - Supplier Department

//Manager Dashboard - Loyalty Department




//Cashier Dashboard
import Ordermain from './pages/cashier/order.jsx';
import StockAV from './pages/cashier/Stockavailability.jsx';
import AddNewOrder from './pages/cashier/addneworder.jsx';
import Pendingorders from './pages/cashier/pendingorders.jsx';
import Completedorders from './pages/cashier/Completedorders.jsx';
import SupplierPayments from './pages/cashier/Supplierpayments.jsx';
import Checkout from './pages/cashier/checkout.jsx';
import AddnewStudio from './pages/cashier/addnewstudio.jsx';
import Crlaminate from './pages/cashier/neworders/crlaminates.jsx';
import CrPhotoprints from './pages/cashier/neworders/crphotoprints.jsx';
import Crframes from './pages/cashier/neworders/crframes.jsx';
import Stbabyphoto from './pages/cashier/neworders/stbabyphoto.jsx';
import StproductPhoto from './pages/cashier/neworders/stproductphoto.jsx';
import Stidcard from './pages/cashier/neworders/stidcard.jsx';

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
        <Route path='/' element={<Home/>} />

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
        <Route path='/payorder' element={<Payorder/>}/>
        <Route path='/addtocart' element={<Addtocart/>}/>
        <Route path='/customercart' element={<Customercart/>}/>

        {/* Cashier Dashboard */}
        <Route path='/cashier/ordermain' element={<Ordermain />} />
        <Route path='/cashier/stockavailability' element={<StockAV />} />
        <Route path='/cashier/addneworder' element={<AddNewOrder />} />
        <Route path='/cashier/pendingorders' element={<Pendingorders />} />
        <Route path='/cashier/completedorders' element={<Completedorders />} />
        <Route path='/cashier/supplierpayment' element={<SupplierPayments />} />
        <Route path='/cashier/checkout' element={<Checkout />} />
        <Route path='/cashier/addnewstudio' element={<AddnewStudio />} />
        <Route path='/cashier/laminates' element={<Crlaminate />} />
        <Route path='/cashier/photoprints' element={<CrPhotoprints />} />
        <Route path='/cashier/frames' element={<Crframes />} />
        <Route path='/cashier/babyphotos' element={<Stbabyphoto />} />
        <Route path='/cashier/identitycard' element={<Stidcard />} />
        <Route path='/cashier/productphoto' element={<StproductPhoto />} />




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
