import React, { useEffect, useState } from "react";
import { Card, Button, CardBody } from "@material-tailwind/react";
import axios from "axios";
import { HiOutlineArrowCircleLeft, } from "react-icons/hi";
import Formtable from './neworders/Formtable';
import { MdClose } from 'react-icons/md'

axios.defaults.baseURL = "http://localhost:8010"

function AddNewOrder(){

// State variables
  const [itemsData, setItemsData] = useState([]);
  const [addSection,setAddSection] = useState(false)
  const [editSection,seteditSection] = useState(false) 
  const [dataList,setDataList] = useState([])

  const [addItem,setAddItem] = useState([]);
  const [itemname,setItemname]=useState("");
  const [quantity,setQuantity]=useState("");
  const [unitprice,setUnitprice]=useState("");


// Go back to previous page
  const GoBack = () => {
    window.location.href = "/cashier/ordermain";
  };

  // Handle button click
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

  // Fetch items from backend
  useEffect(() => {
    getItems();
   }, []);
   
   // Fetch items from backend
  const getItems = () => {
    axios.get('/item/')
       .then(response => {
         const items = response.data.data;
         const itemsData = items.map(item => ({
           ...item,
           quantity:0,
           unitPrice:0
           , // Initialize quantity for each item
         }));
         setItemsData(itemsData);
       })
       .catch(error => {
         console.error('Error fetching items:', error);
       });
  };
   


//form data
const [formData,setFormData] = useState({
  name : "",
  quantity : "",
  unitPrice : "",
   
})
//handleon change
const handleOnChange = (e)=>{
  const {value,name} = e.target 
  setFormData ((preve)=>{
      return{
        ...preve,
        [name] : value
      }
  })
}



//submit
// const handleSubmit = async (e) => {

//   e.preventDefault();

//   try {
//     console.log("Submitting form data:", formData); // Debug line: Log form data before submitting

//     const data = await axios.post("/mainorder/create/", {
//       name: itemname,
//       quantity: quantity,
//       unitPrice: unitprice
//     },formData);

//     console.log("Response from backend:", data); // Debug line: Log response from backend

//     if (data.data.success) {
//       setAddSection(false);
//       alert(data.data.message);
//       getFetchData();
//       setFormData({
//         name :"",
//         email : "",
//         mobile : ""
//       })
//       getFetchData()
//     }

//   } catch (error) {
//     console.log("Error submitting form:", error); // Debug line: Log any errors that occur during submission
//   }
// }

//new submit 
const handleSubmit = async(e)=>{
  e.preventDefault()

  try {
    const data = await axios.post("/mainorder/create",formData)
  console.log(formData)
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
      getFetchData()
      setFormData({
        name :"",
        email : "",
        mobile : ""
      })
      getFetchData();
    }
  } catch (error) {
    console.log("Error submitting form:", error)
  }
  
    }
   
 

//edit
const [formDataEdit,setFormDataEdit] = useState({
  name : "",
  quantity : "",
  unitPrice : "",
  _id : ""
})

//fetch data
const getFetchData = async()=>{
  const data = await axios.get("/mainorder/")
    if(data.data.success){     
      setDataList(data.data.data)
    }
}
   
//use effect to get fetch data
useEffect(()=>{
  getFetchData()
},[])

//delete
const handleDelete = async(id)=>{
  const data = await axios.delete("/mainorder/delete/"+id)
    if(data.data.success){
      getFetchData()
    
    }
  }

//update
const handleUpdate = async(e)=>{ 
  e.preventDefault()
  const data = await axios.put("/mainorder/update/",formDataEdit)
  if(data.data.success){
    getFetchData()
    alert(data.data.message)
    seteditSection(false)
  }
} 

//edit on change
const handleEditOnChange = async(e)=>{
  const {value,name} = e.target 
  setFormDataEdit((preve)=>{
      return{
        ...preve,
        [name] : value
      }
  })
}
//edit 
const handleEdit = (el)=>{
  setFormDataEdit(el)
  seteditSection(true)
}



