import Sample from '../../images/photography.jpg'; 

const addNewOrder = () => {
    return (
      
      <div className="flex flex-row ">
        
        <div className="m-1 rounded-lg bg-kwhite bg-opacity-10 px-full px-5 py-5 w-3/4">

          <div className="maincards m-1 flex flex-wrap justify-center gap-5">


          <div class="m-1 rounded-lg bg-kwhite px-20 py-20 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">
            </div>
            <div class="m-1 rounded-lg bg-kwhite px-20 py-20 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">
            </div>
            <div class="m-1 rounded-lg bg-kwhite px-20 py-20 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">
            </div>
            <div class="m-1 rounded-lg bg-kwhite px-20 py-20 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">
            </div>
            <div class="m-1 rounded-lg bg-kwhite px-20 py-20 shadow-xl ring-1 ring-slate-900/5 h-full w-100 transition-transform duration-300 ease-in-out hover:scale-105">
            </div>
        
          </div>  
          <br/>
          <hr className='text-kwhite opacity-30'/><br/>        
          <div class="grid grid-cols-4 grid-rows-2">
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" >
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" >
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" >
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" >
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" >
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>
          <div className="card w-64 h-80 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" >
            <div class="w-64 h-80 absolute bg-kgray opacity-50 rounded-3xl"></div>
            <img className="absolute rounded-3xl" src={Sample} style={{ width: '225px', height: '225px', left: '16px', top: '20px' }} alt="Photography" />
            <div className="Souvenir absolute text-white text-center text-2xl font-bold top-64 left-0 right-0">Sample name</div>
          </div>

        </div>
         

          
        </div>

        <div className="m-1 rounded-lg bg-kblack w-1/4 ">
        
        </div>

      </div>

      
    );
  }
  
  export default addNewOrder;
  