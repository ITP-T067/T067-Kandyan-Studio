import React from 'react';
import { FaSearch } from "react-icons/fa";
import '../../../Styles/cus_dashboard.css';
import Sample from '../../../images/photography.jpg';
import { useNavigate } from 'react-router-dom';

function Cus_dashboard() {

  const navigate = useNavigate();

  return (
    <>
      <div className='Cus_dashboard flex'>
        <div className='search-bar-container'>
          <div className='input-wrapper'>
            <FaSearch id="search-icon" />
            <input className="text-kblack" placeholder='Type to search...' />
          </div>
        </div>

        {/* Container for cards */}
        <div class="flex flex-wrap justify-center gap-5 mt-5">
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => navigate('/addtocart')}>
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => navigate('/addtocart')}>
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => navigate('/addtocart')}>
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => navigate('/addtocart')}>
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => navigate('/addtocart')}>
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => navigate('/addtocart')}>
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Cus_dashboard;
