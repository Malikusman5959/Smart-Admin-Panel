import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Modal from 'react-modal';


function ShortLeaveCard({ item, reload }) {
  const [fullCard, setfullCard] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reason, setreason] = useState('');
  const [CancelStatus, setCancelStatus] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const toggleCard = () => {
    setfullCard(!fullCard);
  };

  const customStyles = {
    content: {
      borderRadius: '13px',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.19)',
      top: '50%',
      left: '55%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const sendData = async (url, status, reason) => {

    let res = await axios.patch(url, { "status": status, 'reason': reason });
    return res.data;
  };

  let updateShortLeaveStatus = async (id, status) => {

    // status, reason, respondant
    const url = `${process.env.REACT_APP_API}/v1/shortLeave/${id}`;
    const newData = await sendData(url, status, reason);
    setSuccess(true);

  };

  useEffect(() => {

    if (success)
        setTimeout(function () { setSuccess(false); closeModal(); reload(); }, 2000);

}, [success])

  return (
    <div
      style={{
        width: "100%",
        borderBottom: "1px solid #69a8e2",
        borderRadius: "0px",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: fullCard ? "#2575c0" : "#ffffff",
      }}
    >
      <div
        style={{
          backgroundColor: fullCard ? "#2575c0" : "#ffffff",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >

         <img
        style={{
          height: "40px",
          width: "40px",
          borderRadius: "50%",
          boxShadow:
            "0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19)",
        }}
        src={item.studentId.photo}
        alt="user"
      />

        <div style={{ marginLeft: "10px", display: "inline", width: "90px" }}>
          <h4
            style={{
              color: fullCard ? "#ffffff" : "#2575c0",
              fontSize: "15px",
              fontWeight: "700",
              letterSpacing: "1px",
              margin: "0",
            }}
          >
            {item.studentId.RegNo}
          </h4>
        </div>

        <div style={{ marginLeft: "10px", display: "inline", width: "200px" }}>
          <h4
            style={{
              color: fullCard ? "#ffffff" : "#2575c0",
              fontSize: "15px",
              fontWeight: "700",
              letterSpacing: "1px",
              margin: "0",
            }}
          >
            {item.studentId.name}
          </h4>
        </div>

        <div style={{ display: "inline", textAlign: "center" }}>
          <h3
            style={{
              color: fullCard ? "#ffffff" : "#2575c0",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1px",
              margin: "0",
            }}
          >
            Parent
          </h3>
          <h3
            style={{
              color: fullCard ? "#ffffff" : "#2575c0",
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "1px",
              margin: "0",
            }}
          >
            {item.parentId.name}
          </h3>
        </div>


        <div style={{ display: "inline", textAlign: "center", width: '150px' }}>
          <h4
            style={{
              color: fullCard ? "#ffffff" : "#2575c0",
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "1px",
              margin: "0",
            }}
          >
            {moment(item.date.valueOf()).format("LL")}
          </h4>
        </div>

        {fullCard ? null : (
          <div
            style={{ width: "100px", display: "inline", textAlign: "center" }}
          >
            <h4
              style={{
                color: item.status == "Cancelled" ? "red" : item.status === 'Approved' ? "green" : '#2575c0',
                fontSize: "12px",
                fontWeight: "400",
                letterSpacing: "1px",
                margin: "0",
              }}
            >
              {item.status}
            </h4>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {fullCard ? (
            <button
              disabled={item.status === "Cancelled" || item.status === "Approved"}
              onClick={() => {

                // logic here
                setIsOpen(true);

              }}
              style={{
                marginRight: "5px",
                width: "90px",
                height: "30px",
                fontSize: "12px",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                border: "none",
                color: "#2575c0",
              }}
            >
              {item.status == "Pending" ? "Approve" : item.status}{" "}
            </button>
          ) : null}

          {fullCard && item.status === 'Pending' ? (
            <button
              disabled={item.status === "Cancelled" || item.status === "Approved"}
              onClick={() => {

                // logic here
                setCancelStatus(true);
                setIsOpen(true);

              }}
              style={{
                marginRight: "5px",
                width: "90px",
                height: "30px",
                fontSize: "12px",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                border: "none",
                color: "#2575c0",
              }}
            >
              {'Cancel'}{" "}
            </button>
          ) : null}


          <button
            onClick={() => {
              toggleCard();
            }}
            style={{
              width: "70px",
              height: "30px",
              fontSize: "12px",
              borderRadius: "10px",
              backgroundColor: fullCard ? "#ffffff" : "#2575c0",
              border: "none",
              color: fullCard ? "#2575c0" : "#ffffff",
            }}
          >
            {fullCard ? "Hide" : "View"}{" "}
          </button>
        </div>
      </div>



      {/* MODAL  */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {success ?

          <div style={{ width: '300px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>


            <img style={{ width: '150px' }} src="https://img.icons8.com/external-flat-02-chattapat-/500/000000/external-success-business-management-flat-02-chattapat-.png" />
            <p style={{ marginTop: '3px', color: '#2575c0', fontSize: '40px', fontWeight: '700', letterSpacing: '2px' }}> Success </p>

          </div>

          :

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>

            <p style={{ marginTop: '-8px', color: '#2575c0', fontSize: '27px', fontWeight: '600', letterSpacing: '2px' }}> Reason </p>

            <textarea autoFocus className='noFocus noScroll' style={{ marginTop: '-8px', backgroundColor: 'rgba(255, 255, 255, 0.75)', height: '80px', width: '300px', margin: '0px', border: 'none', borderRadius: '8px' }} type="text" value={reason} onChange={(e) => { setreason(e.target.value) }} />

            <div style={{ width: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <button style={{ paddingLeft: '15px', paddingRight: '15px', height: '36px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#ffffff', backgroundColor: '#2575c0', border: 'none', borderRadius: '8px', margin: '5px', marginTop: '20px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 4px 0 rgba(0, 0, 0, 0.19)' }} type="button" onClick={() => {
                // logic
                if (CancelStatus) {
                  updateShortLeaveStatus(item._id, 'Cancelled');
                }
                else {
                  updateShortLeaveStatus(item._id, 'Approved');
                }
              }}>  <p style={{ display: 'inline' }}> Submit </p> </button>
              <button style={{ paddingLeft: '15px', paddingRight: '15px', height: '36px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#ffffff', backgroundColor: '#ff7759', border: 'none', borderRadius: '8px', margin: '5px', marginTop: '20px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 4px 0 rgba(0, 0, 0, 0.19)' }} type="button" onClick={() => {
                // logic
                closeModal();
              }}>  <p style={{ display: 'inline' }}> Cancel </p> </button>
            </div>

          </div>}

      </Modal>


      {fullCard ? (
        <div style={{ display: "inline", textAlign: "left", padding: "8px" }}>
          <h4
            style={{
              color: fullCard ? "#ffffff" : "#2575c0",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1px",
              margin: "0",
              marginLeft: "10px",
            }}
          >
            Reason {item.status === 'Cancelled' ? 'Of Cancellation' : item.status === "Approved" ? 'Of Short Leave' : null}
          </h4>
          <h4
            style={{
              color: fullCard ? "#ffffff" : "#2575c0",
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "1px",
              margin: "0",
              marginLeft: "10px",
            }}
          >
            {item.status === "Pending" ? 'Not available yet.' : item.reason}
          </h4>
        </div>
      ) : null}
    </div>
  );
}

export default ShortLeaveCard;
