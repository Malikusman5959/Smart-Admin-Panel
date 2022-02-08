import React, { useState, useEffect } from "react";
import TopBar from "../TopBar";
import ShortLeaveCard from "./ShortLeaveCard";
import moment from "moment";
import axios from "axios";
import "./style.css";
import ReportModal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { saveAs } from "file-saver";


function ShortLeave({ tab }) {

  const [searchKey, setsearchKey] = useState("");
  const [ShortLeave, setShortLeave] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [date, setdate] = useState("All");
  const [statusSelector, setstatusSelector] = useState("All");
  const [reportModalIsOpen, setReportModalIsOpen] = useState(false);
  const [reportStartDate, setReportStartDate] = useState(new Date());
  const [reportEndDate, setReportEndDate] = useState(new Date());

  const [reportData, setReportData] = useState(null);
  const [reportDataInfo, setReportDataInfo] = useState(null);


  const createAndDownloadPdf = async () => {
    console.log("date");
    console.log("lasted", { reportData });
    await axios
      .post(`${process.env.REACT_APP_API}/create-pdf-shortLeave`, {
        templet: reportData,
        startDate: moment(reportStartDate).format('L'),
        endDate: moment(reportEndDate).format('L'),
        shortLeaveInfo: reportDataInfo,
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


  const getDate = async () => {

    const url = `${process.env.REACT_APP_API}/v1/shortLeaveDate?startDate=${moment(reportStartDate).format('L')}&endDate=${moment(reportEndDate).format('L')}`;
    const url1 = `${process.env.REACT_APP_API}/v1/shortLeaveDateInfo?startDate=${moment(reportStartDate).format('L')}&endDate=${moment(reportEndDate).format('L')}`;

    let res = await axios.get(url);
    let res1 = await axios.get(url1);
    setReportData(res.data.data.shortLeave);
    // console.log(res1.data.data.);

    console.log(res1.data.data.shortLeave);
    setReportDataInfo(res1.data.data.shortLeave);
    // return res.data.data;
  };

  const reload = () => {
    setrefresh(!refresh);
  };

  function closeReportModal() {
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


  const downloadReport = (start, end) => {
    getDate();
    // if success 
    closeReportModal();
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


  const getdata = async (url) => {
    let res = await axios.get(url);
    return res.data;
  };

  let fetchShortLeave = async () => {

    const url = `${process.env.REACT_APP_API}/v1/shortLeave`;
    const newData = await getdata(url);
    setShortLeave(newData.data.shortLeave);

  };

  useEffect(() => {

    if (reportData && reportDataInfo) {
      createAndDownloadPdf(reportStartDate, reportEndDate);
    }

  }, [reportData, reportDataInfo])

  useEffect(() => {
    setsearchKey("");
    fetchShortLeave();

  }, [tab, refresh]);


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
      return '01/01/2022';
    }
  };

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

      {/* selectors */}
      <div
        style={{
          height: "30px",
          margin: "10px",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          marginTop: "85px",
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


        <div
          style={{
            border: "1px solid #2575c0",
            borderRadius: "5px",
            width: "30px",
            color: "#2575c0",
            backgroundColor: '#2575c0',
            marginLeft: '772px',
            textAlign: 'center',
            paddingTop: '2px'
          }}

          onClick={() => {

            // logic
            setReportModalIsOpen(true)

          }}
        >
          <img src="https://img.icons8.com/metro/24/ffffff/download.png" />
        </div>


        {/* modal */}
        <ReportModal
          isOpen={reportModalIsOpen}
          onRequestClose={closeReportModal}
          style={customStyles}
        >
          {

            <div className="noScroll" style={{ width: '400px', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>

              <p style={{ marginTop: '-8px', color: '#2575c0', fontSize: '27px', fontWeight: '600', letterSpacing: '2px' }}> Short Leaves Report </p>

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <DatePicker selected={reportStartDate} onChange={(date) => setReportStartDate(date)} style={{ width: '50px' }} />
                <p style={{ color: '#2575c0', fontSize: '15px', fontWeight: '300', letterSpacing: '0px' }}><pre>  To  </pre> </p>
                <DatePicker selected={reportEndDate} onChange={(date) => setReportEndDate(date)} />
              </div>
              <p style={{ color: 'red', fontSize: '15px', fontWeight: '300', letterSpacing: '0px' }}> {checkDateRange() === 'true' ? null : checkDateRange()} </p>

              <div style={{ width: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <button style={{ paddingLeft: '15px', paddingRight: '15px', height: '36px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#ffffff', backgroundColor: '#2575c0', border: 'none', borderRadius: '8px', margin: '5px', marginTop: '20px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 4px 0 rgba(0, 0, 0, 0.19)' }} type="button" onClick={() => {
                  // logic
                  if (checkDateRange() === 'true') {
                    downloadReport(reportStartDate, reportEndDate);
                  }

                }}>  <p style={{ display: 'inline' }}> Download </p> </button>
                <button style={{ paddingLeft: '15px', paddingRight: '15px', height: '36px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#ffffff', backgroundColor: '#ff7759', border: 'none', borderRadius: '8px', margin: '5px', marginTop: '20px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 4px 0 rgba(0, 0, 0, 0.19)' }} type="button" onClick={() => {
                  // logic
                  closeReportModal();
                }}>  <p style={{ display: 'inline' }}> Cancel </p> </button>
              </div>

            </div>}

        </ReportModal>

        <select
          style={{
            border: "1px solid #2575c0",
            borderRadius: "5px",
            width: "120px",
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
          <option value="Cancelled">Cancelled</option>
          <option value="Approved">Approved</option>
        </select>
      </div>

      {/* Results */}

      {
        <div
          className="noScroll"
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
        >
          {ShortLeave.length == 0 ? (
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
            ShortLeave.map((item) => {
              if (
                searchKey == "" ||
                item.studentId.name
                  .toLowerCase()
                  .includes(searchKey.toLowerCase()) ||
                item.studentId.RegNo.toLowerCase().includes(searchKey.toLowerCase())
              ) {
                if (
                  date == "All" ||
                  (date == "Today" &&
                    findDate(date) ==
                    moment(item.date.valueOf()).format("L")) ||
                  (date == "Yesterday" &&
                    findDate(date) ==
                    moment(item.date.valueOf()).format("L")) ||
                  ((date == "This Week" || date == "This Month") &&
                    findDate(date) <= moment(item.date.valueOf()).format("L"))
                ) {
                  if (
                    statusSelector == "All" ||
                    (statusSelector == "Cancelled" && statusSelector === item.status) ||
                    (statusSelector == "Pending" && item.status === statusSelector) ||
                    (statusSelector == "Approved" && item.status === statusSelector)
                  ) {
                    return <ShortLeaveCard item={item} reload={reload} />;
                  }
                }
              } else {
                return null;
              }
            })
          )}
        </div>
      }
    </div>
  );
}

export default ShortLeave;
