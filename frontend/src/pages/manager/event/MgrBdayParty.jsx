import React, {useEffect, useState} from 'react'
import { Link , useLocation, useParams} from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8010/";

function MgrBdayParty({packageName}) {

  const location = useLocation();
  const [editSection, setEditSection] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageNameLabel, setPackageNameLabel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dataList, setDataList] = useState([]);

  //Edit package
  const { package_id } = useParams();
  const [formDataEdit, setFormDataEdit] = useState({
    pkg_category: "",
    pkg_name: "",
    price: 0,
    description: "",
    _id : package_id,
  });

  const hanldeUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/package/update', formDataEdit);
      if (response.data.success) {
        setEditSection(false);
        fetchPackagesByCategory();
        alert('Package updated successfully');
      } else {
        alert('Failed to update package');
      }
    } catch (error) {
      console.error('Error updating package: ', error);
    }
  };

  // Fetch packages by category when the selectedCategory state changes
  const fetchPackagesByCategory = async () => {
    try {
        const response = await axios.get("/package/");
        const {data} = response;

        //Filter packages by category
        const filteredPackages = data.filter(pkg => pkg.pkg_category === 'Birthday Party');
        //console.log(filteredPackages); // Check the response data in the console
        if({filteredPackages}){
            setDataList(filteredPackages);
        }
    } catch (error) {
        console.error("Error Fetching data: ",error);
    }
};

  useEffect(() => {
    fetchPackagesByCategory();
  },[dataList]);

  const handleEdit = (pkg) => {
    setFormDataEdit({
      pkg_category: pkg.pkg_category,
      pkg_name: pkg.pkg_name,
      price: pkg.price,
      description: pkg.description,
      _id: pkg._id,
    });
    setEditSection(true);
  };

  const handleCategoryChange = async(e) => {
    setSelectedCategory(e.target.value);
    // Clear selected package when category changes
    setSelectedPackage(null);
  };

  const handleEditOnChange = async(e) => {
    const {value,name} = e.target
        setFormDataEdit((prev)=> {
          
          return{
            ...prev,
            [name] : value
          }
        })
  };

  const selectPackage = (packageName) => {
    setSelectedPackage(packageName);
    setPackageNameLabel(packageName); // Update label based on selected package
    setEditSection(true);
  };

  const handleDelete = async (package_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
        const data = await axios.delete("/package/delete/" + package_id);
        if (data.data.success) {
            fetchPackagesByCategory();
            alert(data.data.message);
        }
    }
  };

  return (
    <div>
        <div className={`container ${editSection ? 'blur' : ''}`}>
        {/* back nav */}
      <div className="ml-10 mt-0 flex justify-between gap-5 items-center">
        <div className="flex justify-center items-center">
          <Link to="/manager/eventdept/mgrDashWedding">
            <IoArrowBackCircleSharp className="w-10 h-10"/>
          </Link>
          <p className="text-kblack mt-2 mb-2 ml-2 text-lg font-[inter]">Manage Packages</p>
        </div>
        <Link to="/manager/eventdept/AddPackages">
          <button className="addPackage text-xl text-kwhite justify-center bg-kblack rounded-lg w-48 h-12 flex pt-2  hover:bg-kyellow hover:text-kblack mr-6">
          <IoIosAddCircleOutline className="w-10 h-10 flex pb-2" />
          Add Package
          </button>
        </Link> 
      </div>

      {/* event navigation */}
      <div className="events w-56 h-12 relative mt-15 ml-96 flex justify-center">
        <Link to="/manager/eventdept/MgrWedding">
        <button className={`Wedding w-56 h-12 left-0 top-0 absolute bg-kgray rounded-tl-3xl rounded-bl-3xl text-center text-kwhite text-xl font-normal hover:bg-kyellow hover:text-kblack ${location.pathname === '/manager/eventdept/MgrWedding' ? 'active' : ''}`}>Wedding</button>
        </Link>
        <Link to="/manager/eventdept/MgrBdayParty">
        <button className={`Bdayparty w-56 h-12 left-[232px] top-0 absolute bg-kgray text-center text-kwhite text-xl font-normal  hover:bg-kyellow hover:text-kblack ${location.pathname === '/manager/eventdept/MgrBdayParty' ? 'bg-kyellow' : ''}`}>Birthday Party</button>
        </Link>
        <Link to="/manager/eventdept/MgrSocial">
        <button className={`Socilaevents w-56 h-12 left-[464px] top-0 absolute bg-kgray rounded-tr-3xl rounded-br-3xl text-center text-kwhite text-xl  hover:bg-kyellow hover:text-kblack ${location.pathname === '/manager/eventdept/MgrSocial' ? 'active' : ''}`}>Social Events</button>
        </Link>
      </div>
        

      {/* packages */}
      <div className="card_container flex justify-center space-x-20 mt-7">
            
            {
              dataList.length > 0 ? (
                dataList.map((pkg) => {
                  if(pkg.pkg_name ==="Standard"){
                    return (
                      // {/* Standard */}
                      <div key={pkg._id} className="card2 w-80  h-[30rem] mb-8 bg-kgray backdrop-filter backdrop-blur-lg rounded-xl border-2 border-kyellow">
                      <img className="img2 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={require(`../../../../../backend/uploads/EventManagement/${pkg.image}`)}/>
                      <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                          <p className="type text-2xl font-bold">{pkg.pkg_name} Package</p>
                          {pkg.description.split('\n').map((line, index) => (
                          <p className="desc" key={index}>{line}</p>
                            ))}
                            <br/>
                          <p className="price text-3xl font-semibold">Rs {pkg.price}</p>
                      </div>
                      <div className="buttons flex justify-center gap-9  font-bold">
                              <button onClick={() => { selectPackage("Standard"); setEditSection(true); handleEdit(pkg) }} className="btn_edit justify-end items-end w-28 h-12 bg-kblue rounded-3xl text-center text-kwhite text-base font-bold  hover:bg-kwhite hover:text-kblack">Edit</button>
                              <button onClick={() => handleDelete(pkg._id)} className="btn_delete w-28 h-12  bg-kred rounded-3xl text-center text-kwhite text-base font-bold  hover:bg-kwhite hover:text-kblack">Delete</button>
                      </div>
                    </div>
                    )
                  }
                  else if(pkg.pkg_name === "Premium"){
                    return (
                        // {/* Regular */}
                      <div  key={pkg._id} className="card3 w-80 h-[30rem] mb-8 bg-kgray backdrop-filter backdrop-blur-lg rounded-xl border-2 border-kyellow">
                        <img className="img3 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={require(`../../../../../backend/uploads/EventManagement/${pkg.image}`)}/>
                        <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                            <p className="type text-2xl font-bold">{pkg.pkg_name} Package</p>
                            {pkg.description.split('\n').map((line, index) => (
                            <p className="desc" key={index}>{line}</p>
                              ))}
                              <br/>
                            <p className="price text-3xl font-semibold">Rs {pkg.price}</p>
                        </div>
                        <div className="buttons flex justify-center gap-9  font-bold">
                                <button onClick={() => { selectPackage("Premium"); setEditSection(true); handleEdit(pkg) }} className="btn_edit justify-end items-end w-28 h-12 bg-kblue rounded-3xl text-center text-kwhite text-base font-bold  hover:bg-kwhite hover:text-kblack">Edit</button>
                                <button onClick={() => handleDelete(pkg._id)} className="btn_delete w-28 h-12  bg-kred rounded-3xl text-center text-kwhite text-base font-bold  hover:bg-kwhite hover:text-kblack">Delete</button>
                        </div>
                      </div>
                    )
                  }
                  else if( pkg.pkg_name ==="Diamond" ){
                    return (
                      // {/* Diamond */}
                      <div  key={pkg._id} className="card3 w-80 h-[30rem] mb-8 bg-kgray backdrop-filter backdrop-blur-lg rounded-xl border-2 border-kyellow">
                        <img className="img3 w-72 mx-auto block rounded-lg mt-3 border-2 border-kwhite" src={require(`../../../../../backend/uploads/EventManagement/${pkg.image}`)}/>
                        <div className="decsription flex flex-col justify-center items-center text-kwhite mt-2 font-[inter]">
                            <p className="type text-2xl font-bold">{pkg.pkg_name} Package</p>
                            {pkg.description.split('\n').map((line, index) => (
                            <p className="desc" key={index}>{line}</p>
                              ))}
                              <br/>
                            <p className="price text-3xl font-semibold">Rs {pkg.price}</p>
                        </div>
                        <div className="buttons flex justify-center gap-9  font-bold">
                                <button onClick={() => { selectPackage("Diamond"); setEditSection(true); handleEdit(pkg) }} className="btn_edit justify-end items-end w-28 h-12 bg-kblue rounded-3xl text-center text-kwhite text-base font-bold  hover:bg-kwhite hover:text-kblack">Edit</button>
                                <button onClick={() => handleDelete(pkg._id)} className="btn_delete w-28 h-12  bg-kred rounded-3xl text-center text-kwhite text-base font-bold  hover:bg-kwhite hover:text-kblack">Delete</button>
                        </div>
                      </div>
                    )
                  }

                })
              ) : (
                <div className="text-kwhite text-2xl flex justify-center">
                <p>No packages available</p>
                </div>
              )
            }  
        </div>

      </div>
      {
          editSection && (

          <div className="flex justify-center items-start mt-3 mb-4 form-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 bg-kgray rounded-xl border-2 border-kyellow">
          <div className="container max-w-2xl h-96 bg-kgray  flex flex-col rounded-xl font-[inter]">

            <form onSubmit={hanldeUpdate} className="flex flex-col mr-4">

            <div>
                <label htmlFor="pkg_category" className="block text-kwhite text-xl font-bold font-[Inter] ml-5 mt-5" >{packageNameLabel} Package</label>
                <input type="hidden" name="package_id" value={formDataEdit._id}/>
            </div>

              <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite">Package Name</label>
                <input className="form-control rounded-md border-2 border-kblack bg-kwhite text-sm w-80 px-1" 
                      type="text"
                      name="pkg_name"
                      onChange={handleEditOnChange}
                      value={formDataEdit.pkg_name}  />
              </div>

              <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite">Package Price</label>
                <input className="form-control rounded-md w-80 px-1 bg-kwhite text-sm" 
                      type="text"
                      name="price"  
                      onChange={handleEditOnChange}
                      value={formDataEdit.price} />
              </div>

              <div className=" mt-3 mb-4 ml-5 flex justify-start gap-4">
                  <label className="form-label text-kwhite">Upload an Image</label>
                  <input className="form-control bg-kwhite rounded-md w-72 text-sm" 
                        name="image" 
                        type="text" 
                        onChange={handleEditOnChange} 
                        /> 
              </div>

              <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite">Description</label>
                <textarea className="form-control rounded-md w-80 text-sm columns-5 px-1" 
                          name="description" 
                          onChange={handleEditOnChange}
                          value={formDataEdit.description} />
              </div>

              <div className=" flex justify-between mt-8 ml-5 mr-5">
                  <button className="btn_submit w-24 h-10  font-normal bg-kyellow text-kwhite  mbflex justify-center items-center rounded-lg" onClick={()=>setEditSection(false)}>Back</button>
                  <button type="submit" className="form-label text-kwhite bg-kyellow  hover:bg-kwhite hover:text-kblack h-10  w-24 rounded-lg">Save Changes</button>
              </div>

            </form>
          </div>
        </div>

          )
        }


    </div>
  )
}

export default MgrBdayParty
