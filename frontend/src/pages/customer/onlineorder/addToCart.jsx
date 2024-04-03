import React, { useState } from 'react';
import '../../../Styles/addToCart.css';
import DigitalPrinting from '../../../images/DigitialPrinting.jpg';
import Photography from '../../../images/photography.jpg';

// Capitalize the function name to make it a valid React component
export default function AddToCart() {
  const [mainImage, setMainImage] = useState(Photography);

  const handleSmallImageClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  return (
    <div>
      <div class="card h-96 bg-kblack bg-opacity-30 rounded-3xl m-12 shadow-2xl">
        <div>
          <div class="flex flex-col md:flex-row md:space-x-8">
            <div class="mt-12 ml-11">
              <h2 class="text-5xl font-bold text-kwhite mb-2 ml-28">Product Name</h2>
              <div class="flex justify-center mx-auto md:mx-0">
                <div class="flex flex-col justify-center">
                  <img
                    src={DigitalPrinting}
                    alt="Small Image 1"
                    class="w-20 h-20 rounded-lg m-1"
                    onClick={() => handleSmallImageClick(DigitalPrinting)}
                  />
                  <img
                    src={Photography}
                    alt="Small Image 2"
                    class="w-20 h-20 rounded-lg m-1"
                    onClick={() => handleSmallImageClick(Photography)}
                  />
                  <img
                    src={DigitalPrinting}
                    alt="Small Image 3"
                    class="w-20 h-20 rounded-lg m-1"
                    onClick={() => handleSmallImageClick(DigitalPrinting)}
                  />
                  <img
                    src={Photography}
                    alt="Small Image 4"
                    class="w-20 h-20 rounded-lg m-1"
                    onClick={() => handleSmallImageClick(Photography)}
                  />
                </div>
                <div class="flex items-center ml-4">
                  <img src={mainImage} alt="Centered Image" class="rounded-lg w-65 h-64" />
                </div>
              </div>
            </div>

            <div>
              <div class="py-8">
                <h2 class="text-5xl font-bold text-kwhite mb-2 ml-10 mt-20">LKR: 2500.00</h2>
                <div class="flex mb-4">
                  <div class="mr-4">
                  <h2 class="font-bold text-kwhite mb-5 ml-10 mt-2 max-w-[700px] mb-10">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                        sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                        lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                        ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                        sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                  </h2>
                  </div>
                </div>
                <div class="mb-4">
                  <lable class="text-1xl text-kwhite ml-12">Order Type</lable>
                  <input type="text" id="small-input" class="block w-full p-2 pl-5 text-kwhite border bg-kgray rounded-3xl max-w-[450px] ml-10 mt-1 placeholder- " placeholder="Enter Order Type"></input>
                </div>
                <div class="mb-4">
                  <lable class="text-1xl text-kwhite ml-12">Quantity</lable>
                  <input type="number" id="small-input" class="block w-full p-2 pl-5 mb-8 text-kwhite border bg-kgray rounded-3xl max-w-[450px] ml-10 mt-1 placeholder- " placeholder="Type a number"></input>
                </div>
                <div>
                  <span class="font-bold text-kwhite ml-10 dark:text-gray-300">Optional (If you want to add a print to the item, please upload it in here Size: 23*23)</span>
                  <input class="block w-full text-kblack ml-10 mt-4  border-kgray rounded-3xl cursor-pointer dark:text-kblack focus:outline-4 dark:bg-kgray max-w-[450px] dark:border-kblack dark:placeholder-gray-400" id="large_size" type="file"></input>
                </div>
                <div>
                  <button type="button" class="text-kwhite bg-kgreen hover:bg-kyellow font-bold rounded-xl text-2xl px-40 py-2.5 mt-6 ml-10">Add to cart</button>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-y-auto h-72 max-w-[550px] ml-36 -mt-64">
            <div className="Rectangle104 max-w-[500px] h-28 bg-kgray rounded-3xl shadow mb-2" />
            <div className="Rectangle104 max-w-[500px] h-28 bg-kgray rounded-3xl shadow mb-2" />
            <div className="Rectangle104 max-w-[500px] h-28 bg-kgray rounded-3xl shadow mb-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
