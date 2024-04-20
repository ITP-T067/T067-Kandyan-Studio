import React, { useState } from 'react'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8010/";

function AddPackages() {

  const [formData, setFormData] = useState({
    pkg_category: "",
    pkg_name: "",
    price: 0,
    image: "",
    description: ""
  })

  const handleOnChange = (e) => {
    const {value,name} = e.target;

    if(name === 'none'){  //file
        setFormData((prev)=>({
            ...prev,
            [name]: e.target.files[0]
        }));
    }else{
        setFormData((prev)=>({
            ...prev,
            [name]: value,
        }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // const formDataSend = new FormData();
    // formDataSend.append("pkg_category", formData.pkg_category);
    // formDataSend.append("pkg_name", formData.pkg_name);
    // formDataSend.append("price", formData.price);
    // formDataSend.append("description", formData.description);
    // formDataSend.append("file", formData.file);
    
    console.log("Form data: ", formData);

    try {
      const response = await axios.post("/package/create", formData);

      //handle response
      console.log("Response:",response);

      if(response.data.success){ 
          alert("Package added successfully");
          window.location.href = "/manager/eventdept/MgrWedding";
      } else {
          alert("Failed to add Package");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("An error occured while adding package");
    }
  };

  const GoBack = () => {
    window.location.href = "/manager/eventdept/MgrWedding";
  };

  return (
    <div>

        {/* back navigation */}
        <div className="backnaviagtion flex-auto ml-10 mt-3  items-center" >
          <Link to="" className="flex items-start">
            <IoArrowBackCircleSharp className="w-10 h-10 text-kwhite" />
            <p className="label text-kwhite mt-2 mb-2 ml-2 text-lg font-[inter]" >Add Packages</p>
          </Link>
        </div>

        {/* form section */}
        <div className="flex justify-center items-start mt-3">
          <div className="container max-w-2xl h-[24rem] bg-kgray  flex flex-col rounded-lg font-[inter]">

            <form className="flex flex-col" onSubmit={handleSubmit}  >

              <div className=" mt-10 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite">Package Category</label>
                <input className="form-control rounded-md border-2 border-kblack bg-kwhite text-sm w-96 px-1" 
                      type="text"
                      name="pkg_category" 
                      value={formData.pkg_category}
                      onChange={handleOnChange} 
                required/>
              </div>

              <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite">Package Name</label>
                <input className="form-control rounded-md border-2 border-kblack bg-kwhite text-sm w-96 px-1" 
                      type="text"
                      name="pkg_name"
                      value={formData.pkg_name}
                      onChange={handleOnChange} 
                required/>
              </div>

              <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite">Package Price</label>
                <input className="form-control rounded-md w-96 px-1 bg-kwhite text-sm" 
                      type="number"
                      name="price"
                      value={formData.price} 
                      onChange={handleOnChange}
                required/>
              </div>

              <div className=" mt-3 mb-4 ml-5 flex justify-start gap-4">
                  <label className="form-label text-kwhite">Upload an Image</label>
                  <input className="form-control rounded-md  w-48 bg-kwhite h-6 text-sm" 
                        type="text"
                        name="image" 
                        value={formData.file}
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

              <div className=" mt-3 mb-4 ml-5 flex justify-end gap-4 mr-8">
                  <button type="submit" className="form-label text-kwhite bg-kyellow  hover:bg-kwhite hover:text-kblack h-10  w-24 rounded-lg">Add</button>
                  <button className="form-label text-kwhite bg-kyellow  hover:bg-kwhite hover:text-kblack h-10  w-24 rounded-lg" onClick={GoBack}>Back</button>
              </div>

            </form>
          </div>
        </div>
      
    </div>
  )
}

export default AddPackages
