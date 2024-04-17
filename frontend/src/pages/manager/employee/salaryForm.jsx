import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MonthYearPicker = ({ selectedDate, handleDateChange }) => {
    return (
        <div className="w-full max-w-xs">
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showMonthYearPicker
                dateFormat="MM/yyyy" // Format to display only month and year
                className="w-full border rounded px-3 py-2"
            />
        </div>
    );
};

const SalaryForm = () => {
    const [formValues, setFormValues] = useState({
        selectedMonth: null,
        nicNumber: '',
        employeeName: '',
        designation: '',
        basicSalary: '',
        otHours: '',
        otRate: '',
        otPayment: '',
        allowances: '',
        loans: '',
        noPayDeduction: '',
        epf8: '',
        epf12: '',
        etf3: '',
        totalEarnings: '',
        totalDeductions: '',
        netSalary: '',
        attendance: '',
        noPayDays: ''

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleMonthChange = (date) => {
        setFormValues({ ...formValues, selectedMonth: date });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formValues);
        
    };

    const fields = [
        { label: 'Month', component: <MonthYearPicker selectedDate={formValues.selectedMonth} handleDateChange={handleMonthChange} /> },
        { label: 'NIC Number', name: 'nicNumber' },
        { label: 'Employee Name', name: 'employeeName' },
        { label: 'Designation', name: 'designation' },
        { label: 'Basic Salary', name: 'basicSalary', type: 'number' },
        { label: 'OT Hours', name: 'otHours', type: 'number' },
        { label: 'OT Rate', name: 'otRate', type: 'number' },
        { label: 'OT Payment', name: 'otPayment', type: 'number' },
        { label: 'Allowances', name: 'allowances', type: 'number' },
        { label: 'Loans', name: 'loans', type: 'number' },
        { label: 'No Pay Days', name: 'noPayDays', type: 'number' },
        { label: 'No Pay Deduction', name: 'noPayDeduction', type: 'number' },
        { label: 'Attendance', name: 'attendance', type: 'number' },
        { label: 'EPF EMP 8%', name: 'epf8', type: 'number' },
        { label: 'EPF 12%', name: 'epf12', type: 'number' },
        { label: 'ETF 3%', name: 'etf3', type: 'number' },
        { label: 'Total Earnings', name: 'totalEarnings', type: 'number' },
        { label: 'Total Deductions', name: 'totalDeductions', type: 'number' },
        { label: 'Net Salary', name: 'netSalary', type: 'number' }
    ];

    return (
        <div className="flex flex-col h-screen">
            <div className="flex items-center">
                <div className="flex items-center justify-center bg-transparent rounded-full h-10 w-10 ml-7 border border-kwhite transition-transform duration-300 transform-gpu hover:scale-110">
                    <BsArrowLeft className="text-kwhite stroke-2" />
                </div>
                <h1 className="text-left text-kwhite text-3xl pr-4 pb-4 ml-7 mt-4">Salary Calculation</h1>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className="w-[1000px] rounded-lg p-6" style={{ backgroundColor: 'rgba(35, 55, 65, 0.7)' }}>
                    <form className="flex flex-wrap justify-between" onSubmit={handleSubmit}>
                        {fields.map((field, index) => (
                            <div key={index} className="relative w-[45%] mb-4">
                                <div className="relative w-full min-w-[200px] h-10">
                                    {field.component ? (
                                        <>
                                            {field.component}
                                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-kwhite transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-kwhite before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-kwhite after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-kwhite peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-kwhite peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-kwhite peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-kwhite peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-kblue">
                                                {field.label}
                                            </label>
                                        </>
                                    ) : (
                                        <>
                                            <input
                                                type={field.type || 'text'}
                                                name={field.name}
                                                value={formValues[field.name]}
                                                onChange={handleChange}
                                                className="peer w-full h-full bg-transparent text-kwhite font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-kwhite disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-kwhite placeholder-shown:border-t-kwhite border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-kwhite focus:border-kwhite"
                                                placeholder=" "
                                                required
                                            />
                                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-kwhite transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-kwhite before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-kwhite after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-kwhite peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-kwhite peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-kwhite peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-kwhite peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-kblue">
                                                {field.label}
                                            </label>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="w-[100%] flex justify-end">
                            <button class="bg-kgreen text-kwhite font-bold py-2 px-4 border-2 border-kgreen rounded transition-opacity duration-300 hover:opacity-80">
                                Calculate Salary
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SalaryForm;
