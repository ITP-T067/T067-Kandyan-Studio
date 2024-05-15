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
import WeddingEvents from './pages/customer/event/WeddingEvents.jsx';
import BirthdayEvents from './pages/customer/event/BdayEvents.jsx'
import SocialEvents from './pages/customer/event/SocialEvents.jsx';
import BookingEvent from './pages/customer/event/BookingEvent.jsx';
import EditEvent from './pages/customer/event/EditEvent.jsx';
import MyEvents from './pages/customer/event/MyEvents.jsx';
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
import MgrDashboardEvent from './pages/manager/event/mgrDashboardEvent.jsx';
import MgrWedding from './pages/manager/event/MgrWedding.jsx';
import MgrBdayParty from './pages/manager/event/MgrBdayParty.jsx';
import MgrSocial from './pages/manager/event/MgrSocial.jsx';
import AddPackages from './pages/manager/event/AddPackages.jsx';
import EditPackages from './pages/manager/event/EditPackages.jsx';
import EventsList from './pages/manager/event/EventsList.jsx';

//Manager Dashboard - Finance Department

//Manager Dashboard - Employee Department
import Edashboard from './pages/manager/employee/empDashboard.jsx';
import AddForm from './pages/manager/employee/addForm.jsx';
import ViewEmp from './pages/manager/employee/viewEmp.jsx';
import UpdateForm from './pages/manager/employee/updateForm.jsx';
import PerformanceForm from './pages/manager/employee/performanceForm.jsx';
import ViewPerformance from './pages/manager/employee/viewPerformance.jsx';
import SalarySlip from './pages/manager/employee/salarySlip.jsx';
import SalaryForm from './pages/manager/employee/salaryForm.jsx';
import CashierSlip from './pages/manager/employee/cashierSlip.jsx';
import CreatorSlip from './pages/manager/employee/creatorSlip.jsx';
import SalaryNotification from './pages/manager/employee/notification.jsx';

//Manager Dashboard - Supplier Department

//Manager Dashboard - Loyalty Department
import Loyaltyview from './pages/manager/loyalty/Loyaltyview.jsx';

//Cashier Dashboard
import CashierPaySlip from './pages/cashier/CashierPaySlip.jsx';

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
import PaySlip from './pages/creator/PaySlip.jsx';


//Studio Operator Dashboard
import StudioDash from './pages/studioop/studio_dash.jsx'
import StudioSlip from './pages/studioop/StudioPaySlip.jsx'

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

        {/* Cashier Dashboard */}
        <Route path='/cashier/cashierpayslip' element={<CashierPaySlip />} />

        {/* Customer Dashboard */}
        <Route path='/cusdashboard' element={<Cusdashboard />} />
        <Route path='/customer/event/WeddingEvents' element={<WeddingEvents/>}/>
        <Route path='/customer/event/BdayEvents' element={<BirthdayEvents/>}/>
        <Route path='/customer/event/SocialEvents' element={<SocialEvents/>}/>
        <Route path='/customer/event/BookingEvent' element={<BookingEvent/>}/>
        <Route path='/customer/event/EditEvent' element={<EditEvent/>}/>
        <Route path='/customer/event/MyEvents' element={<MyEvents/>}/>
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
        <Route path='/manager/eventdept' element={<MgrDashboardEvent/>}/>
        <Route path='/manager/eventdept/MgrWedding' element={<MgrWedding/>}/>
        <Route path='/manager/eventdept/MgrBdayParty' element={<MgrBdayParty/>}/>
        <Route path='/manager/eventdept/MgrSocial' element={<MgrSocial/>}/>
        <Route path='/manager/eventdept/AddPackages' element={<AddPackages/>}/>
        <Route path='/manager/eventdept/EditPackages' element={<EditPackages/>}/>
        <Route path='/manager/eventdept/EventsList' element={<EventsList/>}/>

        {/*Manager Dashboard - Employee Department */}
        <Route path='/manager/employee' element={<Edashboard/>}/>
        <Route path='/manager/employee/addForm' element={<AddForm/>}/>
        <Route path='/manager/employee/viewEmp' element={<ViewEmp/>}/>
        <Route path='/manager/employee/updateForm' element={<UpdateForm/>}/>
        <Route path='/manager/employee/performanceForm' element={<PerformanceForm/>}/>
        <Route path='/manager/employee/viewPerformance' element={<ViewPerformance/>}/>
        <Route path='/manager/employee/salarySlip' element={<SalarySlip/>}/>
        <Route path='/manager/employee/salaryForm' element={<SalaryForm/>}/>
        <Route path='/manager/employee/cashierSlip' element={<CashierSlip/>}/>
        <Route path='/manager/employee/creatorSlip' element={<CreatorSlip/>}/>
        
        <Route path='/manager/employee/notification' element={<SalaryNotification/>}/>

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
        <Route path='/creator/creatorpayslip' element={<PaySlip/>}/>
        
        
        {/* Studio Operator Dashboard*/}
        <Route path='/studiooperator/' element={<StudioDash/>}/>
        <Route path='/studiooperator/studioslip' element={<StudioSlip/>}/>

        {/* Supplier Dashboard */}
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
