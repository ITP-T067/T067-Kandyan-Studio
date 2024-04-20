import React, { useState, useEffect } from 'react'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8010/"

function EditPackages() {
  const { package_id } = useParams();
  const [formDataEdit, setFormDataEdit] = useState({
    pkg_category: "",
    pkg_name: "",
    price: 0,
    description: "",
    _id : package_id,
  });
  const navigate = useNavigate();

  const [dataList, setDataList] = useState();

  const getFetchData = async() => {
    try {
      const response = await axios.get("/package/");
      if(response.data.success){
        setDataList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getPackageDetails = async ()=> {
    try {
      const response = await axios.get("/package/"+ package_id);
      console.log(response.data.data)
      if(response.data.success){
        const packageDetails = response.data.data;
        setFormDataEdit({
          pkg_category: packageDetails.pkg_category,
          pkg_name: packageDetails.pkg_name,
          price: packageDetails.price,
          description: packageDetails.description,
          _id: packageDetails._id,
        });
      }
    } catch (error) {
      console.error("Error fetching package details:", error);
    }
  };

  useEffect(()=> {
    getPackageDetails();
    getFetchData();
  }, [package_id]);

  const handleUpdate = async  (e) => {
    e.preventDefault();
    const response = await axios.get("/package/" + package_id);
    const packageDetails = response.data.data;
    if (formDataEdit.pkg_name !== packageDetails.pkg_name){
      // const packageExists = dataList.some(package => package.pkg_name === formDataEdit.pkg_name);
      // if(packageExists){
      //   alert("Package name already exists. Please enter a different package name");
      //   return;
      // }
    }
  }

  return (
    <div>

      {/* back navigation */}
      <div className="backnaviagtion flex ml-10 mt-3 items-center">
        <Link to="" className="flex items-center">
          <IoArrowBackCircleSharp className="w-10 h-10" />
          <p className="label text-kblack mt-2 mb-2 ml-2 text-lg font-[inter]">Edit Packages</p>
        </Link>
      </div>

        {/* form section */}
        <div className="flex justify-center items-start mt-3 mb-4">
          <div className="container max-w-2xl h-96 bg-kgray  flex flex-col rounded-lg font-[inter]">

            <form className="flex flex-col">

              <div className=" mt-10 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite">Package Category</label>
                <input className="form-control rounded-md border-2 border-kblack bg-kwhite text-sm  w-96 px-1" name="category" />
              </div>

              <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite">Package Type</label>
                <input className="form-control rounded-md border-2 border-kblack bg-kwhite text-sm w-96 px-1" name="type"  />
              </div>

              <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite">Package Price</label>
                <input className="form-control rounded-md w-96 px-1 bg-kwhite text-sm" name="price"  />
              </div>

              <div className=" mt-3 mb-4 ml-5 flex justify-start gap-4">
                  <label className="form-label text-kwhite">Upload an Image</label>
                  <input className="form-control rounded-md w-28 text-sm" name="image" type="file" /> 
              </div>

              <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite">Description</label>
                <textarea className="form-control rounded-md w-96 text-sm columns-5 px-1" name="description"  />
              </div>

              <div className=" mt-3 mb-4 ml-5 flex justify-end gap-4 mr-8">
                <Link to="">
                  <button className="form-label text-kwhite bg-kyellow  hover:bg-kwhite hover:text-kblack h-10  w-24 rounded-lg">Save Changes</button>
                </Link>
              </div>

            </form>
          </div>
        </div>
      
    </div>
  )
}

export default EditPackages
