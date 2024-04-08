import React, { useEffect, useState } from 'react';
import '../../Styles/creator/projects.css';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8010/";

export default function CompletedProjects() {

    const [dataList, setDataList] = useState([]);

    const getFetchData = async () => {
        try {
          const response = await axios.get("/project/");
          if (response.data.success) {
            setDataList(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(() =>{
        getFetchData()
      }, [])

    const formatCompletedDate = (completedDate) => {
        return completedDate ? new Date(completedDate).toLocaleDateString() : 'N/A';
    };

  return (
    <>
        <nav className="project-navbar">
            <a className="project-el left_project " href="/creator/"><div className="">Ongoing Projects</div></a>
            <a className="project-el right_project" href="/creator/completedProjects" style={{backgroundColor: '#525252'}}><div>Completed Projects</div></a>
        </nav>

        <div className='projectTable'>
            <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Order Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Completed Date</th>
                </tr>
            </thead>
            <tbody>
                {dataList.length > 0 ? (
                    dataList.map((el) => {
                        if(el.Status == "Completed"){
                        
                        return (
                            <tr key={el._id}>
                                <td>{el.Project_Name}</td>
                                <td>{el.Order_ID ? el.Order_ID.Order_Type : 'N/A'}</td>
                                <td>{new Date(el.Project_Date).toLocaleDateString()}</td>
                                <td>{el.Status}</td>
                                <td>{formatCompletedDate(el.Completed_Date)}</td>
                            </tr>
                        )
                        }
                    })
                ) : (
                    <tr>
                        <td colSpan="4">No data available</td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
    </>
  )
}
