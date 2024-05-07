import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import '../../../Styles/cus_dashboard.css';
import { useNavigate } from 'react-router-dom';
import  axios from 'axios';

axios.defaults.baseURL = "http://localhost:8010/"

function Cus_dashboard() {

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getItems();
  },[]);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [items, searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getItems = () =>{
    axios.get('/item')
      .then(response => {
        setItems(response.data.data);
      })
      .catch(error =>{
        console.error('Error fetching items:', error);
      })
  }

  const handleCardClick = (itemId) => {
    navigate(`/addtocart/${itemId}`); // Navigate to '/addtocart' with the item ID as a URL parameter
  };

  
  return (
    <>
      <div className='Cus_dashboard flex'>
        <div className='search-bar-container'>
          <div className='input-wrapper'>
            <FaSearch id="search-icon" />
            <input className="text-kblack" placeholder='Type to search...' value={searchQuery} onChange={handleSearchInputChange} />
          </div>
        </div>

        {/* Container for cards */}
        <div class="flex flex-wrap justify-center gap-5 mt-5">
        {filteredItems.map(item => (
          <div key={item._id} className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => handleCardClick(item._id)}>
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={require(`../../../../../backend/uploads/StockManagement/${item.image}`)} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt={item.image} />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">{item.name}</div>
          </div>
         ))} 
         </div>
        
      </div>
    </>
  );
}

export default Cus_dashboard;
