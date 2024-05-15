import React, { useState, useEffect } from 'react'
import { Button, Card, Typography } from "@material-tailwind/react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { format, set } from 'date-fns';
import Alert from "../../../Components/Common/Alerts/alert";

axios.defaults.baseURL = 'http://localhost:8010/';

function MyEvents() {

  const TABLE_HEAD = ["Package Category", "Package Name", "Date", "Venue", "Price", "Additional", "Actions"];

  const [tableRows, setTableRows] = useState([]);


  const fetchData = async (event_id) => {
    try {
      const response = await axios.get(`/event/package/${event_id}`, {
        params: {
          status: "Approved"
        }
      });
      console.log("Response: ", response.data.data);
      if (response.data.success) {
        setTableRows(response.data.data);
      } else {
        console.error("Failed to fetch data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  // Function to format date in yyyy/mm/dd format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  //Edit event
  const { event_id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editSection, setEditSection] = useState(false);
  const [formDataEdit, setFormDataEdit] = useState({
    cus_name: "",
    venue: "",
    cus_contact: "",
    additional: "",
    date: "",
    _id: event_id // event id
  });

  //handling edit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/event/update', formDataEdit);
      console.log("Response: ", response.data);
      if (response.data.success) {
        alert("Event updated successfully");
        setEditSection(false);
        fetchData();
      } else {
        alert("Failed to update Event");
      }

    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleEdit = (event) => {
    setFormDataEdit({
      cus_name: event.cus_name,
      cus_contact: event.cus_contact,
      date: new Date(),
      venue: event.venue,
      additional: event.additional,
      _id: event._id,
    });
    setEditSection(true);
  };

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => {
      return {
        ...prev,
        [name]: value,
        date: selectedDate,
      }
    });
  };

  const [isAlert, setIsAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState('success');
  const [message, setMessage] = useState('');

  //delete event
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to cancel this event?");
    if (confirmed) {
      const data = await axios.delete("/event/delete/" + id);
      if (data.data.success) {
        fetchData();
        setIsAlert(true);
        setAlertStatus('success');
        setMessage('Event cancelled !');
        setTimeout(() => {
          setIsAlert(false);
        }, 3000);
      } else {
        setIsAlert(true);
        setAlertStatus('error');
        setMessage('Failed to cancel Event');
        setTimeout(() => {
          setIsAlert(false);
        }, 3000);
      }
    }
  }


  return (
    <>
      <div>{isAlert && <Alert message={message} type={alertStatus} />}</div>
      <div className=' mt-10 ml-10 mr-10'>
        <div className={`container ${editSection ? 'blur' : ''}`}>

          <Card className="h-full w-full text-kwhite">
            <table className="w-full min-w-max table-auto text-center">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className={`border-kwhite text-kwhite p-4 font-bold text-center bg-kblack`}
                    >
                      <Typography
                        variant="normal"

                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((event, index) => {
                  const { pkg_category, pkg_name, price } = event.package_id;
                  const isLast = index === tableRows.length - 1;
                  const classes = isLast ? "p-2" : "p-2 border-b border-b-kwhite";

                  return (
                    <tr key={event._id} className="bg-kwhite bg-opacity-20 ">
                      <td className={classes}>
                        <Typography
                          variant="normal"
                        >
                          {pkg_category}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="normal"
                        >
                          {pkg_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="normal"
                        >
                          {formatDate(event.date)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="normal"

                        >
                          {event.venue}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="normal"
                        >
                          {price}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="normal"
                        >
                          {event.additional}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {/* <Button onClick={() => { setEditSection(true); handleEdit(event) }} className="btn_edit w-24 border-1 rounded-lg  bg-kgreen ">Edit</Button> */}
                        <Button onClick={() => handleDelete(event._id)} className="btn_edit w-24 border-1 rounded-lg bg-kred ">Cancel Event</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>

        {
          editSection && (

            <form onSubmit={handleUpdate} className="form-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 bg-kgray rounded-2xl flex justify-center items-center border-2 border-kyellow">
              <div className="outer_box flex-auto mt-5 ml-7 mr-10 max-w-4xl flex-col h-[22rem]  mb-10 rounded-xl ">
                <div>
                  <input type="hidden" name="id" value={formDataEdit._id} />
                </div>
                <div className="grid grid-cols-2 gap-7 mt-3 items-center ml-5 mr-5 font-normal text-mdfont-semibold ">
                  <div>
                    <label htmlFor="cus_name" className="block text-kwhite">Customer Name</label>
                    <input type="text"
                      id="cus_name"
                      name="cus_name"
                      onChange={handleEditOnChange}
                      value={formDataEdit.cus_name}
                      className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1" required />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-kwhite">Date</label>
                    <DatePicker
                      className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1"
                      id="date"
                      name="date"
                      value={setSelectedDate(formDataEdit.date)}
                      onChange={handleEditOnChange}
                      dateFormat="yyyy-MM-dd"
                      required />
                  </div>
                  <div>
                    <label htmlFor="cus_contact" className="block text-kwhite">Contact No</label>
                    <input
                      type="text"
                      id="cus_contact"
                      name="cus_contact"
                      onChange={handleEditOnChange}
                      value={formDataEdit.cus_contact}
                      className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1" required />
                  </div>
                  <div>
                    <label htmlFor="venue" className="block text-kwhite">Venue</label>
                    <input type="text"
                      id="venue"
                      name="venue"
                      onChange={handleEditOnChange}
                      value={formDataEdit.venue}
                      className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1" required />
                  </div>

                  <div>
                    <label htmlFor="additioal" className="block text-kwhite">Additional</label>
                    <input type="text"
                      id="additional"
                      name="additional"
                      onChange={handleEditOnChange}
                      value={formDataEdit.additional}
                      className="block w-80 mt-1 rounded-md h-8 text-md bg-kwhite p-1" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <button className="btn_submit w-28 h-12 text-lg font-normal bg-kyellow text-kwhite mt-8 ml-5 mbflex justify-center items-center rounded-lg" onClick={() => setEditSection(false)}>Close</button>
                  <button type="submit" className="btn_submit w-32 h-12 text-lg font-normal bg-kyellow text-kwhite mt-8 mr-5 mbflex justify-center items-center rounded-lg">Save Changes</button>
                </div>
              </div>
            </form>
          )
        }


      </div>
    </>
  )
}

export default MyEvents
