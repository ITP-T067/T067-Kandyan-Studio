import React, {useEffect, useState} from 'react';
import process from '../../../images/process.png';
import complete from '../../../images/complete.png';
import genarate from '../../../images/genarate.png';
import  axios from 'axios';




function MyOrder() {

  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  const [completedTotalAmount, setcompletedTotalAmount] = useState(0);

  useEffect(() => {
      getOnOrders();
  }, []);

  const getOnOrders = async () => {
    try {
      const response = await axios.get('order/on/count/get/order');
      const orders = response.data.data;
      const count = orders.filter(order => order.Project_Status === 'Completed').length;
      setCompletedOrdersCount(count);// Log the count of completed orders

      const completedOrders = orders.filter(order => order.Project_Status === 'Completed');

      const totalAmount = completedOrders.reduce((total, order) => {
        return total + order.Order_Amount;
      }, 0);

      setcompletedTotalAmount(totalAmount);

    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
      <div className="flex flex-col md:flex-row justify-between md:space-x-8">
      <div className="flex-grow p-6 bg-white rounded-3xl bg-opacity-50 dark:border-kgray dark:bg-kgray dark:bg-opacity-50 mt-8 md:mt-0">
          <h5 className="text-4xl font-bold dark:text-kwhite">Completed Orders</h5>
          <h1 className="font-bold text-6xl text-kwhite dark:text-kwhite text-right mt-10">{completedOrdersCount}</h1>
        </div>
        <div className="flex-grow p-6 bg-white rounded-3xl bg-opacity-50 dark:border-kgray dark:bg-kgray dark:bg-opacity-50 mt-8 md:mt-0">
          <h5 className="text-4xl font-bold dark:text-kwhite">Total Expenditure</h5>
          <h1 className="font-bold text-6xl text-kwhite dark:text-kwhite text-right mt-10">LKR {completedTotalAmount}.00</h1>
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
