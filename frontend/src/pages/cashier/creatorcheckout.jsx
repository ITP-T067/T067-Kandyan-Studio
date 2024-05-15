import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, alert } from "@material-tailwind/react";
import { useReactToPrint } from "react-to-print";
import { useParams, useNavigate,Link } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8010";

function Checkout() {

const [editSection,seteditSection] = useState(false) 
const [filteredOrder, setFilteredOrder] = useState(null);

//creator part

const { orderId } = useParams();
const navigate = useNavigate();


const [dataList1, setDataList1] = useState([]);

const getFetchData1 = async () => {
  try {
      const response = await axios.get("/order/off/");
      console.log(response);
      if (response.data.success) {
      setDataList1(response.data.data);
      }
  } catch (error) {
      console.error("Error fetching data:", error);
  }
};
  
useEffect(() => {
  getFetchData1();
  console.log(dataList1);
}, []);

useEffect(() => {
  if (dataList1.length > 0) {
    const order = dataList1.find(item => item._id === orderId);
    setFilteredOrder(order);
  }
}, [dataList1, orderId]);

//creator part ends

 const calcTotal = (qty, price) => {
    return qty * price;
 };

 const calcChange = (tendered, total) => {
  if(tendered-total < 0){
    return 0;
  }else{
    return tendered-total;
  
  }
 };

 const calcFinalTotal = (data) => {
    let total = 0;
    data.forEach((el) => {
      total += calcTotal(el.quantity, el.unitPrice);
    });
    return total;
 };

 const [total, setTotal] = useState(0);
 const [tendered, setTendered] = useState(0); // Changed from array to number
 const [change, setChange] = useState(0); // Changed from array to number
 const [discount, setDiscount] = useState(0); // Changed from array to number
 const [nettotal, setNettotal] = useState(0); // Changed from array to number
 const [Status, setStatus] = useState(""); // Changed from array to string
 const [ordertype, setOrdertype] = useState(""); // Changed from array to string
 const [dataList, setDataList] = useState([]);

 const getFetchData = async () => {
    const data = await axios.get("/mainorder/");
    if (data.data.success) {
      setDataList(data.data.data);
    }
 };

 useEffect(() => {
    getFetchData();
    setTotal(calcFinalTotal(dataList));
    setOrdertype("Completed");
 }, [dataList]);

 useEffect(() => {
  const calculatedChange = calcChange(tendered, nettotal);
  setChange(calculatedChange);
 }, [nettotal, tendered]);

 const handleOnChange = (e) => {
  const { value, name } = e.target;
  
  if (name === "tendered") {
     setTendered(parseFloat(value));
  } else if (name === "discount") {
     const grossTotal = parseFloat(total) + parseFloat(formData.editCost || 0);
     const discountValue = parseFloat(value) * grossTotal/100;
     const netTotal = grossTotal - discountValue;
     setDiscount(discountValue);
     setNettotal(netTotal);
  } else {
     setFormData((prev) => ({
       ...prev,
       grosstotal:total,
        nettotal:nettotal,
        tendered:tendered,
        change:change,
        discount:discount,
        ordertype:ordertype,
       [name]: value,
     }));
  }
};



const handleSubmit = async (e) => {
 e.preventDefault();

 // Calculate net total, discount, change, and tendered based on current form data
 const grossTotal = parseFloat(formData.grosstotal)+ parseFloat(formData.editCost || 0);
 const discountValue = parseFloat(formData.discount) * grossTotal / 100;
 const netTotal = grossTotal - discountValue;
 const changeValue = parseFloat(formData.tendered) - netTotal;

 // Update formData with calculated values
 const updatedFormData = {
    ...formData,
    nettotal: netTotal,
    discount: discountValue,
    change: changeValue,
 };

 try {
    console.log("Submitting form data:", updatedFormData);

    const data = await axios.post("/placeorder/create/", updatedFormData);

    console.log("Response from backend:", data);

    if (data.data.success) {
      alert(data.data.message);
      getFetchData();
    }
 } catch (error) {
    console.log("Error submitting form:", error);
 }
};


 const componentPDF = useRef();
 const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
 });

 const [formData,setFormData] = useState({
  cusname : "",
  telephone : 0,
  email : "",
  grosstotal : 0,
  tendered:0,
  change:0,
  discount:0,
  nettotal:0
})

const Additem = () => {
  window.location.href = "/cashier/crsublimation/:orderId";
};

