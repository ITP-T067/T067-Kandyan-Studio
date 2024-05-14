import React, { useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

axios.defaults.baseURL = "http://localhost:8010/";

const PerformanceForm = () => {
    const GoBack = () => {
        window.location.href = "/manager/employee/";
      };
    const [formValues, setFormValues] = useState({
        name: '',
        nicNumber: '',
        selectedMonth: null,
        attendance: '',
        otHours: '',
        noPayDays: '',
        otPayment: 0,
        noPayDeduction: 0,
        basicSalary: 0 
    });

    useEffect(() => {
        // Fetch NIC number and basic salary when employee name changes
        const fetchEmployeeData = async () => {
            if (formValues.name.trim() === '') {
                return; // Don't fetch if name is empty
              }

            try {
                const response = await axios.get(`/employee?name=${formValues.name}`);
                const employeeData = response.data;
                setFormValues(prevState => ({
                    ...prevState,
                    nicNumber: employeeData.nicNumber,
                    basicSalary: employeeData.basicSalary
                }));
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchEmployeeData();
        
    }, [formValues.name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const handleMonthChange = (date) => {
        setFormValues({ ...formValues, selectedMonth: date });
    };

    const calculateOTPayment = (hours) => {
        const ratePerHour = 400 / 200; // Assuming 200 hours per month
        const otPayment = ratePerHour * parseFloat(hours || 0);
        return isNaN(otPayment) ? 0 : otPayment.toFixed(2);
    };

    const calculateNoPayDeduction = (days) => {
        const ratePerDay = 50 / 25; // Assuming 25 working days per month
        const noPayDeduction = ratePerDay * parseFloat(days || 0);
        return isNaN(noPayDeduction) ? 0 : noPayDeduction.toFixed(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Values", formValues)
        try {
            const data = await axios.post("/performance/create", formValues);
            console.log('Response:', data);
            if(data.data.success){
                setFormValues({
                    name:'',
                    nicNumber:'',
                    selectedMonth:'',
                    attendance: '',
                    otHours: '',
                    noPayDays: '',
                    otPayment: '',
                    noPayDeduction: '',
                    basicSalary: '',
                });
            }
        } catch (error) {
            console.error('Error creating performance:', error);
        }
    };

    const fields = [
        { label: 'Employee Name', name: 'name' },
        { label: 'NIC Number', name: 'nicNumber', readOnly: true },
        { label: 'Month', component: (
            <>
                <label className="text-white">{formValues.selectedMonth ? formValues.selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' }) : 'Select Month'}</label>
                <DatePicker
                    selected={formValues.selectedMonth}
                    onChange={handleMonthChange}
                    showMonthYearPicker
                    dateFormat="MM/yyyy" // Format to display only month and year
                    className="w-full border rounded px-3 py-2"
                />
            </>
        ) },
        { label: 'Attendance', name: 'attendance', type: 'number' },
        { label: 'OT Hours', name: 'otHours', type: 'number' },
        { label: 'No Pay Days', name: 'noPayDays', type: 'number' },
        { label: 'OT Payment', name: 'otPayment', type: 'number', readOnly: true },
        { label: 'No Pay Deduction', name: 'noPayDeduction', type: 'number', readOnly: true },
        { label: 'Basic Salary', name: 'basicSalary', type: 'number', readOnly: true }
    ];

    useEffect(() => {
        const otPayment = calculateOTPayment(formValues.otHours);
        const noPayDeduction = calculateNoPayDeduction(formValues.noPayDays);
        setFormValues(prevState => ({ ...prevState, otPayment, noPayDeduction }));
    }, [formValues.otHours, formValues.noPayDays]);

    return (
        <div className='flex flex-col h-screen'>
            <div onClick={GoBack} className="flex items-center">
                <div className="flex items-center justify-center bg-transparent rounded-full h-10 w-10 ml-7 border border-kwhite transition-transform duration-300 transform-gpu hover:scale-110">
                    <BsArrowLeft className="text-kwhite stroke-2" />
                </div>
                <h1 className="text-left text-kwhite text-3xl pr-4 pb-4 ml-7 mt-4">Employee Performance</h1>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <div className='w-[500px] flex flex-col justify-between items-center bg-kgray bg-opacity-40 rounded-lg border-2 border-kwhite text-kwhite shadow-lg shadow-kblack/60 relative'>
                    <form className='w-full p-8 space-y-2 overflow-hidden' onSubmit={handleSubmit}>
                        {fields.map((field, index) => (
                            <div key={index} className="relative h-[4rem] w-full min-w-[200px] flex flex-col">
                                <>
                                    {field.component ? (
                                        <div className="relative">
                                            {field.component}
                                        </div>
                                    ) : (
                                        <>
                                            <input
                                                type={field.type || 'text'}
                                                name={field.name}
                                                value={formValues[field.name]}
                                                onChange={handleChange}
                                                readOnly={field.readOnly}
                                                className="peer h-full w-full rounded-[7px] border border-kwhite border-t-transparent bg-transparent px-3 py-2 font-sans text-sm font-normal !text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-kblue placeholder-shown:border-t-kblue focus:border-2 focus:border-kwhite focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-kblue"
                                                placeholder=" "
                                                required
                                            />
                                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-kwhite before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-kwhite after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-kwhite peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-kwhite peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-kwhite peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-kwhite peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-kblue">
                                                {field.label}
                                            </label>
                                        </>
                                    )}
                                </>
                            </div>
                        ))}
                        <button type="submit" className='absolute bottom-4 right-4 h-[38px] w-44 bg-kgreen text-kwhite font-bold rounded hover:bg-kyellow hover:text-kwhite'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PerformanceForm;
