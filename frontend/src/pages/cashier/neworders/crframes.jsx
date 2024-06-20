import React, { useEffect, useState } from "react";
import { Card, Button, CardBody } from "@material-tailwind/react";
import axios from "axios";
import { HiOutlineArrowCircleLeft, } from "react-icons/hi";
import Formtable from './Formtable';
import { MdClose } from 'react-icons/md'
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

axios.defaults.baseURL = "http://localhost:8010"




function AddNewOrder(){

  const [itemsData, setItemsData] = useState([]);
  const [addSection,setAddSection] = useState(false)
  const [editSection,seteditSection] = useState(false) 
  const [dataList,setDataList] = useState([])
  const [addItem,setAddItem] = useState([]);
  const [itemname,setItemname]=useState("");
  const [quantity,setQuantity]=useState("");
  const [unitPrice,setUnitprice]=useState("");
  const [formData,setFormData] = useState({
    name : "",
    quantity :"",
    unitPrice :"",
     
  })
  const [formDataEdit,setFormDataEdit] = useState({
    name : "",
    quantity : "",
    unitPrice : "",
    _id : ""
  })

  //handleonchange
  const handleOnChange = (e)=>{
    const {value,name} = e.target 
    setFormData ((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })
  }

  //handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.quantity || !formData.unitPrice) {
      alert('Please fill in all fields before submitting.');
      return;
    }
  
    try {
      const response = await axios.post('/mainorder/create', formData);
      if (response.data.success) {
        alert(response.data.message);
        setFormData({
          name: '',
          quantity: '',
          unitPrice: '',
        });
        setAddSection(false);
        getFetchData();
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    }
  }; 

    //getfetch data
    const getFetchData = async () => {
      try {
        const response = await axios.get('/mainorder/');
        if (response.data.success) {
          setDataList(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

      useEffect(()=>{
        getFetchData()
      },[])
    
      //handleDelete
      const handleDelete = async (id) => {
        try {
          const response = await axios.delete('/mainorder/delete/' + id);
          if (response.data.success) {
            getFetchData();
          }
        } catch (error) {
          console.error('Error deleting order:', error);
          alert('Failed to delete order. Please try again.');
        }
      };

        //handleUpdate
        const handleUpdate = async (e) => {
          e.preventDefault();
          try {
            const response = await axios.put('/mainorder/update/', formDataEdit);
            if (response.data.success) {
              alert(response.data.message);
              seteditSection(false);
              getFetchData();
            }
          } catch (error) {
            console.error('Error updating order:', error);
            alert('Failed to update order. Please try again.');
          }
        };
         
          //handleEditOnChange
          const handleEditOnChange = async(e)=>{
            const {value,name} = e.target 
            setFormDataEdit((preve)=>{
                return{
                  ...preve,
                  [name] : value
                }
            })
          }

          //handleEdit
          const handleEdit = (el)=>{
            setFormDataEdit(el)
            seteditSection(true)
          }

          //handleaddsection
          const handleaddsection = (item)=>{ 
            setFormData({
              name: item.name,
              quantity: "", // Clear quantity field when adding a new item
              unitPrice: item.sellingPrice
            });
            setAddSection(true);
          }

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
  // Fetch items from backend
const getItems = () => {
  axios.get('/item/')
      .then(response => {
          const items = response.data.data;
          // Filter items based on type "Sublimation"
          const sublimationItems = items.filter(item => item.type === "Frames");
          // Map the filtered items and set the state
          const itemsData = sublimationItems.map(item => ({
              ...item,
              quantity: 0,
              unitPrice: 0
          }));
          setItemsData(itemsData);
      })
      .catch(error => {
          console.error('Error fetching items:', error);
      });
};

//search
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);

useEffect(() => {
    const results = itemsData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
);
setSearchResults(results);
},[searchTerm, itemsData]);

   
    


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
                        <div className=" px-10">
                            <input
                                type="search"
                                placeholder="Search"
                                className="bg-kwhite text-kblack rounded-full p-2 text-lg "
                                value = {searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
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

        <div className="m-1 rounded-lg bg-kwhite bg-opacity-10 text-lg font-bold px-full px-5 py-5 w-3/4">

          <div className="maincards m-1 flex flex-wrap justify-center gap-5">


          <a href='/cashier/addneworder'><div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl  ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">Sublimation </div></a>
            <a href='/cashier/photoprints'><div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl ring-1 ring-slate-900/5 h-full w-100
             transition-transform duration-300 ease-in-out hover:scale-105">Photo Prints</div></a>
            <div class="m-1 rounded-lg bg-kblack text-kwhite px-20 py-5 shadow-xl ring-8 ring-slate-900/5 h-full w-100
             ">Frames</div>
        
        
          </div>  
          <br/>
          
         <hr className='text-kwhite opacity-30'/><br/>        
       <div class="grid grid-cols-4 justify-center gap-5">
          
       
 {/* items read*/}

        
        {itemsData.map(item => (

        <div key={item._id} className="card w-64 h-96 relative cursor-pointer backdrop-blur-md mt-10">
          
        
              <div className="w-64 h-auto bg-kwhite opacity-100 rounded-xl">
                <center>
                <div className="text-white text-center text-2xl font-bold top-64 left-0 right-0">{item.name}</div>
                <img className="rounded-xl" src={require(`../../../../../backend/uploads/StockManagement/${item.image}`)} 
                style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} />
                <div id="unitPrice"
                     name="unitPrice" 
                     className="text=lg ">Rs.{item.sellingPrice}</div>

                 <Button className="bg-kgreen text-kwhite opacity-100 text-lg px-20 py-3 hover:bg-kblack rounded-xl m-1 transition-transform duration-300 ease-in-out hover:scale-105" 
                         type="submit" 
                         onClick={() => handleaddsection(item)} >{"Add Item"}</Button>

                </center>
              </div>
     
        {
          addSection && (
            <div className=" fixed top-20 bottom-20 left-80 right-80 bg-kwhite m-52 text-xl text-center ring-8 ring-kgray rounded-lg shadow-2xl ">
          
            <form onSubmit={handleSubmit}>
            
            <div className='m-10'>
             <div className="close-btn" onClick={()=>setAddSection(false)}><MdClose/></div>
             <br/>
               <label htmlFor="name">Item Name :</label>
               <input className='py-2 bg-kgray bg-opacity-5' type="text" id="name" name="name" onChange={(e)=>setItemname(e.target.value)} value={formData.name} readOnly/>
   
               <label htmlFor="number">Quantity :</label>
               <input className='py-2 bg-kgray bg-opacity-5' type="number" id="quantity" name="quantity" onChange={handleOnChange} />
   
               <label htmlFor="mobile">Unit Price :</label>
               <input className='py-2 bg-kgray bg-opacity-5't type="number" id="unitPrice" name="unitPrice" onChange={handleOnChange} value={formData.unitPrice} readOnly/>
   
               <Button className='m-2 bg-kgreen text-lg text-kwhite' type="submit">Submit</Button>

               </div>
             </form>
            </div>
          )
        }
        {
          editSection && (
            <div className=" fixed top-20 bottom-20 left-80 right-80 bg-kwhite m-52 text-xl text-center backdrop-blur-lg">
          
            <form onSubmit={handleUpdate}>
            
            <div className='m-10'>
             
            <div className="close-btn" onClick={()=>seteditSection(false)}><MdClose/></div>
             <br/>
               <label htmlFor="name">Item Name :</label>
               <input className='py-2 bg-kgray bg-opacity-5' 
                      type="text" 
                      id="name" 
                      name="name" 
                      onChange={handleEditOnChange} value={formDataEdit.name}/>
   
               <label htmlFor="number">Quantity :</label>
               <input className='py-2 bg-kgray bg-opacity-5' 
                      type="number" 
                      id="quantity" 
                      name="quantity" 
                      onChange={handleEditOnChange} value={formDataEdit.quantity}/>
   
               <label htmlFor="mobile">Unit Price :</label>
               <input className='py-2 bg-kgray bg-opacity-5't 
                      type="number" 
                      id="unitPrice" 
                      name="unitPrice" 
                      onChange={handleEditOnChange} 
                      value={formDataEdit.unitPrice}/>
   
               <Button className='m-2 bg-kgreen text-lg' type="submit">Submit</Button>
               </div>
             </form>
             </div>
          )
        }

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
                        <button className='bg-kblue m-2 text-lg px-3 py-2 rounded-md' onClick={()=>handleEdit(el)}><PencilIcon className="h-4 w-4 text-kwhite" /></button>
                      </td>
                      <td><button className='bg-kred m-2 text-lg ring-1 px-3 py-2 rounded-md' onClick={()=>handleDelete(el._id)}>  <TrashIcon className="h-4 w-4 text-kwhite" /></button></td>
                    </tr> 
                  )
                })
              }
            </tbody>
          </table>

      <center><a href="/cashier/checkout">
        <Button className=" bg-kgreen text-kwhite text-3xl rounded-full transition-transform hover:scale-110 hover:bg-kwhite hover:text-kgreen">{"CHECKOUT"}</Button></a></center>
      </div>
      

      </div>
      

    </div>
      
    );
  }
  
  export default AddNewOrder;
  