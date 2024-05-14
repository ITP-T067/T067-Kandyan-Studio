import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosPersonAdd } from "react-icons/io";
import { FaAddressCard } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";


const empDashboard = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-4/5 flex justify-between gap-4">
        <BoxLink to="/manager/employee/addForm" iconName={<IoIosPersonAdd />} boxName="Add Employee" />
        <BoxLink to="/manager/employee/viewEmp" iconName={<FaAddressCard />} boxName="View Employee" />
        <BoxLink to="/manager/employee/salarySlip" iconName={<HiMiniUserGroup />} boxName="Employee Payroll" />
        <BoxLink to="/manager/employee/salaryForm" iconName={<FaMoneyCheckDollar />} boxName="Salary Calculation" />
        <BoxLink to="/manager/employee/notification" iconName={<MdMarkEmailRead />} boxName="Send Payroll Notifications" />
      </div>
    </div>
  );
};

const BoxLink = ({ to, iconName, boxName }) => {
  return (
    <Link to={to} className="flex-1">
      <div className="bg-kgray bg-opacity-50 shadow-lg p-4 text-center rounded-lg transition-transform transform hover:scale-105 hover:border-kyellow hover:border-2 flex flex-col justify-center h-64">
        <span className="block text-kwhite text-xl mb-2">
          <svg className="h-20 w-20 mx-auto mb-2" viewBox="0 0 20 20">
            {iconName}
            <path fill="currentColor" ></path>
          </svg>
        </span>
        <span className="block text-kwhite text-lg">{boxName}</span>
      </div>
    </Link>
  );
};

export default empDashboard;
