import React, { useEffect, useState,useRef } from "react";
import { Card, Button, CardBody } from "@material-tailwind/react";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import axios from "axios";
import { useReactToPrint } from 'react-to-print';
import DatePicker from "react-datepicker";


axios.defaults.baseURL = "http://localhost:8010/";

const GoBack = () => {
  window.location.href = "/cashier/ordermain";
};


//main function startss bfr consts
const Completedorders = () => {


          const [dataList, setDataList] = useState([]);
          const [completedOrders, setCompletedOrders] = useState([]);
          const [currentPage, setCurrentPage] = useState(1);
          const [itemsPerPage] = useState(5);
          const [searchTerm, setSearchTerm] = useState("");
          const [searchResults, setSearchResults] = useState([]);

          useEffect(() => {
            getFetchData();
          }, []);


          useEffect(() => {
            setCompletedOrders([]);
            dataList.forEach((item) => {
              if (item.ordertype === "Completed") {
                setCompletedOrders((prev) => [...prev, item]);
              }
            });
          }, [dataList]);


          const getFetchData = async () => {
            try {
              const response = await axios.get("/placeorder/");
              if (response.data.success) {
                setDataList(response.data.data);
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };


          useEffect(() => {
            const results = dataList.filter((item) =>
              item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
          }, [searchTerm, dataList]);
          

          const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

          const pageNumbers = [];
          for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
            pageNumbers.push(i);
          }

          const paginate = (pageNumber) => {
            setCurrentPage(pageNumber);
          };

          //Report Generation
          const componentPDF = useRef([]);

          const generatePDF = useReactToPrint({
          content: () => componentPDF.current,
        });

        const SupplyRequestPrintable = ({datalistnew}) => {
          return (
              <div ref={componentPDF} className="bg-kwhite mx-auto items-center justify-center p-10 rounded-lg">
                      <div className="text-2xl font-bold text-kblack items-center justify-center text-center mb-5">Kandyan Studio & Digital Color Lab</div>
                      <div className="text-xl font-bold text-kblack items-center justify-center text-center mb-5">Payment Recipt</div>

                      <div className="flex items-center justify-between">
                      <span className="text-sm text-kblack mb-3">Issued date : {new Date().toLocaleString()}</span>
                     </div>
                     
                      <table className="w-full table-fixed border rounded-lg overflow-hidden">
                      
          <tbody>
          <tbody>
                    {completedOrders.length > 0 ? (
                      completedOrders.map((il, index) => {
                        return (
                          <tr
                            key={index}
                            className="border-b bg-kwhite/20 text-kblack text-center items-center p-4 text-lg"
                          >
                            <td className="p-4">{il.cusname}</td>
                            <td className="p-4">{il.telephone}</td>
                            <td className="p-4">{il.email}</td>
                            <td className="p-4">{il.nettotal}</td>
                            <td className="p-4">{il.change}</td>
                            <td className="p-4">{il.discount}</td>
                            <td className="p-4">{il.tendered}</td>
                            <td className="p-4">{il.grosstotal}</td>
                            
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="bg-kwhite/20 w-full text-kwhite">
                        <td className="text-center py-4">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
              </tbody>
      </table>
                  <div className="grid grid-cols-2">
                      <span className="text-sm text-kblack mt-5">Total Requests:</span>
                      <span className="text-sm text-kblack mt-5">{datalistnew.length}</span>
                      <span className="text-sm text-kblack mt-5">Total Cost of the Requests:</span>
                      <span className="text-sm text-kblack mt-5">mo mo</span>
                  </div>
                  <div className="text-xl font-bold text-kblack items-center justify-center text-center mb-5">Thank You Come Again! </div>
                  </div>
                  
          );
      };
  
        const componentRef = useRef();
  
  
        const [reportSection, setReportSection] = useState(false);

        
          return (

            <>
        {/* genarate reports */}
        {reportSection && (
            <div className="fixed grid grid-cols-1 top-0 left-0 h-full bg-kblack bg-opacity-50 backdrop-blur flex items-center justify-center text-kwhite z-50 p-24 ">
            <button
                        className="absolute top-5 right-5 bg-kblack text-kwhite"
                        onClick={() => setReportSection(false)}
                    >
                        X
                    </button>
            <SupplyRequestPrintable ref={componentRef} datalistnew={dataList} />
            <button className="bg-kgreen rounded-lg text-kwhite mx-50 mx-64 p-2" onClick={generatePDF}>Print</button>
            </div>
        )}


            <div className="completedorders">
              {/* go back and other navigations */}
              <div className="mx-5 mb-5">
                <Card>
                  <CardBody className="flex items-center justify-between">
                    <div className="w-1/3">
                      <Button
                        onClick={GoBack}
                        className="flex items-center space-x-2 bg-transparent text-kwhite px-3 py-2 rounded-md"
                      >
                        <HiOutlineArrowCircleLeft className="w-5 h-5" />
                        <span className="text-lg">Order</span>
                      </Button>
                    </div>

                    <div className="w-1/3 text-kwhite  text-4xl ">COMPLETED ORDERS</div>

                    {/* search item */}
                    <div className="w-1/3 px-10">
                      <input
                        type="search"
                        placeholder="Search"
                        className="bg-kwhite text-kblack rounded-full p-2 text-lg "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </CardBody>
                </Card>
              </div>

              {/* table */}
              <div className="px-10 ">
                <table className="w-full rounded-lg overflow-hidden text-sm">
                  <thead>
                    <tr className="bg-kblack/40 border-kwhite text-kwhite p-4 font-bold border-b text-center text-lg">
                      <th>Customer</th>
                      <th>Telephone</th>
                      <th>Email</th>
                      <th>Net Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedOrders.length > 0 ? (
                      completedOrders.map((il, index) => {
                        return (
                          <tr
                            key={index}
                            className="border-b bg-kwhite/20 text-kwhite text-center items-center p-4 text-lg"
                          >
                            <td className="p-4">{il.cusname}</td>
                            <td className="p-4">{il.telephone}</td>
                            <td className="p-4">{il.email}</td>
                            <td className="p-4">{il.nettotal}</td>
                            <td>
                              <Button
                                className="p-3 bg-kblack text-kwhite text-lg hover:scale-105"
                                onClick={() => setReportSection(true)}
                              >
                                {"Print Receipt"}
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="bg-kwhite/20 w-full text-kwhite">
                        <td colSpan="4" className="text-center py-4">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-kblack p-4">
                  <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                    Previous
                  </Button>
                  <div className="flex items-center gap-2">
                    {pageNumbers.map((number) => (
                      <Button
                        key={number}
                        variant="text"
                        size="sm"
                        className="text-kblack bg-kwhite"
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </Button>
                    ))}
                  </div>
                  <Button variant="text" size="sm" className="text-kblack bg-kwhite">
                    Next
                  </Button>
                </div>
              </div>
            </div>

            </>
          );
        };

export default Completedorders;
