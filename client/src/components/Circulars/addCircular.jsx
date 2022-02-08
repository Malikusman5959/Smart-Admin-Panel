import React, { useState, useEffect } from "react";
import "./addCircular.css";
import axios from "axios";
import moment from "moment";

function Circular({ setPageStatus, setRefresh }) {
  let [input, setInput] = useState("");
  let [subject, setSubject] = useState("");
  let [date, setDate] = useState(moment().format('L'));
  let [discription, setDiscription] = useState("");
  let [dropBox, setDropBox] = useState("Select Class");
  let [selectClasses, setSelectedClasses] = useState([]);
  let [message, setMessage] = useState("");
  const [submitRequest, setsubmitRequest] = useState(null);

  // console.log(selectClasses);
  const filterClassData = (classs) => {
    const filterClass = selectClasses.filter((el) => el !== classs);
    setSelectedClasses(filterClass);
  };
  const addData = async (url, data) => {
    let res = await axios.post(url, data);
    return res.data;
  };

  let fetchVisitor = async (data) => {
    const url = `${process.env.REACT_APP_API}/v1/circular`;
    const newData = await addData(url, data);
    if (newData.status === "success") {
      setMessage("Done circular is added");

      console.log(newData);
      setPageStatus("circular");
      setRefresh(true);
    } else {
      setMessage("Server Request Fail");
    }
  };
  // create Object
  const verify = () => {
    return true;
  };
  const createObject = () => {
    const object = {
      classes: selectClasses,
      subject: subject,
      date: date,
      body: discription,
    };

    if (
      subject === "" ||
      date === "" ||
      discription === "" ||
      selectClasses.length === 0
    ) {
      setMessage("Fill the form Correclty");
    } else {
      // add the post
      fetchVisitor(object);
      console.log(object);

      setMessage("Done circular is added");
    }
    // console.log(object);
    return "";
  };
  return (
    <div
      style={{

        width: '1070px'
      }}
    >
      <div
        onClick={() => {
          setPageStatus("circular");
          setRefresh(true);
        }}
        style={{
          background: "#2575c0",
          borderRadius: "5px",
          color: "white",
          width: '50px',
          padding: "5px",
          marginLeft: "1rem",
          position: "absolute",
          top: "1.7rem",
          fontSize: "16px",
          zIndex: 10,
          cursor: "pointer",
          textAlign: 'center'
        }}
      >
        Back
      </div>
      {/* body */}
      <div

        style={{
          height: "70%",
          maxHeight: "430px",
          margin: "10px",
          display: "flex",
          flexWrap: "wrap",
          overflowY: "scroll",
          justifyContent: "flex-start",
          padding: "10px",
        }}
        className="pageBody noScroll utli-center"
      >
        {/* search bar */}
        <div className="loginContainor">
          <div>
            <div className="lbl-text">Title</div>
            <input
              type="text"
              style={{ textAlign: 'left', paddingLeft: '10px', border: submitRequest && subject === '' ? '2px solid red' : null }}
              className="input_input"
              placeholder="Enter Circular Title"
              onChange={(event) => {
                setSubject(event.target.value);
                setsubmitRequest(null);

              }}
            />
          </div>
          <div>
            <div className="lbl-text">Class</div>
            <label
              class="select"
              style={{

              }}
              for="slct"
            >
              <select
                style={{
                  width: "22.7rem", height: '35px', border: submitRequest && selectClasses.length === 0 ? '2px solid red' : 'none', fontSize: '13px'
                }}
                onChange={(event) => {
                  setDropBox(event.target.value);
                  setSelectedClasses([...selectClasses, event.target.value]);
                  setsubmitRequest(null);

                }}
                id="slct"
                required="required"
              >
                <option value="" disabled="disabled" selected="selected">
                  {dropBox}
                </option>
                <option value="8A">8A</option>
                
              </select>
              {/* pic */}
            </label>
          </div>
          {/* selected Classes */}
          <div
            style={{
              width: "21rem",
              padding: "1rem",
              margin: '0'
            }}
          >
            {selectClasses &&
              selectClasses.map((el, key) => (
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: "0.3rem",
                    // paddingRight: "1rem",
                    color: "blue",
                    fontWeight: 600,
                    marginRight: "1rem",
                    marginBottom: "0.1rem",
                  }}
                >
                  {el}
                  {"   "}
                  <span
                    onClick={() => {
                      filterClassData(el);
                    }}
                    style={{
                      backgroundColor: "#2575c0",
                      color: "#ffffff",
                      borderRadius: "50%",
                      padding: '1px 6px',
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                  >
                    x
                  </span>
                </span>
              ))}
          </div>
          {/* <div>
            <div className="lbl-text">Select Date</div>
            <input
              type="date"
              className="input_input"
              placeholder="Enter Circular Title"
              style={{border : (submitRequest && date === "") || (moment(date).format('L') > moment().format('L') && date !== "") ? '2px solid red' : null}}
              onChange={(e) => {
                setDate(e.target.value);
                setsubmitRequest(null);

              }}
            />
          </div> */}

          <div>
            <div className="lbl-text">Description</div>
            <textarea
              style={{ textAlign: 'left', paddingLeft: '10px', border: submitRequest && discription === "" ? '2px solid red' : null }}
              className="input_input util-text-area"
              onChange={(e) => {
                setDiscription(e.target.value);
                setsubmitRequest(null);

              }}
            ></textarea>
          </div>
          <div
            style={{
              color: "red", fontSize: '13px'
            }}
          >

          </div>
          <div>
            <div
              style={{
                textAlign: "center",
                padding: "1rem",
                width: "21rem",
                color: "#2575c0",
                borderRadius: "5px",
                backgroundColor: "#ffffff",
                marginTop: "1rem",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: "pointer",
              }}
              onClick={() => {
                createObject();
                setsubmitRequest(true);
              }}
            >
              Submit

            </div>
          </div>
        </div>

        {/* search by id reg and select school */}
        {/* student flatlist */}
        {/* flat list submit fine */}
      </div>
    </div>
  );
}

export default Circular;
