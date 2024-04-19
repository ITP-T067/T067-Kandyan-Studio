import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Photography from '../../../images/photography.jpg';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8010/";

export default function CustomerCart() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showPayAlert, setShowPayAlert] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(true); 
  const [deleteItemId, setDeleteItemId] = useState(null);

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDeleteClick = (itemId) => {
    setDeleteItemId(itemId);
    setShowDeleteAlert(true);
  };

  const handleSelectAll = () => {
    setSelectedItems(cartItems.map(item => item._id));
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handlePayClick = () => {
    setShowPayAlert(true);
  };

  const getCartItems = () => {
    axios.get('order/on/get/cart')
      .then(response => {
        setCartItems(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  };

  const deleteCartItems = () => {
    axios.delete(`order/on/delete/cart/${deleteItemId}`)
    .then(response => {
      console.log('Item deleted successfully:', response.data);
      getCartItems();
      setShowDeleteAlert(false);
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
  };

  

  useEffect(() => {
    calculateTotalPrice(selectedItems);
  }, [selectedItems]);

  const handleCheckboxChange = (select) => {
    const updatedSelectedItems = selectedItems.includes(select)
      ? selectedItems.filter(item => item !== select)
      : [...selectedItems, select];
    
    setSelectedItems(updatedSelectedItems);
    calculateTotalPrice(updatedSelectedItems);
  };

  const handleQtyChange = (itemId, quantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item._id === itemId) {
        return { ...item, item_Quantity: quantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    calculateTotalPrice(selectedItems);
  };

  const calculateTotalPrice = () => {
  const selectedItemsPrices = cartItems.filter(item => selectedItems.includes(item._id));
  const subtotalPrice = selectedItemsPrices.reduce((acc, curr) => acc + curr.item_Price * curr.item_Quantity, 0);
  
  let totalAmount = subtotalPrice;
  if (selectedItems.length > 0) {
    totalAmount -= 5000; // Apply discount only if at least one item is selected
  }
  
  setSubtotal(subtotalPrice);
  setTotal(totalAmount);
  setIsCheckoutDisabled(selectedItems.length === 0);
};


  return (
    <div>
      <div className={`h-[35rem] bg-kgray bg-opacity-30 rounded-3xl ml-12 mr-12 relative ${showPayAlert ? 'blur' : ''} ${showDeleteAlert ? 'blur' : ''}`}>
        <div className="relative">
          <div className="flex items-center ml-6 pt-5" >
            <svg className="h-11 w-11 mb-3 text-kwhite mr-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={() => navigate('/cusdashboard')}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 8 8 12 12 16" />
              <line x1="16" y1="12" x2="8" y2="12" />
            </svg>
          </div>
          <h2 className="left-[73px] top-5 absolute text-kwhite text-5xl font-bold font-['Inter']">Shopping Cart ({cartItems.length})</h2>
        </div>
        
        <div className="card overflow-y-auto max-h-[400px] max-w-[800px] mt-2">
          {cartItems.map(item => (
            <div className="h-28 bg-kgray rounded-3xl m-4 flex items-center relative" key={item._id}>
              <label>
                <input type="checkbox" className="mr-2 h-4 ml-4" onChange={() => handleCheckboxChange(item._id)} checked={selectedItems.includes(item._id)} />
              </label>
              <img className="ml-8 w-16 h-16 rounded-2xl" src={Photography} alt="item" />
              <div className='text-kwhite ml-10 text-lg'>LKR : {item.item_Price}.00</div>
              <div className='absolute bottom-0 right-1/2 mb-4 mr-4 cursor-pointer'>
                <label className='text-kwhite font-bold'>Qty_</label> 
                <select aria-label="Select quantity" value={item.item_Quantity} onChange={(e) => handleQtyChange(item._id, parseInt(e.target.value))}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <div className='text-kwhite absolute top-0 right-12 mt-4 mr-4'>{item.item_Name}</div>
              <div className='text-kwhite absolute top-0 right-0 mt-4 mr-4 cursor-pointer hover:text-kred' onClick={() => handleDeleteClick(item._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        

        <div className="relative text-kwhite">
          <div className="left-[40px] absolute text-xl font-normal font-['Inter'] cursor-pointer hover:text-kyellow" onClick={handleSelectAll}>Select all items</div>
          <div className="top-0 absolute right-1/2 text-xl font-normal font-['Inter'] cursor-pointer hover:text-kyellow" onClick={handleDeselectAll}>Deselect all items</div>
          <div className="w-6 h-6 left-0 top-0 absolute flex-col justify-start items-start inline-flex" />
        </div>

        <div className="absolute top-0 right-0 h-[28.5rem] w-[34rem] bg-kgray bg-opacity-80 rounded-3xl m-12 mt-16 text-kwhite">
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-5xl font-bold font-['Inter']">Summary</div>
          <div className="m-12 text-2xl">
            <div className="w-[28rem] top-[110px] absolute">
              <div className="absolute font-normal font-['Inter']">Subtotal</div>
              <div className="text-right font-normal font-['Inter']">LKR {subtotal}.00</div>
            </div>
            <div className="w-[28rem] top-[160px] absolute">
                  <div className="absolute font-normal font-['Inter']">Loyalty Discount</div>
                  <div className="text-right font-normal font-['Inter']">
                    {selectedItems.length > 0 ? 'LKR 5,000.00' : 'LKR 0.00'}
                  </div>
            </div>
            <div className="w-[28rem] top-[210px] absolute">
              <div className="absolute font-normal font-['Inter']">Total</div>
              <div className="text-right left-[300px] font-normal font-['Inter']">LKR {total}.00</div>
            </div>
          </div>
          <div>
            <button type="button" className={`text-kwhite bg-kgreen font-bold rounded-xl text-2xl px-36 py-2.5 m-12 mt-64 ${isCheckoutDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-kyellow'}`} onClick={handlePayClick} disabled={isCheckoutDisabled}>Checkout ({selectedItems.length})</button>
          </div>
        </div>
      </div>
      {/* pay alert */}
      {showPayAlert && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 bg-kgray rounded-2xl flex justify-center items-center">
          <div className="bg-white p-8 rounded-3xl">
            <form className="w-full max-w-">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-kwhite  md:text-right mb-1 md:mb-0 pr-4" >
                    Total Amount
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input className="block bg-kwhite rounded-xl w-full py-2 px-4 text-kblack font-bold focus:outline-none" type="number" min={1} required />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-kwhite  md:text-right mb-1 md:mb-0 pr-4">
                    Bank Details:
                  </label>
                </div>
                <div className="md:w-">
                  <label className="block text-kwhite font-bold mb-1 md:mb-0 pr-4 ">
                    Bank Name: Hatton National Bank <br />
                    Account: 801293979384 <br />
                    Branch: Kollupitiya
                  </label>
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-kwhite  md:text-right mb-1 md:mb-0 pr-4">
                    Upload deposit slip
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input className="block bg-kwhite rounded-xl w-full py-2 px-4 text-kblack font-bold focus:outline-none" type="file" required />
                </div>
              </div>
              <button className="block mx-auto bg-kgreen hover:bg-green-600 text-kwhite font-bold py-2 px-4 mt-4 rounded">Pay</button>
            </form>
          </div>
        </div>
      )}

      {/* Delete alert */}
      {showDeleteAlert && (
               <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 bg-kgray rounded-2xl flex justify-center items-center">
               <div className="bg-white p-8 rounded-3xl text-center">
                 <p className="text-3xl font-bold text-kwhite">Do you want to delete?</p>
                 <div className="mt-4">
                   <button className="inline-block bg-kgreen hover:bg-green-600 text-kwhite font-bold py-2 px-4 mr-8 rounded" onClick={deleteCartItems}>Yes</button>
                   <button className="inline-block bg-kred hover:bg-red-600 text-kwhite font-bold py-2 px-4 rounded" onClick={() => setShowDeleteAlert(false)}>No</button>
                 </div>
               </div>
             </div>
             
            )}
    </div>
  );
}
