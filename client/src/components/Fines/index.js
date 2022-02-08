import React, { useState, useEffect } from "react";
import TopBar from "../TopBar";
import FineCard from "./FineCard";
import axios from "axios";
import moment from "moment";
import Modal from "react-modal";
import { saveAs } from "file-saver";
import "./style.css";
import FineNewCard from "./FineNewCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Fines({ tab }) {
  const [searchKey, setsearchKey] = useState("");
  const [Complaints, setComplaints] = useState([]);
  const [selected, setselected] = useState(null);
  const [refresh, setrefresh] = useState(false);
  const [date, setdate] = useState("All");
  const [statusSelector, setstatusSelector] = useState("All");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [reportModalIsOpen, setReportModalIsOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [list, setList] = useState(true);

  const [reportStartDate, setReportStartDate] = useState(new Date());
  const [reportEndDate, setReportEndDate] = useState(new Date());

  const reload = () => {
    setrefresh(!refresh);
  };

  function closeModal() {
    setReportModalIsOpen(false);
  }

  const customStyles = {
    content: {
      borderRadius: "13px",
      boxShadow:
        "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.19)",
      top: "50%",
      left: "55%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };


  const createAndDownloadPdf = async () => {
    console.log("test");
    await axios
      .post(`${process.env.REACT_APP_API}/create-pdf-fine`, {
        data: selected,
      })
      .then(() =>
        axios.get(`${process.env.REACT_APP_API}/fetch-pdf`, {
          responseType: "blob",
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "newPdf.pdf");
      });
  };


  const downloadReport = (start, end) => {

    // download report

    // if success 
    closeModal();
  }


  const checkDateRange = () => {

    if (reportStartDate > reportEndDate) {
      return 'From date cannot be greater than To date'
    }
    if (moment(reportStartDate) > moment() || moment(reportEndDate) > moment()) {
      return 'Dates cannot be past today'
    }
    return 'true'
  }


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

  const getdata = async (url) => {
    let res = await axios.get(url);
    return res.data;
  };
  const updateData = async () => {
    const url = `${process.env.REACT_APP_API}/v1/adminFine/${selected._id}`;

    let res = await axios.patch(url, {
      status: "Paid",
    });
    return res.data.status;
  };

  let fetchComplaints = async () => {
    const url = `${process.env.REACT_APP_API}/v1/adminFine`;
    const newData = await getdata(url);
    const filteredResult = newData.data.fine;
    console.log(filteredResult);
    setComplaints(filteredResult);
  };
  const submitFine = async () => {
    setSubmit(false);
    const check = await updateData();
    console.log(check);
    if (check === "success") {
      setSubmit(true);
    }
    // setIsOpen(false);
  };
  useEffect(() => {
    setselected(null);
    setsearchKey("");
    fetchComplaints();
  }, [tab, refresh]);

  return (
    <div
      style={{
        paddingLeft: "6px",
        marginLeft: "18vw",
        marginRight: "5px",
        backgroundColor: "#f0f1f2",
        width: "100%",
        height: "100%",
      }}
    >
      <TopBar heading={tab} searchKey={searchKey} setsearchKey={setsearchKey} />

      {/* Body */}
      {modalIsOpen ? (
        <div className="customeModel">
          {/* <div
            className="btnClose"
            onClick={() => {
              setIsOpen(false);
              setSubmit(false);

              refresh ? setrefresh(false) : setrefresh(true);
            }}
          >
            Back
          </div> */}
          <button className="btnClose" style={{ padding: '0', marginLeft: '20px', marginTop: '0px', height: '28px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#2575c0', width: '70px', backgroundColor: '#ffffff', border: '1px solid #2575c0', borderRadius: '8px' }} type="button" onClick={() => {
            setIsOpen(false);
            setSubmit(false);

            refresh ? setrefresh(false) : setrefresh(true);
          }}> Back </button>


          {/* Detail card */}
          <div className="fineDetailsCard">
            {/* <h2 style={{ textAlign: "center", color: "#2575c0",  }}>
              FINE DETAILS
            </h2> */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
              <img
                style={{
                  height: "100px",
                  width: "100px",
                  borderRadius: "50%",
                  border: '5px solid #2575c0',
                  boxShadow:
                    "0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19)",
                }}
                src={selected.studentId.photo}
                alt="user"
              />
              <h3 style={{ margin: 0, marginTop: '10px' }}>{selected.studentId.name}</h3>
              <h3 style={{ margin: 0 }}>{selected.studentId.RegNo}</h3>
            </div>
            <div>
              <div className="row0">
                <h5>DATE</h5>
                <h5>TIME</h5>
                <h5>VIOLATION</h5>
              </div>
              {selected.violations.length > 0 ?

                <>
                  <div className="row1">
                    <h5>{selected.violations[0].date}</h5>
                    <h5>{selected.violations[0].timeDetected}</h5>
                    <h5>{selected.violationName}</h5>
                  </div>
                  <div className="row1">
                    <h5>{selected.violations[1].date}</h5>
                    <h5>{selected.violations[1].timeDetected}</h5>
                    <h5>{selected.violationName}</h5>
                  </div>
                  <div className="row1">
                    <h5>{selected.violations[2].date}</h5>
                    <h5>{selected.violations[2].timeDetected}</h5>
                    <h5>{selected.violationName}</h5>
                  </div></>
                :
                null
              }
            </div>

            <div className="fine">
              <h3 className="fineHead" style={{ display: "inline-block" }}>Fine :</h3>{" "}
              <h3 className="fineAmount" style={{ display: "inline-block" }}>{selected.amount} PKR</h3>
            </div>

            {/* buttons */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

              {submit === true ? (
                <div>
                  <div className="finetbn">Fine Submited</div>
                  <div
                    className="finetbn"
                    onClick={() => {
                      createAndDownloadPdf();
                    }}
                  >
                    Download Pdf
                  </div>
                </div>
              ) : selected.status === "Paid" ? (
                <div>
                  <div className="finetbn">Fine Already Submited</div>
                  <div
                    className="finetbn"
                    onClick={() => {
                      createAndDownloadPdf();
                    }}
                  >
                    Download Pdf
                  </div>
                </div>
              ) : (
                <div
                  className="finetbn"
                  onClick={() => {
                    submitFine();
                  }}
                >
                  Submit Fine
                </div>
              )}

            </div>

            {/* <div className="finetbn">Submit Fine</div> */}
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              height: "30px",
              margin: "10px",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              marginTop: "85px",
              position: "relative",
              width: "95%",
              // width: "94%",
            }}
          >

            <select
              style={{
                border: "1px solid #2575c0",
                borderRadius: "5px",
                width: "120px",
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


            {/* <div
              style={{
                border: "1px solid #2575c0",
                borderRadius: "5px",
                width: "30px",
                color: "#2575c0",
                backgroundColor: '#2575c0',
                marginLeft: '572px',
                textAlign: 'center',
                paddingTop: '2px'
              }}

              onClick={() => {

                // logic
                setReportModalIsOpen(true)

              }}
            >
              <img src="https://img.icons8.com/metro/24/ffffff/download.png" />
            </div> */}


            {/* modal */}
            {/* <Modal
              isOpen={reportModalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              {

                <div className="noScroll" style={{width : '400px', height : 'auto',  display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>

                  <p style={{ marginTop: '-8px', color: '#2575c0', fontSize: '27px', fontWeight: '600', letterSpacing: '2px' }}> Fine Report </p>

                  <div style={{display : 'flex' , flexDirection : 'row' , justifyContent : 'center' , alignItems : 'center'}}>
                  <DatePicker selected={reportStartDate} onChange={(date) => setReportStartDate(date)} style={{width : '50px'}} />
                  <p style={{ color: '#2575c0', fontSize: '15px', fontWeight: '300', letterSpacing: '0px' }}><pre>  To  </pre> </p>
                  <DatePicker selected={reportEndDate} onChange={(date) => setReportEndDate(date)} />
                  </div>
                  <p style={{ color: 'red', fontSize: '15px', fontWeight: '300', letterSpacing: '0px' }}> {checkDateRange() === 'true' ? null : checkDateRange()} </p>

                  <div style={{  width: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <button style={{ paddingLeft: '15px', paddingRight: '15px', height: '36px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#ffffff', backgroundColor: '#2575c0', border: 'none', borderRadius: '8px', margin: '5px', marginTop: '20px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 4px 0 rgba(0, 0, 0, 0.19)' }} type="button" onClick={() => {
                      // logic
                      if (checkDateRange() === 'true')
                      {
                        downloadReport(reportStartDate, reportEndDate);
                      }
                     
                    }}>  <p style={{ display: 'inline' }}> Download </p> </button>
                    <button style={{ paddingLeft: '15px', paddingRight: '15px', height: '36px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#ffffff', backgroundColor: '#ff7759', border: 'none', borderRadius: '8px', margin: '5px', marginTop: '20px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 4px 0 rgba(0, 0, 0, 0.19)' }} type="button" onClick={() => {
                      // logic
                     
                      closeModal();
                    }}>  <p style={{ display: 'inline' }}> Cancel </p> </button>
                  </div>

                </div>}

            </Modal> */}

            <i
              onClick={() => {
                setList(false);
              }}
              style={{
                cursor: "pointer",
                position: "absolute",
                display: "block",
                top: "0.55rem",
                fontSize: "2.1rem",
                right: "12.5rem",
                color: !list ? "#2575c0" : "#d4d4d4",
              }}
              class="fas fa-address-card"
            ></i>
            <i
              onClick={() => {
                setList(true);
              }}
              style={{
                cursor: "pointer",
                position: "absolute",
                display: "block",
                top: "0.55rem",
                fontSize: "2.1rem",
                right: "10rem",
                color: list ? "#2575c0" : "#d4d4d4",
              }}
              class="fas fa-th-list"
            ></i>

            <select
              style={{
                border: "1px solid #2575c0",
                borderRadius: "5px",
                width: "140px",
                color: "#2575c0",
              }}
              name="statusPicker"
              value={statusSelector}
              onChange={(e) => {
                setstatusSelector(e.target.value);
              }}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div
            className="noScroll"
            style={{
              height: "70%",
              maxHeight: "430px",
              margin: "10px",
              display: "flex",
              flexDirection: 'row',
              flexWrap: "wrap",
              overflowY: "scroll",
              justifyContent: 'flex-start',
              // alignItems : 'flex-start',
              padding: "10px",
            }}
          >
            {/* Results */}

            {Complaints.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  marginTop: "22%",
                  color: "#2575c0",
                  width: "100%",
                }}
              >
                {" "}
                No results found{" "}
              </p>
            ) : (
              Complaints.map((item) => {
                if (
                  searchKey === "" ||
                  item.RegNo.toLowerCase().includes(searchKey.toLowerCase()) ||
                  item.studentId.name
                    .toLowerCase()
                    .includes(searchKey.toLowerCase())
                ) {
                  if (
                    date === "All" ||
                    (date === "Today" &&
                      findDate(date) ===
                      moment(item.date.valueOf()).format("L")) ||
                    (date === "Yesterday" &&
                      findDate(date) ===
                      moment(item.date.valueOf()).format("L")) ||
                    ((date === "This Week" || date === "This Month") &&
                      findDate(date) <= moment(item.date.valueOf()).format("L"))
                  ) {
                    if (
                      statusSelector === "All" ||
                      (statusSelector === "Under Investigation" &&
                        statusSelector === item.status) ||
                      (statusSelector === "Pending" &&
                        item.status === statusSelector) ||
                      (statusSelector === "Closed" &&
                        item.status === statusSelector)
                    ) {
                      if (list) {
                        return (
                          <FineCard
                            setselected={setselected}
                            item={item}
                            setModalShow={setIsOpen}
                          />
                        );
                      }
                      return (
                        <FineNewCard
                          setselected={setselected}
                          item={item}
                          setModalShow={setIsOpen}
                        />
                      );
                    }
                  }
                } else {


                  return null;
                }
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Fines;
