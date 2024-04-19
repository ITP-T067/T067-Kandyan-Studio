import React, { useEffect, useState } from 'react';
import '../../../Styles/addToCart.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


axios.defaults.baseURL = "http://localhost:8010/"

export default function AddToCart() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();



  const handleOKButtonClick = () => {
    setShowAlert(false);
    navigate('/cusdashboard');
  };

  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const fetchItemDetails = (itemId) => {
    axios.get(`/item/find/${itemId}`)
      .then(response => {
        setItemDetails(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });
  };

  useEffect(() => {
    fetchItemDetails(itemId);
  }, [itemId]);

  if (!itemDetails) {
    return <div className='text-kwhite'>Loading...</div>;
  }

  //add datat addtocart table
  const handleAddToCartClick = (e) => {
    e.preventDefault();

    const dataAdd = {
      Item_ID: itemId,
      item_Name: itemDetails.name,
      item_Price: itemDetails.sellingPrice,
      item_Quantity: parseInt(quantity),
      item_image: itemDetails.image,
    };

    axios.post('order/on/create/cart', dataAdd)
      .then(response => {
        if (response.data.success) {
          setShowAlert(true);
        } else {
          console.error('Error adding to cart:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
      });
  };
  
  

  return (
    <div>
      <div className={`flex justify-center items-center h-screen ${showAlert ? 'blur' : ''}`}>
        <div className="h-[42rem] w-[80rem] bg-kgray bg-opacity-30 rounded-3xl ">
          <div>
            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="mt-4 ml-11">
              <div class="flex items-center ml-14">
                <svg class="h-11 w-11 mb-3 text-kwhite mr-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" onClick={() => navigate('/cusdashboard')} disabled={showAlert}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 8 8 12 12 16" />
                  <line x1="16" y1="12" x2="8" y2="12" />
                </svg>
                <h2 class="text-5xl font-bold text-kwhite mb-2">{itemDetails.name}</h2>
              </div>

                <div className="flex justify-center mx-auto md:mx-0">
                  
                  <div className="flex items-center ml-[12.5rem]">
                    <img src={require(`../../../../../backend/uploads/StockManagement/${itemDetails.image}`)} alt="Centered Image" className="rounded-lg" style={{ width: '250px', height: '250px'}} />
                  </div>
                </div>
              </div>

              <div>
                <div className="py-8 ml-[8rem]">
                  <h2 className="text-5xl font-bold text-kwhite ml-10 mb-2 mt-[2rem]">LKR: {itemDetails.sellingPrice}.00</h2>
                  <div className="flex mb-4">
                    <div className="mr-4">
                      <h2 className="font-bold text-kwhite ml-10 mt-2 max-w-[500px] h-[9rem]">
                      <div class="overflow-y-auto h-[7rem]">
                        <div>{itemDetails.description}</div>
                      </div>
                      </h2>
                    </div>
                  </div>
                  
                 <form onSubmit={handleAddToCartClick}>
                    <div className="mb-4">
                      <label className="text-1xl text-kwhite ml-12">Quantity</label>
                      <input type="number" id="small-input" className="block w-full p-2 pl-5 mb-8 text-kwhite border bg-kgray rounded-3xl max-w-[450px] ml-10 mt-1 placeholder- "  placeholder="Type quantity" disabled={showAlert} min={1} max={itemDetails.quantity} defaultValue={1} required value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                    </div>
                    <div>
                      <div className="font-bold text-kwhite ml-10 dark:text-gray-300 max-w-[500px]">Optional (If you want to add a print to the item, please upload it in here Size: 23*23)</div>
                      <input className="block w-full text-kblack ml-10 mt-4 border-kgray rounded-3xl cursor-pointer dark:text-kblack focus:outline-4 dark:bg-kgray max-w-[450px] dark:border-kblack dark:placeholder-gray-400" id="large_size" type="file" disabled={showAlert}  />
                    </div>
                    <div>
                      <button type="submit" className={`text-kwhite bg-kgreen font-bold rounded-xl text-2xl px-40 py-2.5 mt-6 ml-10 ${showAlert ? 'cursor-not-allowed' : 'hover:bg-kyellow'}`} disabled={showAlert}>Add to cart</button>
                    </div>
                 </form>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-y-auto h-60 max-w-[500px] ml-36 mt-[-16rem]">
            <div className="Rectangle104 max-w-[500px] h-28 bg-kgray rounded-3xl mb-2"/>
            <div className="Rectangle104 max-w-[500px] h-28 bg-kgray rounded-3xl mb-2" />
            <div className="Rectangle104 max-w-[500px] h-28 bg-kgray rounded-3xl mb-2" />
            <div className="Rectangle104 max-w-[500px] h-28 bg-kgray rounded-3xl mb-2" />
            <div className="Rectangle104 max-w-[500px] h-28 bg-kgray rounded-3xl mb-2" />
            <div className="Rectangle104 max-w-[500px] h-28 bg-kgray rounded-3xl mb-2" />
            <div className="Rectangle104 max-w-[500px] h-28 bg-kgray rounded-3xl mb-2" />
            <div className="Rectangle104 max-w-[500px] h-28 bg-kgray rounded-3xl mb-2" />
          </div>
        </div>
      </div>
      {showAlert && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 bg-kgray rounded-2xl flex justify-center items-center">
          <div className="bg-white p-8 rounded-3xl">
            <p className="text-center text-3xl font-bold text-kwhite">Added to cart successfully!</p>
            <button className="block mx-auto bg-kgreen hover:bg-green-600 text-kwhite font-bold py-2 px-4 mt-4 rounded" onClick={handleOKButtonClick}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
