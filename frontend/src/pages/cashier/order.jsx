import { Card, Typography } from "@material-tailwind/react";
import pending from "../../images/cashier/ordermain/Time.png"
import addnew from "../../images/cashier/ordermain/Add_square.png"
import check from "../../images/cashier/ordermain/Check_ring.png"
import supplier from "../../images/cashier/ordermain/Desk_fill.png"



const TABLE_HEAD = ["Customer", "Creator", "Date", ""];
  
 const TABLE_ROWS = [
   {
     name: "John Michael",
     job: "Manager",
     date: "23/04/18",
   },
   {
     name: "Alexa Liras",
     job: "Developer",
     date: "23/04/18",
   },
   {
     name: "Laurent Perrier",
     job: "Executive",
     date: "19/09/17",
   },
   {
     name: "Michael Levi",
     job: "Developer",
     date: "24/12/08",
   },
   {
     name: "Richard Gran",
     job: "Manager",
     date: "04/10/21",
   },
 ];
  

const Ordermain = () => {
  return (
    <div className='order'>

    <div class="flex flex-row justify-center"><div class="m-1 rounded-lg bg-white px-8 py-8 shadow-xl ring-1 ring-slate-900/5">
    <img src={addnew}/><br/>
  <h3>ADD NEW ORDER</h3>
</div>
<div class="m-1 rounded-lg bg-white px-8 py-8 shadow-xl ring-1 ring-slate-900/5 w-100 h-100">
  <img src={pending}/>
  <h3>PENDING ORDERS</h3>
</div>
<div class="m-1 rounded-lg bg-white px-8 py-8 shadow-xl ring-1 ring-slate-900/5">
  <img src={check}/>
  <h3>COMPLETED ORDERS</h3>
</div>
<div class="m-1 rounded-lg bg-white px-8 py-8 shadow-xl ring-1 ring-slate-900/5">
  <img src={supplier}/>
  <h3>SUPPLIER PAYMENTS</h3>
</div>
<div class="m-1 rounded-lg  px-8 py-8 shadow-xl ring-1 ring-slate-900/5 justify-center">
<h3>Studio Status</h3><br/><br/>
  <h3>OCCUPIED</h3>
</div>
</div> 

<div class="m-1 px-10 py-12 flex flex-row  ">

     <Card className=" m-1 h-full w-full  rounded-lg bg-kgray bg-opacity-5 ">
      <h3>Creator's Orders</h3>
       <table className=" m-1 w-400 min-w-max table-auto text-center border">
         <thead>
           <tr>
             {TABLE_HEAD.map((head) => (
               <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                 <Typography
                   variant="small"
                   color="blue-gray"
                   className="font-normal leading-none opacity-70"
                 >
                   {head}
                 </Typography>
               </th>
             ))}
           </tr>
         </thead>
         <tbody>
           {TABLE_ROWS.map(({ name, job, date }, index) => {
             const isLast = index === TABLE_ROWS.length - 1;
             const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
  
             return (
               <tr key={name}>
                 <td className={classes}>
                   <Typography variant="small" color="blue-gray" className="font-normal">
                     {name}
                   </Typography>
                 </td>
                 <td className={`${classes} bg-blue-gray-50/50`}>
                   <Typography variant="small" color="blue-gray" className="font-normal">
                     {job}
                   </Typography>
                 </td>
                 <td className={classes}>
                   <Typography variant="small" color="blue-gray" className="font-normal">
                     {date}
                   </Typography>
                 </td>
                 <td className={`${classes} bg-blue-gray-50/50`}>
                   <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                     View
                   </Typography>
                 </td>
               </tr>
             );
           })}
         </tbody>
       </table>
     </Card>
     <Card className="h-full w-full "> 
     <div className="both flex flex-col">
     <div className="info flex justify-center ">
     <div class="m-1 rounded-lg bg-white px-8 py-8 shadow-xl ring-1 ring-slate-900/5 w-full h-full">
      <h3>Total Income</h3><br/><br/>
      <h3>LRK 40000</h3>
      </div>
      <div class="m-1 rounded-lg  px-8 py-8 shadow-xl ring-1 ring-slate-900/5 w-full h-full">
      <h3>Total Expenditures</h3>
      <br/><br/>
      <h3>LRK 20000</h3>
      </div>
      <div class="m-1 rounded-lg bg-white px-8 py-8 shadow-xl ring-1 ring-slate-900/5 w-full h-full">
      <h3>Net Profit</h3>
      <br/><br/>
      <h3>LRK 20000</h3>
      </div>
      </div>
      
      <div className="info ">
     <div class="m-1 rounded-lg bg-white px-8 py-8 shadow-xl ring-1 ring-slate-900/5 w-full h-auto ">
      <h3><center>Genarate Monthly Report</center></h3>
      </div>
      <div class="m-1 rounded-lg bg-white px-8 py-8 shadow-xl ring-1 ring-slate-900/5 w-full h-auto">
      <h3><center>Genarate Daily Report</center></h3>
      </div>
      
      
      </div>
      </div>
     </Card>
  
 

</div>
</div>


    
  );
}

export default Ordermain;
