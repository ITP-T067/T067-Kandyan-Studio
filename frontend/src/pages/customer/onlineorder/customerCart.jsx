import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Photography from '../../../images/photography.jpg';

export default function CustomerCart() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const handleCheckboxChange = (index) => {
    const selectedIndex = selectedItems.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, index]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    }
  };

  const handleSelectAll = () => {
    setSelectedItems([...Array(itemPrices.length).keys()]);
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseInt(value);
    setQuantities(newQuantities);
  };

  const calculateSubtotal = () => {
    let total = 0;
    selectedItems.forEach((index) => {
      total += itemPrices[index] * quantities[index];
    });
    setSubtotal(total);
  };

  const itemPrices = [1500.00, 4500.00, 1250.00, 1000.00];
  const [quantities, setQuantities] = useState(Array(itemPrices.length).fill(1));

  React.useEffect(() => {
    calculateSubtotal();
  }, [selectedItems, quantities]);

  const handleCheckout = () => {
    // Implement your checkout logic here
    navigate('/payorder');
  };

  return (
    <div>
      <div className="h-[35rem] bg-kgray bg-opacity-30 rounded-3xl ml-12 mr-12 relative">
        <div className="relative">
          <div className="flex items-center ml-6 pt-5">
            <svg className="h-11 w-11 mb-3 text-kwhite mr-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={() => navigate('/cusdashboard')}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 8 8 12 12 16" />
              <line x1="16" y1="12" x2="8" y2="12" />
            </svg>
          </div>
          <h2 className="left-[73px] top-5 absolute text-kwhite text-5xl font-bold font-['Inter']">Shopping Cart ({itemPrices.length})</h2>
        </div>

        <div className="overflow-y-auto max-h-[400px] max-w-[800px] mt-2">
          {itemPrices.map((price, index) => (
            <div key={index} className="h-28 bg-kgray rounded-3xl m-4 flex items-center relative">
              <label>
                <input 
                  type="checkbox" 
                  className="mr-2 h-4 ml-4"
                  checked={selectedItems.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
              </label>
              <img className="ml-8 w-16 h-16 rounded-2xl" src={Photography} />
              <div className='text-kwhite ml-10 text-lg'>LKR {price.toFixed(2)}</div>
              <div className='absolute bottom-0 right-1/2 mb-4 mr-4 cursor-pointer'>
                <label className='text-kwhite font-bold'>Qty_</label> 
                <select aria-label="Select quantity" value={quantities[index]} onChange={(e) => handleQuantityChange(index, e.target.value)}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <div className='text-kwhite absolute top-0 right-12 mt-4 mr-4'>Mug printing in a fantasy theme </div>
              <div className='text-kwhite absolute top-0 right-0 mt-4 mr-4 cursor-pointer hover:text-kred'>
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
              <div className="text-right font-normal font-['Inter']">LKR {subtotal.toFixed(2)}</div>
            </div>
            <div className="w-[28rem] top-[160px] absolute">
              <div className="absolute font-normal font-['Inter']">Loyalty Discount</div>
              <div className="text-right font-normal font-['Inter']">LKR 5,000.00</div>
            </div>
            <div className="w-[28rem] top-[210px] absolute">
              <div className="absolute font-normal font-['Inter']">Total</div>
              <div className="text-right left-[300px] font-normal font-['Inter']">LKR {subtotal.toFixed(2)}</div>
            </div>
          </div>
          <div>
            <button type="button" className="text-kwhite bg-kgreen hover:bg-kyellow font-bold rounded-xl text-2xl px-36 py-2.5 m-12 mt-64" onClick={handleCheckout}>Checkout ({selectedItems.length})</button>
          </div>
        </div>
      </div>
    </div>
  );
}
