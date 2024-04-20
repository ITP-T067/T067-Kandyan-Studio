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
import OperatorSlip from './pages/manager/employee/operatorSlip.jsx';
import PastEmp from './pages/manager/employee/pastEmp.jsx';
import MonthlyReport from './pages/manager/employee/monthlyReport.jsx';

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
        <Route path='/manager/employee/operatorSlip' element={<OperatorSlip/>}/>
        <Route path='/manager/employee/pastEmp' element={<PastEmp/>}/>
        <Route path='/manager/employee/monthlyReport' element={<MonthlyReport/>}/>

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