const handlecancelorder = () => {
  window.location.href = "/cashier/ordermain";
};

  {/**return function Start */}
    return (


        <div className="main bg-kblack bg-opacity-50 text-kwhite top" >
        <form classname="lg:mt-12" onSubmit={handleSubmit}>
            <div class=" mx-auto w-full">
              <div class="grid lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 max-lg:order-1 p-6 max-w-4xl mx-auto w-full">
                  <div class="text-center max-lg:hidden">
                    <h2 class="text-3xl font-extrabold  inline-block border-b-4 border-[#333] pb-1">Checkout</h2>
                  </div>

                  {filteredOrder ? (
                      
                 
                   
           <>
              <div>
              <h2 class="text-3xl font-extrabold text-kwhite">Customer Info</h2>
              <div class="grid grid-cols-4 gap-6 mt-8 text-lg">
                <h1 className="text-xl m-2">Customer Name :</h1>
                                        <input type="text" 
                                               id="cusname" 
                                               name="cusname"
                                               className="ring-1 bg-kgray col-span-3 py-3 rounded-md"
                                               value={filteredOrder?.Cus_Name || ""}
                                               onChange={handleOnChange} required />
                                        <h1 className="text-xl m-2">Telephone:</h1>
                                        <input type="tel" 
                                               placeholder="Telephone" 
                                               id="telephone" 
                                               name="telephone"
                                               className="ring-1 bg-kgray col-span-3 py-3 rounded-md" 
                                               value={filteredOrder?.Phone_Number || ""}
                                               onChange={handleOnChange} required />
                                        <h1 className="text-xl m-2">Email Address:</h1>
                                        <input type="email" 
                                               placeholder="Email address" 
                                               id="email" 
                                               name="email"
                                               className="ring-1 bg-kgray col-span-3 py-3 rounded-md" 
                                               title="Enter a valid email address (e.g., user@example.com)" 
                                               pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
                                               onChange={handleOnChange} required />
                                  </div>
            </div>
            <div class="mt-12">
              
              <div class="grid gap-6 mt-8">
                 <div class="flex bg-white border-b-2 focus-within:border-[#333] overflow-hidden"></div>
            </div><br/>

            </div>
            <h2 class=" col-span-4 text-3xl font-extrabold text-kwhite">Creator info</h2><br/><br/>
            {/* creator info section */}
            <div className="grid grid-cols-4">
            
            <h1 className=" col-span-1 text-xl m-2">Edit Cost:</h1>
            <input type="tel" 
                        placeholder="Edits" 
                        id="Edits" 
                        name="Edits"
                        class=" col-span-3 bg-kgray ring-1 py-3 rounded-md " 
                        value = {filteredOrder?.Artwork_Price || 0}
                        onChange={handleOnChange} />

            <Link to={`/cashier/crsublimation/${filteredOrder._id}`}>
                     <button
                             class=" col-span-4 px-6 py-3.5 text-lg bg-kred hover:bg-opacity-50 transition-transform rounded-full" 
                             >Add Item</button></Link>
            </div>

            <div class="grid gap-2 mt-8">
                 <div class="flex bg-white border-b-2 focus-within:border-[#333] overflow-hidden"></div>
            </div><br/>
            </>
                  ) : (
                <p>No data available</p>
              )
}

            {/* order summery section */}
          </div>
          <div class="bg-gray-100 lg:h-screen lg:sticky lg:top-0  ring-kwhite ring-opacity-45">
            <div class="relative h-full">
             <div ref={componentPDF}> 
              <div class="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">

                <div className="grid grid-cols-3">
                    <h2 class="text-2xl font-extrabold col-span-2 text-center">Order Summary</h2>
                   
                </div>

     <div className=" m-1  rounded-lg bg-kblack  text-kwhite ">
     
        <table className="m-5 text-lg justify-items-center">
            
            <thead>
              <tr className="bg-kwhite text-kblack">
                <th className="w-1/4">Name</th>
                <th className="w-1/4">Qty</th>
                <th className="w-1/4">Unit Price</th>
                <th className="w-1/4">Total</th>
              </tr>
            </thead>
            <tbody className=" bg-kgray bg-opacity-30 rounded-lg text-xl text-center"> 
              {
                dataList.map((el)=>{

                  const total = calcTotal(el.quantity, el.unitPrice);
                  
                  return(
                  <tr>
                      <td>{el.name}</td>
                      <td>{el.quantity}</td>
                      <td>{el.unitPrice}</td>
                      <td>{total}</td>
                    
                  </tr> 
                  )
                })
              }
            </tbody>
          </table>
            
                </div>
                    <div className="grid grid-cols-3 grid-rows-5 gap-4">
                    <h1 className="text-2xl">Gross Total :</h1>
                    <input className="ring-1 col-span-2 ring-kwhite bg-kgray ring-opacity-10 px-6 py-2 rounded-xl" 
                          type="number" id="grosstotal" 
                          name="grosstotal" value={total} 
                          onChange={(e)=>setTotal(e.target.value) } 
                          readOnly ></input>
                    <h1 className="text-2xl">Discount  :</h1>
                    <input className="ring-1 col-span-2 ring-kwhite bg-kgray  ring-opacity-10 px-6 py-2 rounded-xl" 
                            type="number" id="discount" 
                            name="discount"  
                            onChange={handleOnChange} ></input>
                    <h1 className="text-2xl">Net total  :</h1>
                    <input className="ring-1 col-span-2 ring-kwhite bg-kgray  ring-opacity-10 px-6 py-2 rounded-xl" 
                            type="number" 
                            id="nettotal" 
                            name="nettotal" 
                            value={nettotal} 
                            readOnly></input>
                    <h1 className="text-2xl">Tendered :</h1>
                    <input
                          className="ring-1 col-span-2 ring-kwhite bg-kgray  ring-opacity-10 px-6 py-2 rounded-xl"
                          type="number"
                          id="tendered"
                          name="tendered"
                          value={tendered}
                          onChange={handleOnChange}
                        ></input>
                    <h1 className="text-2xl">Change  :</h1>
                    <input className="ring-1 col-span-2 ring-kwhite bg-kgray  ring-opacity-10 px-6 py-2 rounded-xl" 
                            type="number" 
                            id="change" 
                            name="change" 
                            value={change} 
                            readOnly/>
                    
                 
<Button className="bg-kgreen m-5 text-kwhite text-2xl text-center col-span-3 hover:scale-105 transition-transform hover:bg-kwhite hover:text-kgreen disabled:bg-opacity-20" 
                            type="submit" 
                            onClick={()=>setOrdertype("Completed")} >{"Confirm Payment"}</Button>
                  
                      </div>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
              
    
     </div>

        );
    }
    
    export default Checkout;
    