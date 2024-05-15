import React, { useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

// Set default base URL for Axios
axios.defaults.baseURL = 'http://localhost:8010/';

// MonthYearPicker component for selecting month and year
const MonthYearPicker = ({ selectedDate, handleDateChange }) => (
    <div className="relative h-[4rem]">
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showMonthYearPicker
            dateFormat="MM/yyyy"
            className="block py-2.5 px-0 w-full text-m text-kblack bg-transparent border-1 border-b-2 border-kwhite focus:outline-none focus:border-kblue peer"
            placeholder="Select Month & Year"
            required
        />
    </div>

);


// The main component
const SalaryForm = () => {
    // State to hold form values
    const [formValues, setFormValues] = useState({
        selectedMonth: null,
        nicNumber: '',
        employeeName: '',
        designation: '',
        basicSalary: 0,
        otHours: 0,
        otRate: 0,
        otPayment: 0,
        allowances: 0,
        loans: 0,
        noPayDays: 0,
        noPayDeduction: 0,
        attendance: '',
        epf8: 0,
        epf12: 0,
        etf3: 0,
        totalEarnings: 0,
        totalDeductions: 0,
        netSalary: 0,
    });

    // State to hold the list of employees
    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state

    // Function to handle date change and convert it to UTC
    const handleDateChange = (date) => {
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
        setFormValues((prevValues) => ({
            ...prevValues,
            selectedMonth: utcDate,
        }));
    };

    // Fetch employees data from the MongoDB database
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('/employee/');
                if (response.data.success) {
                    setEmployees(response.data.data);
                } else {
                    setError('Failed to fetch employees');
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    // Automatically update dependent fields when basic salary, OT hours, or other relevant data changes
    useEffect(() => {
        const basicSalary = parseFloat(formValues.basicSalary);
        const otRate = basicSalary / 200;
        const otPayment = otRate * parseFloat(formValues.otHours || 0);
        const noPayDeduction = (basicSalary / 25) * parseFloat(formValues.noPayDays || 0);

        const epf8 = basicSalary * 0.08;
        const epf12 = basicSalary * 0.12;
        const etf3 = basicSalary * 0.03;

        const totalEarnings = basicSalary + parseFloat(formValues.allowances || 0) + otPayment;
        const totalDeductions = noPayDeduction + parseFloat(formValues.loans || 0) + epf8;

        const netSalary = totalEarnings - totalDeductions;

        setFormValues((prevValues) => ({
            ...prevValues,
            otRate,
            otPayment,
            noPayDeduction,
            epf8,
            epf12,
            etf3,
            totalEarnings,
            totalDeductions,
            netSalary,
        }));
    }, [formValues.basicSalary, formValues.otHours, formValues.noPayDays, formValues.allowances, formValues.loans]);

    // Handle employee selection to populate NIC, designation, and basic salary
    const handleEmployeeNameChange = (e) => {
        const employeeName = e.target.value;
        const selectedEmployee = employees.find((emp) => emp.name === employeeName);

        if (selectedEmployee) {
            setFormValues((prevValues) => ({
                ...prevValues,
                employeeName,
                nicNumber: selectedEmployee.nicNumber,
                designation: selectedEmployee.designation,
                basicSalary: selectedEmployee.basicSalary,
            }));
        }
    };

    // General change handler for input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Values", formValues);


        try {
            const data = await axios.post('/salary/create', formValues);
            console.log("Response:", data)
            if (data.data.success) {
                setFormValues({
                    selectedMonth: '',
                    nicNumber: '',
                    employeeName: '',
                    designation: '',
                    basicSalary: '',
                    otHours: '',
                    otRate: '',
                    otPayment: '',
                    allowances: '',
                    loans: '',
                    noPayDays: '',
                    noPayDeduction: '',
                    attendance: '',
                    epf8: '',
                    epf12: '',
                    etf3: '',
                    totalEarnings: '',
                    totalDeductions: '',
                    netSalary: '',
                });
            }
        } catch (error) {
            console.error('Error creating salary record:', error);
        }
    };

    const fields = [
        {
            name: 'selectedMonth',
            label: 'Month & Year',
            component: (
                <MonthYearPicker
                    selectedDate={formValues.selectedMonth}
                    handleDateChange={handleDateChange}
                />
            ),
        },
        {
            name: 'employeeName',
            label: 'Employee Name',
            component: (
                <div className="relative h-[4rem]">
                    <select
                        name="employeeName"
                        value={formValues.employeeName}
                        onChange={handleEmployeeNameChange}
                        className="block py-2.5 px-0 w-full text-m text-kblack bg-transparent border-1 border-b-2 border-kwhite focus:outline-none focus:border-kblue"
                    >
                        <option value="">Select Employee</option>
                        {employees.map((emp, index) => (
                            <option key={index} value={emp.name}>
                                {emp.name}
                            </option>
                        ))}
                    </select>

                </div>

            ),
        },
        {
            name: 'nicNumber',
            label: 'NIC Number',
            type: 'text',
        },
        {
            name: 'designation',
            label: 'Designation',
            type: 'text',
        },
        {
            name: 'basicSalary',
            label: 'Basic Salary',
            type: 'number',
        },
        {
            name: 'otHours',
            label: 'OT Hours',
            type: 'number',
        },
        {
            name: 'otRate',
            label: 'OT Rate',
            type: 'number',
            readOnly: true, // Set read-only, as it's auto-calculated
        },
        {
            name: 'otPayment',
            label: 'OT Payment',
            type: 'number',
            readOnly: true, // Set read-only, as it's auto-calculated
        },
        {
            name: 'allowances',
            label: 'Allowances',
            type: 'number',
        },
        {
            name: 'loans',
            label: 'Loans',
            type: 'number',
        },
        {
            name: 'noPayDays',
            label: 'No Pay Days',
            type: 'number',
        },
        {
            name: 'noPayDeduction',
            label: 'No Pay Deduction',
            type: 'number',
            readOnly: true, // Auto-calculated
        },
        {
            name: 'attendance',
            label: 'Attendance',
            type: 'text',
        },
        {
            name: 'epf8',
            label: 'EPF 8%',
            type: 'number',
            readOnly: true, // Auto-calculated
        },
        {
            name: 'epf12',
            label: 'EPF 12%',
            type: 'number',
            readOnly: true, // Auto-calculated
        },
        {
            name: 'etf3',
            label: 'ETF 3%',
            type: 'number',
            readOnly: true, // Auto-calculated
        },
        {
            name: 'totalEarnings',
            label: 'Total Earnings',
            type: 'number',
            readOnly: true, // Auto-calculated
        },
        {
            name: 'totalDeductions',
            label: 'Total Deductions',
            type: 'number',
            readOnly: true, // Auto-calculated
        },
        {
            name: 'netSalary',
            label: 'Net Salary',
            type: 'number',
            readOnly: true, // Auto-calculated
        },
    ];

    return (
        <div className="flex flex-col text-kwhite">
            <div className="flex items-center px-6 py-4 bg-kblack">
                <div
                    className="flex items-center justify-center rounded-full h-10 w-10 ml-7 border-2 border-kwhite transition-transform duration-300 transform-gpu hover:scale-110"
                    onClick={() => (window.location.href = '/manager/employee/')}
                >
                    <BsArrowLeft className="text-kwhite" />
                </div>
                <h1 className="text-3xl font-bold text-kwhite ml-4">Salary Calculation</h1>
            </div>

            <div className="flex flex-col justify-center items-center h-full">
                <div className="max-w-[850px] w-full flex flex-col justify-center items-center bg-kgray rounded-lg border-2 border-kyellow shadow-lg shadow-kblack/60 p-8 opacity-70">
                    <form className="w-full grid grid-cols-2 gap-x-10 gap-y-3 opacity-90" onSubmit={handleSubmit}>
                        {fields.map((field, index) => (
                            <div key={index} className="relative h-[4rem]">
                                <div className="relative z-0">
                                    {field.component ? (
                                        <>
                                            <label
                                                className="block mb-2 text-sm font-medium text-kwhite ">
                                                {field.label}
                                            </label>
                                            {field.component}
                                            
                                        </>
                                    ) : (
                                        <>
                                            <label
                                                htmlFor={`floating_${field.name}`}
                                                className="block mb-2 text-sm font-medium text-kwhite"
                                            >
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                value={formValues[field.name]}
                                                onChange={handleChange}
                                                className="bg-transparent border border-kwhite text-kblack text-sm rounded-lg focus:ring-kblue focus:border-kblue block w-full p-2.5"
                                                readOnly={field.readOnly}
                                                placeholder=" "
                                                required
                                            />
                                            
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="w-full flex justify-end mt-4">
                            <button
                                type="submit"
                                className="bg-kgreen text-kwhite font-bold py-2 px-4 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 active:opacity-90"
                            >
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default SalaryForm;
