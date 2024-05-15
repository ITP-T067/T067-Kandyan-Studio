import React, { useEffect, useState } from 'react'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from "../../../Components/Common/Alerts/alert";

axios.defaults.baseURL = "http://localhost:8010/";

function AddPackages() {

  const [formData, setFormData] = useState({
    pkg_category: "",
    pkg_name: "",
    price: 0,
    file: null,
    status: "Active",
    description: ""
  })

  const [dataList, setDataList] = useState([]);
  const [weddingCount, setWeddingCount] = useState(0);
  const [birthdayCount, setBirthdayCount] = useState(0);
  const [socialCount, setSocialCount] = useState(0);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("/package");
      console.log("Response: ", response);
      setDataList(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  //calculating pkg category count
  const calcCategoryCount = (dataList) => {
    let weddingCount = 0;
    let birthdayCount = 0;
    let socialCount = 0;

    dataList.forEach((pkg) => {
      if (pkg.status == "Active") {
        if (pkg.pkg_category == "Wedding") {
          weddingCount++;
        } else if (pkg.pkg_category == "Birthday Party") {
          birthdayCount++;
        } else if (pkg.pkg_category == "Social Event") {
          socialCount++;
        }
      }
    });
    setWeddingCount(weddingCount);
    setBirthdayCount(birthdayCount);
    setSocialCount(socialCount);
  }

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    calcCategoryCount(dataList);
  }, [dataList]);

  console.log("Wedding Count: ", weddingCount);
  console.log("Birthday Count: ", birthdayCount);
  console.log("Social Count: ", socialCount);

  const handleOnChange = (e) => {
    const { value, name } = e.target;

    if (name === 'file') {  //file
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.files[0]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      // console.log(formData.pkg_category);
    }
  };

  const [isAlert, setIsAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState('success');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // Check if the package category is already exists
      fetchPackages();
      calcCategoryCount(dataList);

      // Check if there are already three packages for the selected category
      if (formData.pkg_category === "Wedding" && weddingCount >= 3) {
        alert("Wedding category already has 3 packages.");
        window.location.href = "/manager/eventdept/MgrWedding";
        return;
      } else if (formData.pkg_category === "Birthday Party" && birthdayCount >= 3) {
        alert("Birthday Party category already has 3 packages.");
        window.location.href = "/manager/eventdept/MgrBdayParty";
        return;
      } else if (formData.pkg_category === "Social Event" && socialCount >= 3) {
        alert("Social Event category already has 3 packages.");
        window.location.href = "/manager/eventdept/MgrSocial";
        return;
      }

      // Check if the package name is already used in the selected category
      const isPackageNameExists = dataList.some((pkg) => pkg.pkg_name === formData.pkg_name && pkg.pkg_category === formData.pkg_category && pkg.status === "Active");
      if (isPackageNameExists) {
        calcCategoryCount(dataList);
        console.log("Data List: ", dataList);
        setIsAlert(true);
        setAlertStatus('danger');
        setMessage('Package name already exists in the selected category.');
        return;
      }

      const formDataSend = new FormData();
      formDataSend.append("pkg_category", formData.pkg_category);
      formDataSend.append("pkg_name", formData.pkg_name);
      formDataSend.append("price", formData.price);
      formDataSend.append("description", formData.description);
      formDataSend.append("status", formData.status);
      formDataSend.append("file", formData.file);

      console.log("Form data: ", formData);


      const response = await axios.post("/package/create", formDataSend);

      //handle response
      console.log("Response:", response);

      if (response.data.success) {
        setIsAlert(true);
        setAlertStatus('success');
        setMessage('Package added successfully');
        if (response.data.data.pkg_category === "Wedding") {
          window.location.href = "/manager/eventdept/MgrWedding";
        }
        else if (response.data.data.pkg_category === "Birthday Party") {
          window.location.href = "/manager/eventdept/MgrBdayParty";
        }
        else if (response.data.data.pkg_category === "Social Event") {
          window.location.href = "/manager/eventdept/MgrSocial";
        }
      } else {
        setIsAlert(true);
        setAlertStatus('error');
        setMessage('Failed to add Package');
      }
    } catch (error) {
      console.error(error.response.data);
      setIsAlert(true);
      setAlertStatus('error');
      setMessage('An error occured while adding package');
    }
  };

  const GoBack = () => {
    window.location.href = "/manager/eventdept/MgrWedding";
  };

  return (
    <>
      <div>{isAlert && <Alert message={message} type={alertStatus} />}</div>

      {/* back navigation */}
      <div className="backnaviagtion flex-auto ml-10 mt-3  items-center" >
        <Link to="" className="flex items-start">
          <IoArrowBackCircleSharp className="w-10 h-10 text-kwhite" />
          <p className="label text-kwhite mt-2 mb-2 ml-2 text-lg font-[inter]" >Add Packages</p>
        </Link>
      </div>

      {/* form section */}
      <div className="flex justify-center items-start mt-3">
        <div className="container max-w-2xl h-[28rem] bg-kgray  flex flex-col rounded-lg font-[inter]">

          <form className="flex flex-col" onSubmit={handleSubmit}  >

            <div className="mt-10 mb-4 ml-5 flex justify-start gap-4">
              <label className="form-label text-kwhite">Package Category</label>
              <select
                className="form-control rounded-md border-2 border-kblack bg-kwhite text-sm w-96 px-1"
                name="pkg_category"
                value={formData.pkg_category}
                onChange={handleOnChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Wedding">Wedding</option>
                <option value="Social Event">Social Event</option>
                <option value="Birthday Party">Birthday Party</option>
              </select>
            </div>


            <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
              <label className="form-label text-kwhite">Package Name</label>
              <select
                className="form-control rounded-md border-2 border-kblack bg-kwhite text-sm w-96 px-1"
                name="pkg_name"
                value={formData.pkg_name}
                onChange={handleOnChange}
                required
              >
                <option value="">Select Package Name</option>
                <option value="Minimal">Minimal</option>
                <option value="Regular">Regular</option>
                <option value="De-Luxe">De-Luxe</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Diamond">Diamond</option>
              </select>
            </div>

            <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
              <label className="form-label text-kwhite">Package Price</label>
              <input className="form-control rounded-md w-96 px-1 bg-kwhite text-sm"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleOnChange}
                required />
            </div>

            <div className=" mt-3 mb-4 ml-5 flex justify-start gap-4">
              <label className="form-label text-kwhite">Upload an Image</label>
              <input className="form-control rounded-md  w-48 bg-kwhite h-6 text-sm"
                type="file"
                name="file"
                onChange={handleOnChange}
              />
            </div>

            <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
              <label className="form-label text-kwhite">Description</label>
              <textarea className="form-control rounded-md w-96 text-sm columns-5 px-1"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleOnChange}
              />
            </div>

            <div>
              <input type="hidden" name="status" value={formData.status} />
            </div>

            <div className=" mt-3 mb-4 ml-5 flex justify-end gap-4 mr-8">
              <button type="submit" className="form-label text-kwhite bg-kyellow  hover:bg-kwhite hover:text-kblack h-10  w-24 rounded-lg">Add</button>
              <button className="form-label text-kwhite bg-kyellow  hover:bg-kwhite hover:text-kblack h-10  w-24 rounded-lg" onClick={GoBack}>Back</button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default AddPackages
