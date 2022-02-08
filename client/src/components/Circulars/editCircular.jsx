import React, { useState, useEffect } from "react";
import "./addCircular.css";
import axios from "axios";

function EditCircular({ setPageStatus, setRefresh, selected }) {
  let [input, setInput] = useState("");
  let [subject, setSubject] = useState(selected.subject);
  let [date, setDate] = useState(selected.date);
  let [discription, setDiscription] = useState(selected.body);
  let [dropBox, setDropBox] = useState("Select Class");
  let [selectClasses, setSelectedClasses] = useState(selected.classes);
  let [message, setMessage] = useState("");
  // console.log(selectClasses);
  const filterClassData = (classs) => {
    const filterClass = selectClasses.filter((el) => el !== classs);
    setSelectedClasses(filterClass);
  };
  const addData = async (url, data) => {
    let res = await axios.patch(url, data);
    return res.data;
  };

  let fetchVisitor = async (data) => {
    const url = `${process.env.REACT_APP_API}/v1/adminCircular/${selected._id}`;
    const newData = await addData(url, data);
    if (newData.status === "success") {
      setMessage("Done circular updated");
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

      //   setMessage("Done circular is added");
    }
    // console.log(object);
    return "";
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
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
          width: "fit-content",
          padding: "0.5rem 2rem",
          marginLeft: "1rem",
          position: "absolute",
          top: "1.5rem",
          zIndex: 10,
          cursor: "pointer",
        }}
      >
        Back
      </div>
      {/* body */}
      <div
        style={{
          overflow: "auto",
        }}
        className="pageBody utli-center"
      >
        {/* search bar */}
        <div className="loginContainor">
          <div>
            <div className="lbl-text">Circular Title</div>
            <input
              type="text"
              className="input_input"
              placeholder="Enter Circular Title"
              onChange={(event) => {
                setSubject(event.target.value);
              }}
              value={subject}
            />
          </div>
          <div>
            <div className="lbl-text">Select Class</div>
            <label
              class="select"
              style={{
                width: "21rem",
              }}
              for="slct"
            >
              <select
                style={{
                  width: "21rem",
                }}
                onChange={(event) => {
                  setDropBox(event.target.value);
                  setSelectedClasses([...selectClasses, event.target.value]);
                  // setSelectedClasses(ar.push(event.target.value));
                }}
                id="slct"
                required="required"
              >
                <option value="" disabled="disabled" selected="selected">
                  {dropBox}
                </option>
                <option value="3-A">3-A</option>
                <option value="3-B">3-B</option>
                <option value="3-C">3-C</option>
              </select>
              {/* pic */}
            </label>
          </div>
          {/* selected Classes */}
          <div
            style={{
              width: "21rem",
              padding: "1rem",
            }}
          >
            {selectClasses &&
              selectClasses.map((el, key) => (
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "white",
                    borderRadius: 10,
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    color: "blue",
                    fontWeight: 600,
                    marginRight: "1rem",
                    marginBottom: "0.1rem",
                  }}
                >
                  {el}
                  {"   "}{" "}
                  <span
                    onClick={() => {
                      filterClassData(el);
                    }}
                    style={{
                      //   height: "15px",
                      //   marginTop: "0.5rem",
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 8px",
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                  >
                    x
                  </span>
                </span>
              ))}
          </div>
          <div>
            <div className="lbl-text">Select Date</div>
            <input
              type="date"
              className="input_input"
              placeholder="Enter Circular Title"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              value={date}
            />
          </div>

          <div>
            <div className="lbl-text">Discription</div>
            <textarea
              className="input_input util-text-area"
              onChange={(e) => {
                setDiscription(e.target.value);
              }}
              value={discription}
            ></textarea>
          </div>
          <div
            style={{
              color: "white",
            }}
          >
            {message}
          </div>
          <div>
            <div
              style={{
                textAlign: "center",
                padding: "1rem",
                width: "21rem",
                color: "black",
                borderRadius: "5px",
                backgroundColor: "white",
                marginTop: "1rem",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: "pointer",
              }}
              onClick={() => {
                createObject();
              }}
            >
              Update Circular
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

export default EditCircular;
