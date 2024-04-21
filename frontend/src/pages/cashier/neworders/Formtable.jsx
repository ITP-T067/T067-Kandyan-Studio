import { Button } from '@material-tailwind/react'
import React from 'react'
import { MdClose } from 'react-icons/md'

const Formtable = ({handleSubmit,handleOnChange,handleClose,rest}) =>{
    return(

         <div className="absolute top-20 bottom-20 left-60 right-60 bg-kwhite m-52 ">

           <form onSubmit={handleSubmit}>
           
           <div className='m-10'>
            <div className="close-btn" onClick={handleClose}><MdClose/></div>
            <br/>
              <label htmlFor="name">Item Name :</label>
              <input className='py-2 bg-kgray bg-opacity-5' type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>
  
              <label htmlFor="number">Quantity :</label>
              <input className='py-2 bg-kgray bg-opacity-5' type="number" id="quantity" name="quantity" onChange={handleOnChange} value={rest.quantity}/>
  
              <label htmlFor="mobile">MaxCapacity :</label>
              <input className='py-2 bg-kgray bg-opacity-5't type="number" id="maxCapacity" name="maxCapacity" onChange={handleOnChange} value={rest.maxCapacity}/>
  
              <Button className='m-2 bg-kgreen text-lg' type="submit">Submit</Button>
              </div>
            </form>
          </div>
    )
}

export default Formtable