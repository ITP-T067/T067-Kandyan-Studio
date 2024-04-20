import React from 'react';
import { Link } from 'react-router-dom';

const empDashboard = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-4/5 flex justify-between gap-4">
        <BoxLink to="/manager/employee/addForm" iconName="icon" boxName="Add Employee" />
        <BoxLink to="/manager/employee/viewEmp" iconName="icon" boxName="View Employee" />
        <BoxLink to="/manager/employee/performanceForm" iconName="icon" boxName="Employee Performance" />
        <BoxLink to="/manager/employee/salaryForm" iconName="icon" boxName="Payroll Management" />
        <BoxLink to="/manager/employee/monthlyReport" iconName="icon" boxName="Generate Monthly Salary Report" />
      </div>
    </div>
  );
};

const BoxLink = ({ to, iconName, boxName }) => {
  return (
    <Link to={to} className="flex-1">
      <div className="bg-kgray bg-opacity-50 shadow-lg p-4 text-center rounded-lg transition-transform transform hover:scale-105 flex flex-col justify-center h-64">
        <span className="block text-kwhite text-xl mb-2">
          <svg className="h-20 w-20 mx-auto mb-2" viewBox="0 0 20 20">
            {/* Replace 'icon' with your SVG icon */}
            <path fill="currentColor" d="M9.94 3.16a.75.75 0 00-.88 0L1.15 9.42a.75.75 0 00.44 1.34h3.82v4.75c0 .38.28.69.65.74h.1c.38 0 .7-.32.7-.7V13h3v2.56c0 .38.32.7.7.7h.1a.75.75 0 00.65-.74v-4.75h3.82a.75.75 0 00.44-1.34L9.94 3.16zm-.07 1.06L17.5 9.2H15v5.75c0 .14-.11.25-.25.25h-2.5a.25.25 0 01-.25-.25V9.2H7.5l7.63-5.98z"></path>
          </svg>
        </span>
        <span className="block text-kwhite text-lg">{boxName}</span>
      </div>
    </Link>
  );
};

export default empDashboard;
