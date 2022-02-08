import React, { useState, useEffect } from "react";
import TopBar from "../TopBar";
import Circular from "./addCircular";
import EditCircular from "./editCircular";
import axios from "axios";
import CircularCard from "./circularCard";
import moment from "moment";
import "./circularCard.css";

function Circulars({ tab }) {
  const [searchKey, setsearchKey] = useState("");
  const [pageState, setPageState] = useState("circular");
  const [circular, setCircular] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [date, setdate] = useState("All");
  const [selected, setSelected] = useState(null);

  const getdata = async (url) => {
    let res = await axios.get(url);
    return res.data;
  };

  let fetchVisitor = async () => {
    const url = `${process.env.REACT_APP_API}/v1/adminCircular`;
    const newData = await getdata(url);
    setCircular(newData.data.circular);
    console.log(newData.data.circular);
  };

  const findDate = (status) => {
    if (status == "Today") {
      return moment(new Date()).format("L");
    } else if (status == "Yesterday") {
      return moment(
        new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
      ).format("L");
    } else if (status == "This Week") {
      return moment(
        new Date(new Date().valueOf() - 1000 * 60 * 60 * 168)
      ).format("L");
    } else {
      return moment(
        new Date(new Date().valueOf() - 1000 * 60 * 60 * 720)
      ).format("L");
    }
  };

  useEffect(() => {
    fetchVisitor();
  }, [refresh]);
  return (
    <div
      style={{
        paddingLeft: "6px",
        marginLeft: "18vw",
        backgroundColor: "#f0f1f2",
        width: "1250px",
        height: "100%",
      }}
    >
      <TopBar heading={tab} searchKey={searchKey} setsearchKey={setsearchKey} />

      {/* Body */}
      <div
        style={{
          marginTop: "7rem",
        }}
      ></div>
      {pageState === "editCircular" ? (
        <EditCircular
          setPageStatus={setPageState}
          setRefresh={setRefresh}
          selected={selected}
        />
      ) : pageState === "circular" ? (
        <div className="circular noScroll">

          <select
            style={{
              border: "1px solid #2575c0",
              borderRadius: "5px",
              width: "120px",
              height : '30px',
              marginLeft : '10px',
              marginBottom : '10px',
              color: "#2575c0",
            }}
            name="datePicker"
            value={date}
            onChange={(e) => {
              setdate(e.target.value);
            }}
          >
            <option value="All">All</option>
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>


          <div
            className="addCircular"
            onClick={() => {
              setPageState("addCircular");
              setRefresh(false);
              console.log("test");
            }}
          >
            <img style={{ marginRight: '3px' }} src="https://img.icons8.com/android/20/2575c0/plus.png" />
            Circular
          </div>

          <div className="circularCardHolder noScroll" style={{
            flexWrap: "wrap",
            overflowY: "scroll", height: "70%",
            maxHeight: "430px",
            margin: "0px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            padding: "10px",
          }}>
            {circular &&
              circular.map((el, key) => {

                if (
                  searchKey === "" ||
                  el.subject.toLowerCase().includes(searchKey.toLowerCase())
                ) {

                  if (
                    date === "All" ||
                    (date === "Today" &&
                      findDate(date) ===
                      moment(el.date.valueOf()).format("L")) ||
                    (date === "Yesterday" &&
                      findDate(date) ===
                      moment(el.date.valueOf()).format("L")) ||
                    ((date === "This Week" || date === "This Month") &&
                      findDate(date) <= moment(el.date.valueOf()).format("L"))
                  ) {

                    return <CircularCard
                      el={el}
                      key={key}
                      setRefresh={setRefresh}
                      refresh={refresh}
                      setPageStatus={setPageState}
                      setSelected={setSelected}
                    />

                  }


                }

              }

              )}
          </div>
          
        </div>
      ) : (
        <Circular setPageStatus={setPageState} setRefresh={setRefresh} />
      )
      
      }
    </div>
  );
}

export default Circulars;
