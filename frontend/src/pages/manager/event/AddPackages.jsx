import React from 'react'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

function AddPackages() {
  return (
    <div>

        {/* back navigation */}
        <div className="backnaviagtion flex-auto ml-10 mt-3  items-center" >
          <Link to="">
            <IoArrowBackCircleSharp className="w-10 h-10" />
            <p className="label text-kblack mt-2 mb-2 ml-2 text-lg font-[inter]" >Add Packages</p>
          </Link>
        </div>

        {/* form section */}
        <div className="flex justify-center items-start mt-3">
          <div className="container max-w-2xl h-96 bg-kgray  flex flex-col rounded-lg font-[inter]">

            <form className="flex flex-col">

              <div className=" mt-10 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite">Package Category</label>
                <input className="form-control rounded-md border-2 border-kblack bg-kwhite text-lg  w-96 px-1" name="category" />
              </div>

              <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite">Package Type</label>
                <input className="form-control rounded-md border-2 border-kblack bg-kwhite text-lg w-96 px-1" name="type"  />
              </div>

              <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite">Package Price</label>
                <input className="form-control rounded-md w-96 px-1 bg-kwhite text-lg" name="price"  />
              </div>

              <div className=" mt-3 mb-4 ml-5 flex justify-start gap-4">
                  <label className="form-label text-kwhite">Upload an Image</label>
                  <input className="form-control rounded-md w-28 text-sm" name="image" type="file" /> 
              </div>

              <div className="mt-3 mb-4 ml-5 flex justify-start gap-4">
                <label className="form-label text-kwhite">Description</label>
                <textarea className="form-control rounded-md w-96 columns-3 px-1" name="description"  />
              </div>

              <div className=" mt-3 mb-4 ml-5 flex justify-end gap-4 mr-8">
                <Link to="">
                  <button className="form-label text-kwhite bg-kyellow  hover:bg-kwhite hover:text-kblack h-10  w-24 rounded-lg">Add</button>
                </Link>
              </div>

            </form>
          </div>
        </div>
      
    </div>
  )
}

export default AddPackages
