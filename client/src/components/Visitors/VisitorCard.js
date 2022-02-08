import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function VisitorCard({ item, setselected, reload }) {
  const [fullCard, setfullCard] = useState(false);

  const toggleCard = () => {
    setfullCard(!fullCard);
  };

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
         {item.visitorName} 
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
            Time In
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
            {item.timeIn}
          </h3>
        </div>

        <div style={{ display: "inline", textAlign: "center" }}>
          <h4
            style={{
              color: fullCard ? "#ffffff" : "#2575c0",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1px",
              margin: "0",
            }}
          >
            Time out
          </h4>
          <h4
            style={{
              color: fullCard ? "#ffffff" : "#2575c0",
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "1px",
              margin: "0",
            }}
          >
            {item.timeOut ? item.timeOut : '-'}
          </h4>
        </div>

        <div style={{ display: "inline", textAlign: "center" , width : '150px' }}>
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
                color: item.status == "Entered" ? "red" : "green",
                fontSize: "12px",
                fontWeight: "400",
                letterSpacing: "1px",
                margin: "0",
              }}
            >
              {item.status == "Entered" ? "Entered" : "Exited"}
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
              disabled={item.status == "Entered"}
              onClick={() => {}}
              style={{
                marginRight: "5px",
                width: "90px",
                height: "30px",
                fontSize: "12px",
                borderRadius: "10px",
                backgroundColor:  "#2575c0",
                border: "none",
                color: "#ffffff",
              }}
            >
              {item.status == "Entered" ? "Entered" : "Exited"}{" "}
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
            Purpose
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
            {item.purpose}
          </h4>
        </div>
      ) : null}
    </div>
  );
}

export default VisitorCard;
