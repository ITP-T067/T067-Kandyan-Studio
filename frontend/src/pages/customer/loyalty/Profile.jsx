import React from 'react'


function profile() {
  return (
    <div>
      <div className="h-[30rem] w-[60rem] bg-kgray bg-opacity-30 rounded-3xl mx-auto">
        <div className="grid grid-cols-5 h-[14rem] w-[60rem] p-8 bg-kyellow bg-opacity-100 rounded-3xl mx-auto">
            <div className="h-[10rem] w-[10rem] bg-kwhite rounded-3xl">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="profile" className="h-[10rem] w-[10rem] rounded-3xl"/>
                
            </div> 
            <div className="col-span-4 h-[8rem] w-[40rem] p-8 bg-kwhite bg-opacity-70 rounded-3xl ml-[4rem] mt-4"> 
            </div>       
        </div>
        <div className='flex justify-between'>
  <div className="h-[12rem] w-[50rem] m-10 bg-kwhite rounded-3xl flex items-center justify-center">
   
    <span className="text-black text-lg font-semibold ml-2 underline ">Silver Member</span>
    <p></p>
  </div>
  <div className="h-[12rem] w-[50rem] m-10 bg-kwhite rounded-3xl flex items-center justify-center">
    <span className="text-black text-lg font-semibold ml-2 underline">Gold Member</span>
  </div>
  <div className="h-[12rem] w-[50rem] m-10 bg-kwhite rounded-3xl flex items-center justify-center">
    <span className="text-black text-lg font-semibold underline">Platinum Member</span>
  </div>
</div>

      </div>
    </div>
  )
}

export default profile
