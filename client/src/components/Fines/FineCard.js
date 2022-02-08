import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";

function FineCard({ item, setselected, setModalShow }) {
  console.log(item);
  return (
    <div
    onClick={() => {
      setModalShow(true);
      setselected(item);
    }}
      style={{
        backgroundColor: "#ffffff",
        boxShadow:
          "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19)",
        marginBottom: "10px",
        width: "97%",
        height: "40px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
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

      <div style={{ marginLeft: "10px", display: "inline" }}>
        <h3
          style={{
            color: "#2575c0",
            fontSize: "15px",
            fontWeight: "400",
            letterSpacing: "1px",
          }}
        >
          {item.RegNo}
        </h3>
      </div>

      <div style={{ marginLeft: "10px", display: "inline", width: "200px"  }}>
        <h3
          style={{
            color: "#2575c0",
            fontSize: "15px",
            fontWeight: "400",
            letterSpacing: "1px",
          }}
        >
          {item.studentId.name}
        </h3>
      </div>

      <div style={{ display: "inline", width: "140px" }}>
        <h4
          style={{
            color: "#2575c0",
            fontSize: "15px",
            fontWeight: "400",
            letterSpacing: "1px",
          }}
        >
          {item.violationName}
        </h4>
      </div>

      <div style={{ display: "inline", width: "100px", textAlign: "center" }}>
        <h4
          style={{
            color: "#2575c0",
            fontSize: "15px",
            fontWeight: "400",
            letterSpacing: "1px",
          }}
        >
           {item.amount} PKR
        </h4>
      </div>

      <div style={{ display: "inline", width: "100px", textAlign: "end" , textAlign : 'center' }}>
        <h4
          style={{
            color: item.status === 'Pending' ? 'red' : "green",
            fontSize: "15px",
            fontWeight: "400",
            letterSpacing: "1px",
          }}
        >
          {item.status}
        </h4>
      </div>

      <div style={{ display: "inline", width: "120px", textAlign: "end" }}>
        <h4
          style={{
            color: "#2575c0",
            fontSize: "15px",
            fontWeight: "400",
            letterSpacing: "1px",
          }}
        >
          {moment(item.date).format("ll")}
        </h4>
      </div>

      {/* <div style={{ display: "inline", width: "120px", textAlign: "end" }}>
        <h4
          style={{
            color: "#2575c0",
            fontSize: "15px",
            fontWeight: "400",
            letterSpacing: "1px",
          }}
          className="btn-hover"
          onClick={() => {
            setModalShow(true);
          }}
        >
          View Detial
        </h4>
      </div> */}
      {/* <div style={{ display: "inline", width: "120px", textAlign: "end" }}>
        <h4
          style={{
            color: "#2575c0",
            fontSize: "15px",
            fontWeight: "400",
            letterSpacing: "1px",
          }}
          className="btn-hover"
        >
          Submit Fine
        </h4>
      </div> */}
    </div>
  );
}

export default FineCard;
