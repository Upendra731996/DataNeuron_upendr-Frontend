import React, { useState, useEffect, useRef } from "react";
import "./componet02.css"; // Import your CSS file for styling
import axios from "axios";

const ResizableComponent = ({
 
  
}) => {
  let [upDateId, setUpdateId] = useState(null);

  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(600);
  const [isResizing, setIsResizing] = useState(false);
  //   ======================================================= logical part
  const inputRef = useRef(null);

  function handleUpdate(id) {
    setUpdateId(id);
    inputRef.current.style.display = "block";
  }

  async function upDateFunction() {
    try{

    let newData={

    }
    if(data.employee_Name){
      newData.employee_Name=data.employee_Name
    }
    if(data.mobile_number){
      newData.mobile_number=data.mobile_number
    }

       await axios.put(
        `https://upendra-neoron-backen.onrender.com/update/?id=${upDateId}`,
        newData
      );
      setData((pre) => ({
        ...pre,
        employee_Name: "",
        mobile_number: "",
      }));
     
      dbCall();
      inputRef.current.style.display = "none";
    }
    catch(err){
      console.log(err)
    }
  }
  async function deleteData(id) {
    try {
      console.log(id);

      let response = await axios.delete(
        `https://upendra-neoron-backen.onrender.com/deleteEmployee?id=${id}`
      );
      console.log(response.data.data);
      dbCall();
    } catch (err) {
      console.log(err);
    }
  }

  const [allData, setAllData] = useState([
    {
      employee_Name: "",
      mobile_number: "",
    },
  ]);

  const [data, setData] = useState({
    employee_Name: "",
    mobile_number: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  }

  const dbCall = async () => {
    try {
      const response = await axios.get(`https://upendra-neoron-backen.onrender.com/getData`);

      setAllData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors if needed
    }
  };

  useEffect(() => {
    dbCall();
  }, []);
  async function handleAdd() {
    let response = await axios.post("https://upendra-neoron-backen.onrender.com/add", data);

    setData((pre) => ({
      ...pre,
      employee_Name: "",
      mobile_number: "",
    }));

    dbCall();
  }

  // =============================================

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      setWidth(e.clientX);
      setHeight(e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="resizable-component"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {isResizing && (
        <div
          className="resize-overlay"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></div>
      )}
      <div className="resize-handle" onMouseDown={handleMouseDown}></div>
      <div className="content">
        {/* ========== add table======== */}

        <h2>DataNeuron Employee Table</h2>

        <div style={{ overflowY: "auto", maxHeight: "400px" }}>
          {" "}
          {/* Scrollable container */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Mobile Number</th>

                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((item, i) => (
                <tr key={i}>
                  <React.Fragment >
                    <td>
                      <input
                        type="text"
                        value={item?.employee_Name}
                        onChange={(e) => handleChange(e, item._id)} // Pass index to identify which item is being updated
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="mobile_number"
                        value={item?.mobile_number}
                        onChange={(e) => handleChange(e, item._id)} // Pass index to identify which item is being updated
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                      />
                    </td>

                    <td>
                      <button onClick={() => handleUpdate(item._id)}>
                        Update
                      </button>
                    </td>
                    <th>
                      <button
                        onClick={() => {
                          deleteData(item._id);
                        }}
                      >
                        Delete
                      </button>
                    </th>
                  </React.Fragment>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    type="text"
                    name="employee_Name"
                    value={data.employee_Name}
                    onChange={(e) => handleChange(e)} // Pass index to identify which item is being updated
                    style={{ width: "100%", height: "100%" }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="mobile_number"
                    value={data.mobile_number}
                    onChange={(e) => handleChange(e)} // Pass index to identify which item is being updated
                    style={{ width: "100%", height: "100%" }}
                  />
                </td>
                <td>
                  <button onClick={() => handleAdd()}>Add</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="updateInput" ref={inputRef}>
            <table>
              <tbody>
                <tr></tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="employee_Name"
                      placeholder="enter Eployee name"
                      onChange={handleChange}
                    />
                  </td>
                  <input
                    type="tel"
                    name="mobile_number"
                    onChange={handleChange}
                    placeholder="enter mobile numner"
                  />
                  <td>
                    <button
                      onClick={() => {
                        upDateFunction();
                      }}
                    >
                      Confirm
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        inputRef.current.style.display = "none";
                      }}
                    >
                      cancel
                    </button>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResizableComponent;
