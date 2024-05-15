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

//signup
import CustomerSignup from './pages/customer/CreateCust.jsx';

//Customer Dashboard
import Cusdashboard from './pages/customer/onlineorder/cus_dashboard.jsx';
import Addtocart from './pages/customer/onlineorder/addToCart.jsx'
import Customercart from './pages/customer/onlineorder/customerCart.jsx';
import Myorder from './pages/customer/onlineorder/myOrders.jsx';
import Pendingorder from './pages/customer/onlineorder/pendingOrders.jsx';
import Processingorder from './pages/customer/onlineorder/ProcessingOrders.jsx';
import Completeorder from './pages/customer/onlineorder/CompletedOrders.jsx';
import Generatereport from './pages/customer/onlineorder/GenerateReports.jsx';
import Profile from './pages/customer/loyalty/Profile.jsx';
import Completeoreview from './pages/customer/loyalty/CompletedoReview.jsx'


import AddReview from './pages/customer/loyalty/AddReview.jsx';
import Review from './pages/customer/loyalty/Review.jsx';
import ReviewTable from './pages/customer/loyalty/ReviewTable.jsx';


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
import Loyaltyview from './pages/manager/loyalty/Loyaltyview.jsx';

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
import CrSublimation from './pages/cashier/neworders/creatorsublimation.jsx';
import CrFrames from './pages/cashier/neworders/creatorframes.jsx';
import CrphotoPrints from './pages/cashier/neworders/creatorphotoprints.jsx';
import Formtable from './pages/cashier/neworders/Formtable.jsx';
import CreatorCheckout from './pages/cashier/creatorcheckout.jsx';


//Creator Dashboard
import Projects from './pages/creator/Projects.jsx';
import ProjectOrders from './pages/creator/Orders.jsx';
import CompletedProjects from './pages/creator/CompletedProjects.jsx';
import PhysicalOrders from './pages/creator/PhysicalOrders.jsx';
import OrderPayment from './pages/creator/OrderPayment.jsx';
import AddProjects from './pages/creator/AddProjects.jsx';
import EditProjects from './pages/creator/EditProjects.jsx';
import OfflineOrders from './pages/creator/OfflineOrders.jsx';
import AddOfflineProjects from './pages/creator/AddOfflineProjects.jsx';
import Inquries from './pages/creator/Inquiries.jsx';
import ResolveInquiries from './pages/creator/ResolveInquiries.jsx';
import PaymentDetails from './pages/creator/PaymentDetails.jsx';
import ReceiptForm from './pages/creator/ReceiptForm.jsx';
import Generatereports from './pages/creator/GenerateReports.jsx';
import DeclinePayment from './pages/creator/DeclinePayment.jsx';

//Studio Operator Dashboard
import StudioDash from './pages/studioop/studio_dash.jsx'

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

        {/* Signup */}
        <Route path='/signup' element={<CustomerSignup />} />

        {/* Customer Dashboard */}
        <Route path='/cusdashboard' element={<Cusdashboard />} />
        <Route path='/myorder' element={<Myorder/>}/>
        <Route path='/pendingorder' element={<Pendingorder/>}/>
        <Route path='/processingorder' element={<Processingorder/>}/>
        <Route path='/completeorder' element={<Completeorder/>}/>
        <Route path='/generatereport' element={<Generatereport/>}/>
        <Route path='/addtocart/:itemId' element={<Addtocart/>}/>
        <Route path='/customercart' element={<Customercart/>}/>
        <Route path='/addreview/:itemId' element={<AddReview/>}/>
        <Route path='/review' element={<Review/>}/>
        <Route path='/viewreview' element={<ReviewTable/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/completerview' element={<Completeoreview/>}/>

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
        <Route path='/cashier/crsublimation/:orderId' element={<CrSublimation />} />
        <Route path='/cashier/crframes/:orderId' element={<CrFrames />} />
        <Route path='/cashier/crphotoprints/:orderId' element={<CrphotoPrints />} />
        <Route path='/cashier/mainorder/formtable' element={<Formtable />} />
        <Route path='/cashier/creatorcheckout/:orderId' element={<CreatorCheckout />} />



        {/* Manager Dashboard - Stock Department */}
        <Route path='/manager/stockdept' element={<StockMenu />} />
        <Route path='/manager/stockdept/items' element={<ItemList />} />
        <Route path='/manager/stockdept/stocklevels' element={<StockLevels />} />
        <Route path='/manager/stockdept/supplyrequest' element={<SupplyRequest />} />
        <Route path='/manager/stockdept/stocklevels/request' element={<RequestForm />} />
        <Route path='/manager/stockdept/stocklevels/customreq' element={<CustomRequestForm />} />
        <Route path='/manager/stockdept/items/additem' element={<AddItemForm />} />
        <Route path='/manager/stockdept/items/edititem' element={<EditItemForm />} />
        
        {/* Manager Dashboard - Loyalty Department */}
        <Route path='/manager/loyalty' element={<Loyaltyview />} />
        
        {/* Manager Dashboard - Event Department */}

        {/* Creator Dashboard*/}
        <Route path='/creator/' element={<Projects/>}/>
        <Route path='/creator/projectOrders/' element={<ProjectOrders/>}/>
        <Route path='/creator/completedProjects' element={<CompletedProjects/>}/>
        <Route path='/creator/physicalOrders' element={<PhysicalOrders/>}/>
        <Route path='/creator/orderPayments' element={<OrderPayment/>}/>
        <Route path='/creator/addProjects/:orderId' element={<AddProjects/>}/>
        <Route path='/creator/editProjects/:projectId' element={<EditProjects/>}/>
        <Route path='/creator/offlineOrders' element={<OfflineOrders/>}/>
        <Route path='/creator/addOfflineProjects/:orderId' element={<AddOfflineProjects/>}/>
        <Route path='/creator/inquiries' element={<Inquries/>}/>
        <Route path='/creator/resolveInquiries/:inquiryId' element={<ResolveInquiries/>}/>
        <Route path='/creator/paymentDetails/:orderId' element={<PaymentDetails/>}/>
        <Route path='/creator/receiptForm' element={<ReceiptForm/>}/>
        <Route path='/creator/generateReports' element={<Generatereports/>}/>
        <Route path='/creator/declinePayment/:orderId' element={<DeclinePayment/>}/>
        
        
        {/* Studio Operator Dashboard*/}
        <Route path='/studiooperator/' element={<StudioDash/>}/>
        
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
