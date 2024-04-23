import React, { useEffect, useState } from "react";
import { Card, Button, CardBody } from "@material-tailwind/react";
import axios from "axios";
import { HiOutlineArrowCircleLeft, } from "react-icons/hi";
import Formtable from './neworders/Formtable';


axios.defaults.baseURL = "http://localhost:8010"

function AddNewOrder(){


    //Search Item
  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);

  // useEffect(() => {
  //     const results = dataList.filter((item) =>
  //         item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // setSearchResults(results);
  // },[searchTerm, dataList]);


  const [itemsData, setItemsData] = useState([]);
 

  const GoBack = () => {
    window.location.href = "/cashier/ordermain";
  };

  const handleButton = (type) => {
  return () => {   
      switch (type) {
          case "studio":
              window.location.href = "/cashier/addnewstudio";
              break;
          default:
              break;
      }
  };
  };

  useEffect(() => {
    getItems();
   }, []);
   
  const getItems = () => {
    axios.get('/item/')
       .then(response => {
         const items = response.data.data;
         const itemsData = items.map(item => ({
           ...item,
           quantity: 0, // Initialize quantity for each item
         }));
         setItemsData(itemsData);
       })
       .catch(error => {
         console.error('Error fetching items:', error);
       });
  };
   

/*end new */

const [formData,setFormData] = useState({
  name : "",
  quantity : "",
  unitPrice : "",
   
})

const handleOnChange = (e)=>{
  const {value,name} = e.target 
  setFormData ((preve)=>{
      return{
        ...preve,
        [name] : value
      }
  })
}

const [addSection,setAddSection] = useState(false)
const [editSection,seteditSection] = useState(false) 
const [isAlert, setIsAlert] = useState(false);
const [alertStatus, setAlertStatus] = useState('succesßs');
const [message, setMessage] = useState('');

const handleSubmit = async(e)=>{
  e.preventDefault()

      const data = await axios.post("/mainorder/create/", formData);
      console.log(formData)
        if(data.data.success){
          setAddSection(false)
          alert(data.data.message)
          getFetchData()
          setFormData({
            name :"",
            quantity :"",
            unitPrice : ""
          })
          getFetchData()
        }
} 


const [formDataEdit,setFormDataEdit] = useState({
  name : "",
  quantity : "",
  unitPrice : "",
  _id : ""
})

const [dataList,setDataList] = useState([])


const getFetchData = async()=>{
  const data = await axios.get("/mainorder/")
    if(data.data.success){     
      setDataList(data.data.data)
    }
}
   
useEffect(()=>{
  getFetchData()
},[])

const handleDelete = async(id)=>{
  const data = await axios.delete("/mainorder/delete/"+id)
    if(data.data.success){
      getFetchData()
    
    }
  }

const handleUpdate = async(e)=>{ 
  e.preventDefault()
  const data = await axios.put("/mainorder/update/",formDataEdit)
  if(data.data.success){
    getFetchData()
    alert(data.data.message)
    seteditSection(false)
  }
} 

const handleEditOnChange = async(e)=>{
  const {value,name} = e.target 
  setFormDataEdit((preve)=>{
      return{
        ...preve,
        [name] : value
      }
  })
}

const handleEdit = (el)=>{
  setFormDataEdit(el)
  seteditSection(true)
}

