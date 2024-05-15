import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

axios.defaults.baseURL = "http://localhost:8010/";

export default function GenerateReports() {
    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const getFetchData = async (adjustedEndDate) => {
        try {
            const response = await axios.get("/project/report", {
                params: {
                    startDate: startDate,
                    endDate: adjustedEndDate
                }
            });
            if (response.data.success) {
                setDataList(response.data.data);
                setIsDataLoaded(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const componentRef = useRef(null);

    const generateNewPDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Project Report",
        onAfterPrint: () => alert("Data Saved in pdf"),
    });

    const generatePDF = () => {
        const pdf = new jsPDF();
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("Report of Total Project Summary", 105, 10, { align: 'center' });
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`Total number of ongoing projects: ${totalOngoingProjects}`, 10, 20);
        pdf.text(`Total number of completed projects: ${totalCompletedProjects}`, 10, 30);
        pdf.text(`Total number of online completed projects: ${totalOnlineProjects}`, 10, 40);

        let startY = 60;
        dataList.forEach((project, index) => {
            const details = `Project ${index + 1}: ${project.Project_Name}, Status: ${project.Status}, Order: ${project.OrderModel}`;
            pdf.text(details, 10, startY);
            startY += 10;
        });

        pdf.save("project_report.pdf");
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setErrorMessage('');
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setErrorMessage('');
    };

    const handleSubmit = () => {
        if (!startDate || !endDate) {
            setErrorMessage('Both start and end dates are required.');
            return;
        }
        if (startDate > new Date()) {
            setErrorMessage('The "From" date cannot be in the future.');
            return;
        }
        if (endDate <= startDate) {
            setErrorMessage('The "To" date must be after the "From" date.');
            return;
        }
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
        getFetchData(adjustedEndDate);
    };

    const calculateProjectSummary = () => {
        const totalOngoingProjects = dataList.filter(project => project.Status === 'In Progress' || project.Status === 'Pending').length;
        const totalCompletedProjects = dataList.filter(project => project.Status === 'Completed').length;
        const totalOnlineProjects = dataList.filter(project => project.OrderModel === 'OnlineOrder' && project.Status === 'Completed').length;

        return {
            totalOngoingProjects,
            totalCompletedProjects,
            totalOnlineProjects
        };
    };

    const { totalOngoingProjects, totalCompletedProjects, totalOnlineProjects } = calculateProjectSummary();

    return (
        <>
            <div className='flex flex-col'>
                <div className="h-28 relative ">
                    <div className="w-[50%] h-20 left-1/4 top-0 absolute bg-kgray bg-opacity-40 rounded-3xl flex items-center justify-evenly">
                        <label className='font-bold text-kwhite text-lg mr-2'>FROM</label>
                        <DatePicker
                            className='text-kwhite bg-kgray w-36 h-10 bg-opacity-80 rounded-3xl text-center'
                            selected={startDate}
                            onChange={handleStartDateChange}
                        />
                        <label className='font-bold text-kwhite text-lg ml-8 mr-2'>TO</label>
                        <DatePicker
                            className='text-kwhite bg-kgray w-36 h-10 bg-opacity-80 rounded-3xl text-center'
                            selected={endDate}
                            onChange={handleEndDateChange}
                        />
                        <button type="button" onClick={handleSubmit} className="bg-kgreen text-kwhite text-sm focus:ring-4 focus:outline-none rounded-3xl px-5 py-2.5 text-center w-[8rem] ml-20">Generate</button>
                    </div>
                </div>
                {errorMessage && (
                    <div className="text-kred text-center mt-2">
                        {errorMessage}
                    </div>
                )}
                {isDataLoaded && (
                    <div ref={componentRef} className="addContainer w-[530px] h-80 bg-kgray bg-opacity-70 rounded-[20px] shadow flex flex-col mt-0 absolute top-1/2 left-1/2 transform -translate-x-1/2  p-5">
                        <h className="text-kwhite text-3xl font-extrabold text-center mt-0 mb-0">Total Project Summary</h>
                        <div className="flex flex-col px-5 py-5">
                            <div className="mb-5">
                                <label htmlFor="Customer_Name" className="text-kwhite font-bold text-lg">Total number of ongoing projects: </label>
                                <span className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kwhite">{totalOngoingProjects}</span>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="Inquiry_Data" className="font-bold text-kwhite text-lg">Total number of completed projects: </label>
                                <span className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kwhite">{totalCompletedProjects}</span>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="Quantity" className="font-bold text-kwhite text-lg">Total number of online completed projects: </label>
                                <span className="w-[473px] h-[49px] rounded-[10px] mb-0 p-3 text-base text-kwhite">{totalOnlineProjects}</span>
                            </div>
                            <div className="flex justify-center mb-4">
                                <button type="button" onClick={generatePDF} className="submitBtn w-[152px] h-[44px] bg-kgreen rounded-[15px] text-kwhite font-bold  hover:bg-kblue">Print</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
