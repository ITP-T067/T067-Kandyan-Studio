import React, { useState } from 'react';
import '../../../Styles/addToCart.css';
import { useNavigate } from 'react-router-dom';
import DigitalPrinting from '../../../images/DigitialPrinting.jpg';
import Photography from '../../../images/photography.jpg';

export default function AddToCart() {
  const [mainImage, setMainImage] = useState(Photography);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleAddToCartClick = () => {
    setShowAlert(true);
  };

  const handleSmallImageClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  const handleOKButtonClick = () => {
    setShowAlert(false);
    navigate('/cusdashboard');
  };

  return (
    <div>
      <div className={`container ${showAlert ? 'blur' : ''}`}>
        <div className="h-[45rem] bg-kgray bg-opacity-30 rounded-3xl ml-8 mr-8">
          <div>
            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="mt-4 ml-11">
              <div class="flex items-center ml-14 cursor-pointer" onClick={() => navigate('/cusdashboard')}>
                <svg class="h-11 w-11 mb-3 text-kwhite mr-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 8 8 12 12 16" />
                  <line x1="16" y1="12" x2="8" y2="12" />
                </svg>
                <h2 class="text-5xl font-bold text-kwhite mb-2">Product Name</h2>
              </div>

                <div className="flex justify-center mx-auto md:mx-0">
                  <div className="flex flex-col justify-center">
                    <img
                      src={DigitalPrinting}
                      alt="Small Image 1"
                      className="w-20 h-20 rounded-lg m-1"
                      onClick={() => handleSmallImageClick(DigitalPrinting)}
                    />
                    <img
                      src={Photography}
                      alt="Small Image 2"
                      className="w-20 h-20 rounded-lg m-1"
                      onClick={() => handleSmallImageClick(Photography)}
                    />
                    <img
                      src={DigitalPrinting}
                      alt="Small Image 3"
                      className="w-20 h-20 rounded-lg m-1"
                      onClick={() => handleSmallImageClick(DigitalPrinting)}
                    />
                    <img
                      src={Photography}
                      alt="Small Image 4"
                      className="w-20 h-20 rounded-lg m-1"
                      onClick={() => handleSmallImageClick(Photography)}
                    />
                  </div>
                  <div className="flex items-center ml-4">
                    <img src={mainImage} alt="Centered Image" className="rounded-lg w-65 h-64" />
                  </div>
                </div>
              </div>

              <div>
                <div className="py-8">
                  <h2 className="text-5xl font-bold text-kwhite mb-2 ml-10 mt-[2rem]">LKR: 2500.00</h2>
                  <div className="flex mb-4">
                    <div className="mr-4">
                      <h2 className="font-bold text-kwhite  ml-10 mt-2 max-w-[700px] mb-10 h-[9rem]">
                      <div class="overflow-y-auto h-[12rem]">
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                          sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla
                          lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                          ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                        </div>
                      </div>
                      </h2>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="text-1xl text-kwhite ml-12">Quantity</label>
                    <input type="number" id="small-input" className="block w-full p-2 pl-5 mb-8 text-kwhite border bg-kgray rounded-3xl max-w-[450px] ml-10 mt-1 placeholder- " placeholder="Type a number" />
                  </div>
                  <div>
                    <div className="font-bold text-kwhite ml-10 dark:text-gray-300">Optional (If you want to add a print to the item, please upload it in here Size: 23*23)</div>
                    <input className="block w-full text-kblack ml-10 mt-4 border-kgray rounded-3xl cursor-pointer dark:text-kblack focus:outline-4 dark:bg-kgray max-w-[450px] dark:border-kblack dark:placeholder-gray-400" id="large_size" type="file" />
                  </div>
                  <div>
                    <button type="button" className="text-kwhite bg-kgreen hover:bg-kyellow font-bold rounded-xl text-2xl px-40 py-2.5 mt-6 ml-10" onClick={handleAddToCartClick}>Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-y-auto h-60 max-w-[550px] ml-36 mt-[-10rem]">
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
