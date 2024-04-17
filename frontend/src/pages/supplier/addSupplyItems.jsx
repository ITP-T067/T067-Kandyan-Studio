import React, { useEffect, useState } from "react";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8010/";


function handleItemChange() {
  const itemSelect = document.getElementById('itemSelect');
  const currentSellingPrice = document.getElementById('currentSellingPrice');

  const item = itemSelect.value;
  let price = 0;

  switch (item) {
    case 'Item1':
      price = 500.00; // Random price for Item 1
      break;
    case 'Item2':
      price = 450.00; // Random price for Item 2
      break;
    case 'Item3':
      price = 400.00; // Random price for Item 3
      break;
    default:
      price = 0;
      break;
  }

  currentSellingPrice.textContent = `LKR${price.toFixed(2)}`;
}

const AddSupply = () => {
  return (
    <>
    <div className="PageContainer text-kwhite" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="AddSupplyItemsForm" style={{ width: 500, position: 'relative', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <div className="FormItem">
          <label htmlFor="itemSelect" style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Item:</label>
          <select id="itemSelect" className="ItemSelect text-kblack" style={{ width: '100%', height: '40px', fontSize: '16px' }} onChange={handleItemChange}>
            <option value="Item1">Item 1</option>
            <option value="Item2">Item 2</option>
            <option value="Item3">Item 3</option>
          </select>
        </div>

        <div className="FormItem">
          <label htmlFor="currentSellingPrice" style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Current Selling Price:</label>
          <div id="currentSellingPrice" style={{ fontSize: '16px' }}>LKR0.00</div>
        </div>

        <div className="FormItem">
          <label htmlFor="supplyCostInput" style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Supply Cost (Per Unit):</label>
          <input type="text" id="supplyCostInput" className="SupplyCostInput bg-kwhite text-kblack" style={{ width: '100%', height: '40px', fontSize: '16px' }} />
        </div>
        <div className="NoteLabel" style={{ marginTop: '20px', fontSize: '15px', color: 'gray' }}>(Note: Supply cost can’t exceed the current selling price)</div>

        <div className="FormItem">
          <label htmlFor="discountInput" style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Discount:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="text" id="discountInput" className="DiscountInput bg-kwhite text-kblack" style={{ width: 'calc(100% - 20px)', height: '40px', fontSize: '16px', marginRight: '10px' }} />
            <span style={{ fontSize: '16px' }}>%</span>
          </div>
        </div>

        

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <button className="SubmitButton" style={{ width: '150px', height: '40px', background: '#BB0A21', borderRadius: '5px', color: 'white', fontSize: '16px', fontWeight: 'bold', marginRight: '10px' }}>Submit</button>
          <button className="CancelButton" style={{ width: '150px', height: '40px', background: 'lightgray', borderRadius: '5px', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>Cancel</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default AddSupply;
