import React from 'react';
import '../../../Styles/home.css'; // Importing the CSS file
import MainImage from '../../../images/logo.png';
import Photography from '../../../images/photography.jpg';
import DigitalPrinting from '../../../images/DigitialPrinting.jpg';
import { useNavigate } from 'react-router-dom';
import NormalHeader from '../../header';


function Home() {
  const navigate = useNavigate();

  const userRole = localStorage.getItem('userRole');

  const renderHeader = () => {
    if (userRole === "") {
        return <NormalHeader />;
    } else {
        return null;
    }
};

  return (
    <div>  
      {renderHeader()}
      <div className='kandianImage'>
        <img src={MainImage} alt="Centered Image" />
      </div>
      <div className="mainName">
        <div className="KandyanStudio">KANDYAN STUDIO</div>
        <div className="DigitalColorLab">&</div>
        <div className="DigitalColorLab">DIGITAL COLOR LAB</div>
      </div>
      <div className="explore-btn">
        <button className="rounded-full bg-kyellow hover:scale-110 transition-transform duration-300" onClick={() => navigate('/cusdashboard')}>
            EXPLORE ITEMS
        </button>
      </div>
      <div className="explore-btn">
          <button className="rounded-full bg-kyellow hover:scale-110 transition-transform duration-300" onClick={() => navigate('/customer/event/cusDashWedding')}>
              EXPLORE EVENTS
          </button>
      </div>

      {/* service card */}
      <div className="service_card">
        <h1 className="services-heading" style={{ fontSize: '50px'}}>Our Services</h1>
        <div className="order-btn-container" style={{ marginTop: '50px' }}>
          <div className="order_btn" style={{border: 'none', transform: 'none', backgroundColor: '#838383'}}>
            <div className="Group8955 relative" style={{ width: '290px', height: '360px' }}>
              <div className="Rectangle4318 absolute bg-zinc-500 bg-opacity-40 rounded-2xl shadow border-neutral-500" style={{ width: '100%', height: '100%' }} />
              <div className="Photos absolute text-center text-kwhite text-2xl font-bold font-normal" style={{ left: '0px', top: '282px', right:'0px' }}>Photography</div>
              <img className="DefaultPassportAndIdPhotosServicesManyStudiosAndLabs32 absolute rounded-3xl" src={Photography} style={{ width: '255px', height: '255px', left: '16px', top: '20px' }} alt="Photography" />
            </div>
          </div>
          <div className="order_btn" style={{ border: 'none', transform: 'none', backgroundColor: '#838383'}}>
            <div className="Group8955 relative" style={{ width: '290px', height: '360px' }}>
              <div className="Rectangle4318 absolute bg-zinc-500 bg-opacity-40 rounded-2xl shadow border-neutral-500" style={{ width: '100%', height: '100%' }} />
              <div className="Photos absolute text-center text-kwhite text-2xl font-bold font-normal" style={{ left: '0px', top: '282px', right:'0px' }}>Digital Printing</div>
              <img className="DefaultPassportAndIdPhotosServicesManyStudiosAndLabs32 absolute rounded-3xl" src={DigitalPrinting} style={{ width: '255px', height: '255px', left: '16px', top: '20px' }} alt="Digital Printing" />
            </div>
          </div>
          <div className="order_btn" style={{ border: 'none', transform: 'none', backgroundColor: '#838383' }}>
            <div className="Group8955 relative" style={{ width: '290px', height: '360px' }}>
              <div className="Rectangle4318 absolute bg-zinc-500 bg-opacity-40 rounded-2xl shadow border-neutral-500" style={{ width: '100%', height: '100%' }} />
              <div className="Photos absolute text-center text-kwhite text-2xl font-bold font-normal" style={{ left: '0px', top: '282px', right:'0px' }}>Passport &amp;<br/>ID Photos</div>
              <img className="DefaultPassportAndIdPhotosServicesManyStudiosAndLabs32 absolute rounded-3xl" src={Photography} style={{ width: '255px', height: '255px', left: '16px', top: '20px' }} alt="Passport &amp; ID Photos" />
            </div>
          </div>
          <div className="order_btn" style={{ border: 'none', transform: 'none', backgroundColor: '#838383' }}>
            <div className="Group8955 relative" style={{ width: '290px', height: '360px' }}>
              <div className="Rectangle4318 absolute bg-zinc-500 bg-opacity-40 rounded-2xl shadow border-neutral-500" style={{ width: '100%', height: '100%' }} />
              <div className="Photos absolute text-center text-kwhite text-2xl font-bold font-normal" style={{ left: '0px', top: '282px', right:'0px' }}>Album Binding</div>
              <img className="DefaultPassportAndIdPhotosServicesManyStudiosAndLabs32 absolute rounded-3xl" src={Photography} style={{ width: '255px', height: '255px', left: '16px', top: '20px' }} alt="Album Binding" />
            </div>
          </div>
        </div>
      </div>

      {/* about us card */}
      <div className="about_card">
        <div className="AboutUs top-0">ABOUT US</div>
        <div className='aboutImage'>
          <img src={MainImage} alt="Centered Image" />
        </div>
        <div className='about_content'>
            Established in 2008 within the Gampaha District, The Kandyan Studio and Digital Color Lab has risen as a prominent figure in the realms of photography and digital printing. Renowned for their unwavering commitment to quality and innovation, they have become industry leaders.<br/>Armed with cutting-edge technology and a team of skilled professionals, The Kandyan Studio combines traditional craftsmanship with modern sophistication. Specializing in capturing and preserving precious moments, the studio caters to diverse needs, from milestone events to corporate projects.
        </div>
      </div>

      {/* rating card */}
      <div className="rate_card">
      
      </div>
    </div>
  );
}

export default Home;