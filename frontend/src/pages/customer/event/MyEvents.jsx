import React from 'react'
import { Button, Card, Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const TABLE_HEAD = ["Category", "Package Name", "Date", "Venue" , "Additional", "Actions"];
 
const TABLE_ROWS = [
  {
    category: "Wedding",
    package_name: "Minimal",
    date: "24/04/18",
    venue: "waters edge",
    additional: "It would be very convenient if the team can come around 7 am",
  },
  {
    category: "Birthday Party",
    package_name: "Standard",
    date: "24/08/26",
    venue: "Bolgoda Resort, Bolgoda",
    additional: "-",
  },
  {
    category: "Wedding",
    package_name: "Minimal",
    date: "24/09/18",
    venue: "Cinnamon Lakeside, Colombo",
    additional: "",
  },
  
];

function MyEvents() {
  return (
    <div className=' mt-10 ml-10 mr-10'>

<Card className="h-full w-full text-kwhite">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
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
          {TABLE_ROWS.map(({ category, package_name, date, venue, additional }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr >
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {category}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {package_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {venue}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {additional}
                  </Typography>
                </td>
                <td className={classes}>
                  <Link>
                    <Button className="btn_edit w-24 border-1 rounded-lg  bg-kgreen ">Edit</Button>
                  </Link>
                  <Link className="ml-4">
                    <Button className="btn_edit w-24 border-1 rounded-lg bg-kred ">Cancel</Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
      
    </div>
  )
}

export default MyEvents
