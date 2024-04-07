import React, { useEffect, useState } from 'react';
import '../../Styles/creator/projects.css';
import '../../Styles/creator/formData.css';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8010/";

export default function Projects() {

    const [formDataEdit, setFormDataEdit] = useState({
        Project_Name : "",
        Status : "",
        _id: "",
      });
      const [editdSection, setEditSection] = useState(false);
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
      useEffect(() => {
        getFetchData();
      }, []);
      
      useEffect(() => {
          console.log(dataList); // Log dataList to the console
      }, [dataList]);
      
    
      const handleDelete = async(id)=>{ 
        const data = await axios.delete("/project/delete/" + id)
        if(data.data.success){
          getFetchData()
          alert(data.data.message)
        }
      }
    
      const handleUpdate = async(e)=>{ 
        e.preventDefault()
        const data = await axios.put("/project/update", formDataEdit)
        if(data.data.success){
          setEditSection(false)
          getFetchData()
          alert(data.data.message)
        }
      }
    
      const handleEditOnchange = async(e) => {
        const {value,name} = e.target
        setFormDataEdit((prev)=> {
          
          return{
            ...prev,
            [name] : value
          }
        })
      }
    
      const handleEdit = async(el) => {
        setFormDataEdit(el)
        setEditSection(true)
      }

  return (
    <>
    <nav className="project-navbar">
            <a className="project-el left_project" href="/creator/" style={{backgroundColor: '#525252'}}><div className="">Ongoing Projects</div></a>
            <a className="project-el right_project" href="/creator/completedProjects"><div>Completed Projects</div></a>
    </nav>

    {
        editdSection && (
            <div className="addContainer bg-kgray">
                    <button className="closeBtn"  onClick={()=>setEditSection(false)}>Close</button>
                    <form onSubmit={handleUpdate}>
                    <label htmlFor="Project_Name">Project Name: </label>
                    <input type="text" id="Project_Name" name="Project_Name" onChange={handleEditOnchange} value={formDataEdit.Project_Name}/>
                    
                    <label htmlFor="Status">Status: </label>
                    <select id="Status" name="Status" className="select" onChange={handleEditOnchange} value={formDataEdit.Status}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
        
                    <input type="hidden" name="Order_ID" value={formDataEdit.Order_ID} />
        
                    <button className="submitBtn bg-kblue">Submit</button>
                    </form>
            </div>
        )
    }
    <div className='projectTable'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Order Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {dataList.length > 0 ? (
                  dataList.map((el) => {
                    if(el.Status === "Pending" || el.Status === "In Progress"){
                      
                      return (
                        <tr key={el._id}>
                            <td>{el.Project_Name}</td>
                            <td>{el.Order_ID ? el.Order_ID.Order_Type : 'N/A'}</td>
                            <td>{new Date(el.Project_Date).toLocaleDateString()}</td>
                            <td>{el.Status}</td>
                            <td>
                                <button className='btn btn_edit bg-kblue text-s' onClick={() => handleEdit(el)}>Edit</button>
                                <button className='btn btn_delete bg-kred' onClick={() => handleDelete(el._id)}>Delete</button>
                            </td>
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
