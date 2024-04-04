import React from 'react'
import { IoArrowBackCircleSharp } from "react-icons/io5";

function AddPackages() {
  return (
    <div>

        {/* back navigation */}
        <div className="backnaviagtion flex ml-10 mt-7 gap-3 items-center" >
            <IoArrowBackCircleSharp className="w-10 h-10" />
            <p className="label text-kblack-default mt-2 mb-2 ml-2 text-lg font-[inter]" >Add Packages</p>
        </div>

        {/* form section */}
        <div className="flex justify-center items-start mt-9">
          <div className="container max-w-2xl h-96 bg-kgray-default  flex flex-col rounded-lg font-[inter]">

            <form className="flex flex-col">

              <div className=" mt-10 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite-default">Package Category</label>
                <input className="form-control rounded-md w-96 px-1" name="category" />
              </div>

              <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite-default">Package Type</label>
                <input className="form-control rounded-md w-96 px-1" name="type"  />
              </div>

              <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite-default">Package Price</label>
                <input className="form-control rounded-md w-96 px-1" name="price"  />
              </div>

              <div className=" mt-3 mb-4 ml-5 flex justify-start gap-4">
                  <label className="form-label text-kwhite-default">Upload an Image</label>
                  <input className="form-control rounded-md w-24 " name="image" type="file" /> 
              </div>

              <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite-default">Description</label>
                <textarea className="form-control rounded-md w-96 columns-3 px-1" name="description"  />
              </div>

              <div className=" mt-3 mb-4 ml-5 flex justify-end gap-4 mr-8">
                  <button className="form-label text-kwhite-default bg-kyellow-default  h-10  w-24 rounded-lg">Add</button>
              </div>

            </form>
          </div>
        </div>
      
    </div>
  )
}

export default AddPackages