/*start new new */


    return (
      <div className='mainclass'>
        
      <div className="mx-5 mb-5">
                <Card>
                    <CardBody className="flex items-center justify-between text-2xl">
                        <div>
                            <Button
                                onClick={GoBack}
                                className="flex items-center space-x-2 bg-transparent text-kwhite px-3 py-2 rounded-md"
                            >
                                <HiOutlineArrowCircleLeft className="w-5 h-5" />
                                <span className="text-sm">Order</span>
                            </Button>
                        </div>
                        
                        {/* <div className=" px-10">
                            <input
                                type="search"
                                placeholder="Search"
                                className="bg-kwhite text-kblack rounded-full p-2 text-lg "
                                value = {searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div> */}
                        
                        <div className='flex flex-row'>
                            <Button
                                className="flex items-center space-x-2 bg-kblack text-kwhite p-3 px-5 rounded-full ">
                                <span className="text-sm">Creator</span>
                            </Button>
                            <Button
                                className="flex items-center space-x-2 bg-kwhite text-kblack p-3 px-5 rounded-full hover:bg-kgray hover:text-kwhite"
                                onClick={handleButton("studio")}
                            >
                                
                                <span className="text-sm">Studio</span>
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>  

      {/* sub navbar*/}
      <div className="flex flex-row ">

        <div className="m-1 rounded-lg bg-kwhite bg-opacity-10 px-full px-5 py-5 w-3/4">

          <div className="maincards m-1 flex flex-wrap justify-center gap-5">


            <div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl  ring-8 ring-slate-900/5 h-full w-100 ">Sublimation </div>
            <a href='/cashier/photoprints'><div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl ring-1 ring-slate-900/5 h-full w-100
             transition-transform duration-300 ease-in-out hover:scale-105">Photo Prints</div></a>
            <a href='/cashier/laminates'><div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl ring-1 ring-slate-900/5 h-full w-100 
            transition-transform duration-300 ease-in-out hover:scale-105">Laminates</div></a>
            <a href='/cashier/frames'><div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl ring-1 ring-slate-900/5 h-full w-100
             transition-transform duration-300 ease-in-out hover:scale-105">Frames</div></a>
        
        
          </div>  
          <br/>
          
         <hr className='text-kwhite opacity-30'/><br/>        

        <div class="flex flex-wrap justify-center gap-5 mt-5">
          
       

        {itemsData.map(item => (
        <div key={item._id} className="card w-64 h-96 relative cursor-pointer">
            
            <form onSubmit={handleSubmit}>
              <div className="w-64 h-auto bg-kwhite opacity-100 rounded-xl">
                <center>
                <div className="text-white text-center text-2xl font-bold top-64 left-0 right-0" value={item.name} id="name" name="name"
                 onChange={(handleOnChange)}>{item.name}</div>
                  <img className="rounded-xl" src={require(`../../../../backend/uploads/StockManagement/${item.image}`)} 
                  style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} />
                  <Button className="bg-kgreen text-kwhite opacity-100 text-lg px-20 py-3 hover:bg-kblack rounded-xl m-1 
                  transition-transform duration-300 ease-in-out hover:scale-105" type="submit" onClick={()=>setAddSection(true)} >{"Add"}</Button>
                </center>
              </div>
            </form>
        </div>
        ))}

        </div>

        </div>

         {/* payment  and table of added items*/}
        <div className=" m-1  rounded-lg bg-kblack w-1/4 text-kwhite ">
          <h2 className="font-extrabold text-center text-2xl text-opacity-70 m-4">Item List</h2>
        
        <table className="m-5 text-lg">
            
            <thead>
              <tr className="text-kblack bg-kwhite">
                <th className="w-3/12">Name</th>
                <th className="w-3/12">Qty</th>
                <th className="w-3/12">Unit Price</th>
                <th className="w-2/12"></th>
                <th className="w-2/12"></th>
              </tr>
            </thead>
            <tbody className=" bg-kgray bg-opacity-30 rounded-lg text-center"> 
              {
                dataList.map((el)=>{
                  return(
                  <tr >
                      <td className="m-1">{el.name}</td>
                      <td>{el.quantity}</td>
                      <td>{el.unitPrice}</td>
                      <td>
                        <button className='bg-kblue m-2 text-lg px-3 py-2 rounded-md' onClick={()=>handleEdit(el)}>E</button>
                      </td>
                      <td><button className='bg-kred m-2 text-lg ring-1 px-3 py-2 rounded-md' onClick={()=>handleDelete(el._id)}>D</button></td>
                    </tr> 
                  )
                })
              }
            </tbody>
          </table>

      <center><a href="/cashier/checkout">
        <Button className="bg-kgreen text-kwhite text-3xl rounded-full transition-transform hover:scale-110 hover:bg-kwhite hover:text-kgreen">{"Place Order"}</Button></a></center>
      </div>

      </div>
      <div className="container ">
    

        {
          addSection && (
            <Formtable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleClose={()=>setAddSection(false)}
            rest={formData}
            
            
            />
          )
        }
         {
          editSection && (
            <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleClose={()=>seteditSection(false)}
            rest={formDataEdit}
            />
          )
        }
        
        
        </div>
      </div>
      
    );
  }
  
  export default AddNewOrder;
  