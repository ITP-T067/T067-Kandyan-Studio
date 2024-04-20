import React from 'react';
import process from '../../../images/process.png';
import complete from '../../../images/complete.png';
import genarate from '../../../images/genarate.png';

function MyOrder() {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
      <div className="flex flex-col md:flex-row justify-between md:space-x-8">
        <div className="flex-grow p-6 bg-white rounded-3xl bg-opacity-50 dark:border-kgray dark:bg-kgray dark:bg-opacity-50">
          <h5 className="mt-auto text-4xl font-bold dark:text-kwhite">Total Orders</h5>
          <h1 className="font-bold text-6xl text-kwhite dark:text-kwhite text-right mb-auto mt-10 md:mt-0">12</h1>
        </div>
        <div className="flex-grow p-6 bg-white rounded-3xl bg-opacity-50 dark:border-kgray dark:bg-kgray dark:bg-opacity-50 mt-8 md:mt-0">
          <h5 className="text-4xl font-bold dark:text-kwhite">Total Expenditure</h5>
          <h1 className="font-bold text-6xl text-kwhite dark:text-kwhite text-right mt-10">LKR 14,300.00</h1>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-5 mx-auto px-10 mt-8">
        <LinkCard image={process} title="Pending Orders" link="/pendingorder" />
        <LinkCard image={process} title="Processing Orders" link="/processingorder" />
        <LinkCard image={complete} title="Completed Orders" link="/completeorder" />
        <LinkCard image={genarate} title="Generate Reports" link="/generatereport" />
      </div>
    </div>
  );
}

const LinkCard = ({ image, title, link }) => (
  <a href={link} className="flex-grow relative duration-300 delay-150 transform hover:scale-105">
    <div className="w-72 h-80 bg-kblack rounded-3xl border-8 border-kyellow flex justify-center">
      <img src={image} alt="Image" className="w-52 h-52 mt-5" />
    </div>
    <div className="w-72 h-20 text-center text-kwhite text-3xl font-bold font-normal">{title}</div>
  </a>
);

export default MyOrder;
