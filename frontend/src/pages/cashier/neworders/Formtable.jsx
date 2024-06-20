import { Button } from '@material-tailwind/react'
import { MdClose } from 'react-icons/md'
import React, { useEffect, useState } from 'react';
import '../../../Styles/addToCart.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8010/";

const Formtable = ({handleSubmit,handleOnChange,handleClose,rest}) =>{

  const [quantity,setQuantity]=useState("");

    return(
<div>
         <div className=" fixed top-20 bottom-20 left-80 right-80 bg-kwhite m-52 text-xl text-center backdrop-blur-lg">
          
           <form onSubmit={handleSubmit}>
           
           <div className='m-10'>
            <div className="close-btn" onClick={handleClose}><MdClose/></div>
            <br/>
              <label htmlFor="name">Item Name :</label>
              <input className='py-2 bg-kgray bg-opacity-5' type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>
  
              <label htmlFor="number">Quantity :</label>
              <input className='py-2 bg-kgray bg-opacity-5' type="number" id="quantity" name="quantity" onChange={(e) => setQuantity(e.target.value)} value={quantity}/>
  
              <label htmlFor="mobile">Unit Price :</label>
              <input className='py-2 bg-kgray bg-opacity-5't type="number" id="unitPrice" name="unitPrice" onChange={handleOnChange} value={rest.sellingPrice}/>
  
              <Button className='m-2 bg-kgreen text-lg' type="submit">Submit</Button>
              </div>
            </form>
            </div>






</div>

    )
}

export default Formtable