//add section
const handleaddsection = (item)=>{ 
    setAddItem(item);
    setAddSection(true);
  }


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

        <div class="grid grid-cols-4 justify-center gap-5">
          
       
 {/* items read*/}
        {itemsData.map(item => (

        <div key={item._id} className="card w-64 h-96 relative cursor-pointer backdrop-blur-md mt-10">
          
            {/* <form> */}
              <div className="w-64 h-auto bg-kwhite opacity-100 rounded-xl">
                <center>
                <div className="text-white text-center text-2xl font-bold top-64 left-0 right-0" value={item.name} id="name" name="name"
                 onChange={(handleOnChange)}>{item.name}</div>
                  <img className="rounded-xl" src={require(`../../../../backend/uploads/StockManagement/${item.image}`)} 
                  style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} />
                  <div id="unitPrice" name="unitPrice" className="text=lg ">Rs.{item.sellingPrice}</div>
                 <Button className="bg-kgreen text-kwhite opacity-100 text-lg px-20 py-3 hover:bg-kblack rounded-xl m-1 
                  transition-transform duration-300 ease-in-out hover:scale-105" type="submit" onClick={() => handleaddsection(item)} >{"Add"}</Button>
                </center>
              </div>
            {/* </form> */}
{/* newnew */}
{
          addSection && (
            <div className=" fixed top-20 bottom-20 left-80 right-80 bg-kwhite m-52 text-xl text-center backdrop-blur">
          
            <form onSubmit={handleSubmit}>
            
            <div className='m-10'>
             <div className="close-btn" onClick={()=>setAddSection(false)}><MdClose/></div>
             <br/>
               <label htmlFor="name">Item Name :</label>
               <input className='py-2 bg-kgray bg-opacity-5' type="text" id="name" name="name" onChange={handleOnChange} value={item.name}/>
   
               <label htmlFor="number">Quantity :</label>
               <input className='py-2 bg-kgray bg-opacity-5' type="number" id="quantity" name="quantity" onChange={(e) => setQuantity(e.target.value)} />
   
               <label htmlFor="mobile">Unit Price :</label>
               <input className='py-2 bg-kgray bg-opacity-5't type="number" id="unitPrice" name="unitPrice" onChange={handleOnChange} value={item.sellingPrice}/>
   
               <Button className='m-2 bg-kgreen text-lg text-kwhite' type="submit">Submit</Button>

               </div>
             </form>
             </div>
          )
        }
        {
          editSection && (
            <div className=" fixed top-20 bottom-20 left-80 right-80 bg-kwhite m-52 text-xl text-center backdrop-blur-lg">
          
            <form onSubmit={handleSubmit}>
            
            <div className='m-10'>
             
            <div className="close-btn" onClick={()=>seteditSection(false)}><MdClose/></div>
             <br/>
               <label htmlFor="name">Item Name :</label>
               <input className='py-2 bg-kgray bg-opacity-5' type="text" id="name" name="name" onChange={(e)=>setItemname(e.target.value)} value={addItem.name}/>
   
               <label htmlFor="number">Quantity :</label>
               <input className='py-2 bg-kgray bg-opacity-5' type="number" id="quantity" name="quantity" onChange={(e) => setQuantity(e.target.value)} value={quantity}/>
   
               <label htmlFor="mobile">Unit Price :</label>
               <input className='py-2 bg-kgray bg-opacity-5't type="number" id="unitPrice" name="unitPrice" onChange={(e)=>setUnitprice(e.target.value)} value={addItem.sellingPrice}/>
   
               <Button className='m-2 bg-kgreen text-lg' type="submit">Submit</Button>
               </div>
             </form>
             </div>
          )
        }

{/* newnewwnew */}

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
        <Button className=" bg-kgreen text-kwhite text-3xl rounded-full transition-transform hover:scale-110 hover:bg-kwhite hover:text-kgreen">{"Place Order"}</Button></a></center>
      </div>
      

      </div>
      <div className="container ">
    
       {/*adsection */}
        {/* {
          addSection && (
            <div className=" fixed top-20 bottom-20 left-80 right-80 bg-kwhite m-52 text-xl text-center backdrop-blur">
          
            <form onSubmit={handleSubmit}>
            
            <div className='m-10'>
             <div className="close-btn" onClick={()=>setAddSection(false)}><MdClose/></div>
             <br/>
               <label htmlFor="name">Item Name :</label>
               <input className='py-2 bg-kgray bg-opacity-5' type="text" id="name" name="name" onChange={handleOnChange} value={addItem.name}/>
   
               <label htmlFor="number">Quantity :</label>
               <input className='py-2 bg-kgray bg-opacity-5' type="number" id="quantity" name="quantity" onChange={(e) => setQuantity(e.target.value)} value={quantity}/>
   
               <label htmlFor="mobile">Unit Price :</label>
               <input className='py-2 bg-kgray bg-opacity-5't type="number" id="unitPrice" name="unitPrice" onChange={handleOnChange} value={addItem.sellingPrice}/>
   
               <Button className='m-2 bg-kgreen text-lg text-kwhite' type="submit">Submit</Button>

               </div>
             </form>
             </div>
          )
        } */}
         {/* {
          editSection && (
            <div className=" fixed top-20 bottom-20 left-80 right-80 bg-kwhite m-52 text-xl text-center backdrop-blur-lg">
          
            <form onSubmit={handleSubmit}>
            
            <div className='m-10'>
             
            <div className="close-btn" onClick={()=>seteditSection(false)}><MdClose/></div>
             <br/>
               <label htmlFor="name">Item Name :</label>
               <input className='py-2 bg-kgray bg-opacity-5' type="text" id="name" name="name" onChange={(e)=>setItemname(e.target.value)} value={addItem.name}/>
   
               <label htmlFor="number">Quantity :</label>
               <input className='py-2 bg-kgray bg-opacity-5' type="number" id="quantity" name="quantity" onChange={(e) => setQuantity(e.target.value)} value={quantity}/>
   
               <label htmlFor="mobile">Unit Price :</label>
               <input className='py-2 bg-kgray bg-opacity-5't type="number" id="unitPrice" name="unitPrice" onChange={(e)=>setUnitprice(e.target.value)} value={addItem.sellingPrice}/>
   
               <Button className='m-2 bg-kgreen text-lg' type="submit">Submit</Button>
               </div>
             </form>
             </div>
          )
        } */}
        
        
        </div>

      </div>
      
    );
  }
  
  export default AddNewOrder;
  