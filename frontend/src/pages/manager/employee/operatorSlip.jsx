import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useReactToPrint } from 'react-to-print';
import { IoPrintSharp } from "react-icons/io5";
import { BsArrowLeft } from 'react-icons/bs';

axios.defaults.baseURL = "http://localhost:8010/";

const GoBack = () => {
  window.location.href = "/manager/employee/";
};

// Component for selecting month and year
const MonthYearPicker = ({ selectedDate, handleDateChange }) => (
  <DatePicker
    selected={selectedDate}
    onChange={handleDateChange}
    showMonthYearPicker
    dateFormat="MM/yyyy"
    className="w-[90%] h-10 border-2 border-kblack bg-kwhite text-kblack rounded-lg px-3 py-2"
    placeholder="Select Month & Year"
  />
);

const operatorSlip = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [salaryData, setSalaryData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/employee/');
        if (response.data.success) {
          setEmployees(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const addOneMonth = (date) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  const fetchSalaryData = async () => {
    if (!selectedEmployee || !selectedMonth) {
      setError('Please select both an employee and a month.');
      return;
    }

    setError('');

    // Add one month to the selected month for the query
    const incrementedMonth = addOneMonth(selectedMonth);
    const formattedMonth = incrementedMonth.toISOString().slice(0, 7);

    try {
      const response = await axios.get('/salary/salary/', {
        params: { employeeName: selectedEmployee, selectedMonth: formattedMonth },
      });

      if (response.data.success && response.data.data.length > 0) {
        setSalaryData(response.data.data[0]);
        setError('');
      } else {
        setError('No salary data found for the selected employee and month.');
      }
    } catch (error) {
      console.error('Error fetching salary data:', error);
      setError('An error occurred while fetching salary data.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSalaryData();
  };

  //Report generation
  const componentPDF = useRef([]);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Salary Slip",
    onAfterPrint: () => alert("Data saved in PDF")
  });

  return (
    <div>

      <div className='flex justify-start'>
        <button onClick={GoBack}>
          <div className="flex items-center">
            <div className="flex items-center justify-center bg-transparent rounded-full h-10 w-10 ml-7 border border-kwhite transition-transform duration-300 transform-gpu hover:scale-110">
              <BsArrowLeft className="text-kwhite stroke-2" />
            </div>
            <h1 className="text-left text-kwhite text-3xl pr-4 pb-4 ml-7 mt-4">Employee Payroll</h1>
          </div>
        </button>
      </div>
      <div className="flex flex-col justify-center items-center h-full text-kblack">
        <div className="w-[1000px] bg-kgray bg-opacity-30 rounded-lg p-6 shadow-lg">
          <div className='flex justify-end mb-4'>
            <button onClick={generatePDF} type="button" class="text-kwhite font-bold bg-kblue focus:ring-4 focus:outline-none focus:ring-kblack font-medium rounded-lg text-m px-5 text-center inline-flex items-center me-2 mb-4 transition-transform hover:scale-105">
              <svg className="h-8 w-8 mt-2 me-2 " viewBox="0 0 20 20">
                <IoPrintSharp />
              </svg>
              Print
            </button>
          </div>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="relative ">
              <select
                value={selectedEmployee}
                onChange={handleEmployeeChange}
                className="w-full h-10 border-2 border-kblack bg-transparent rounded px-3 py-2 "
              >
                <option value="">Select Employee</option>
                {employees.map((emp, index) => (
                  <option key={index} value={emp.name}>
                    {emp.name}
                  </option>
                ))}
              </select>

              {/* Position the label at the top-left corner */}
              <label
                className="absolute left-0 top-0 -mt-6 ml-2 text-kwhite"
              >
                Employee Name
              </label>
            </div>


            <div className="relative top-5 text-kwhite">
              <MonthYearPicker selectedDate={selectedMonth} handleDateChange={handleMonthChange} />
              <label className="absolute left-0 top-0 -mt-6 ml-2 text-kwhite">Month & Year</label>
            </div>

            {error && <div className="text-kred font-bold mt-5">{error}</div>}

            <div className='flex justify-end '>
              <button
                type="submit"
                className="bg-kgreen w-1/5 text-kwhite font-bold py-2 px-4 rounded transition-transform hover:scale-105"
              >
                Submit
              </button>
            </div>

          </form>

          {salaryData && (
            <div className=''>
              <div className='px-10 py-10 mt-5 relative bg-kwhite opacity-95' ref={componentPDF}>
                <img
                   src={require('../../../images/logo.png')}
                   alt="Logo"
                   className="absolute inset-0 m-auto opacity-10 w-1/2 h-auto"
                   style={{ zIndex: -1 }}
                 />
                <div className="mt-6 border-2 border-kblack p-4 rounded">
                  <div className="text-center font-bold mb-6 underline">
                    Kandyan Studio and Digital Color Lab - Pay slip for the month {selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>NIC Number:</div>
                    <div>{salaryData.nicNumber}</div>
                    <div className="w-full h-px bg-kblack opacity-10"></div>
                    <div className="w-full h-px bg-kblack opacity-10"></div>
                    <div>Employee Name:</div>
                    <div>{salaryData.employeeName}</div>
                    <div className="w-full h-px bg-kblack opacity-10"></div>
                    <div className="w-full h-px bg-kblack opacity-10"></div>
                    <div>Designation:</div>
                    <div>{salaryData.designation}</div>
                    <div className="w-full h-px bg-kblack"></div>
                    <div className="w-full h-px bg-kblack"></div>
                    <div>Basic Salary:</div>
                    <div>{salaryData.basicSalary}</div>
                    <div className="w-full h-px bg-kblack opacity-10"></div>
                    <div className="w-full h-px bg-kblack opacity-10"></div>
                    <div>OT Payment:</div>
                    <div>{salaryData.otPayment}</div>
                    <div className="w-full h-px bg-kblack opacity-10"></div>
                    <div className="w-full h-px bg-kblack opacity-10"></div>
                    <div>Allowances:</div>
                    <div>{salaryData.allowances}</div>
                    <div className="w-full h-px bg-kblack"></div>
                    <div className="w-full h-px bg-kblack"></div>
                    <div className='font-bold'>Gross Salary:</div>
                    <div className='font-bold'>{salaryData.totalEarnings}</div>
                    <div className="w-full h-px bg-kblack"></div>
                    <div className="w-full h-px bg-kblack"></div>
                    <div>No Pay:</div>
                    <div>{salaryData.noPayDeduction}</div>
                    <div className="w-full h-px bg-kblack opacity-10"></div>
                    <div className="w-full h-px bg-kblack opacity-10"></div>
                    <div>Loans:</div>
                    <div>{salaryData.loans}</div>
                    <div className="w-full h-px bg-kblack opacity-10"></div>
                    <div className="w-full h-px bg-kblack opacity-10"></div>
                    <div>EPF 8%:</div>
                    <div>{salaryData.epf8}</div>
                    <div className="w-full h-px bg-kblack"></div>
                    <div className="w-full h-px bg-kblack"></div>
                    <div className='font-bold'>Total Deductions:</div>
                    <div className='font-bold'>{salaryData.totalDeductions}</div>
                    <div className="w-full h-px bg-kblack"></div>
                    <div className="w-full h-px bg-kblack"></div>
                    <div>EPF 12%:</div>
                    <div>{salaryData.epf12}</div>
                    <div className="w-full h-px bg-kblack opacity-10"></div>
                    <div className="w-full h-px bg-kblack opacity-10"></div>
                    <div>ETF 3%:</div>
                    <div>{salaryData.etf3}</div>
                    <div className="w-full h-px bg-kblack"></div>
                    <div className="w-full h-px bg-kblack"></div>
                    <div className='font-bold text-xl'>Net Salary:</div>
                    <div className='font-bold text-xl'>{Number(salaryData.netSalary).toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}</div>
                  </div>
                </div>
              </div>
            </div>

          )}
        </div>
      </div>
    </div>

  );
};

export default operatorSlip;
