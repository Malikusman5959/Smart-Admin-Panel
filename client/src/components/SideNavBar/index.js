import React, { useState } from "react";
import "./style.css";

const SideNavBar = ({ tab, settab, setloggedIn }) => {
  return (
    <div
      style={{
        zIndex: "3",
        borderRadius: "20px",
        position: "fixed",
        top: 14,
        left: 14,
        backgroundColor: "#2575c0",
        minWidth: "17vw",
        height: "95vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      {/* Top Section */}
      <div style={{ padding: "7px" }}>
        {/* Dashboard */}
        <div
          style={{
            borderRadius: "12px",
            height: "55px",
            marginBottom: "8px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: tab.name == "Dashboard" ? "#ffffff" : "#2575c0",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "10px",
          }}
          className="li-hover"
          onClick={() => {
            settab({
              name: "Dashboard",
              icon: "https://img.icons8.com/windows/96/2575c0/increase-profits.png",
            });
          }}
        >
          <img
            style={{ width: "35px", height: "35px" }}
            src={
              tab.name == "Dashboard"
                ? "https://img.icons8.com/windows/96/2575c0/increase-profits.png"
                : "https://img.icons8.com/windows/96/ffffff/increase-profits.png"
            }
          />
          <p
            style={{
              letterSpacing: "1px",
              fontFamily: "Roboto, sans-serif",
              color: tab.name == "Dashboard" ? "#2575c0" : "#ffffff",
              fontWeight: "500",
              marginLeft: "8px",
            }}
          >
            Dashboard
          </p>
        </div>

        {/* Fines */}
        <div
          style={{
            borderRadius: "12px",
            height: "55px",
            marginBottom: "8px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: tab.name == "Fines" ? "#ffffff" : "#2575c0",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "2px",
          }}
          className="li-hover"
          onClick={() => {
            settab({
              name: "Fines",
              icon: "https://img.icons8.com/ios-glyphs/64/2575c0/money--v1.png",
            });
          }}
        >
          <img
            style={{marginLeft : '7px', marginRight : '2px', width: "35px", height: "35px" }}
            src={
              tab.name == "Fines"
                ? "https://img.icons8.com/ios-glyphs/55/2575c0/money--v1.png"
                : "https://img.icons8.com/ios-glyphs/55/ffffff/money--v1.png"
            }
          />
          <p
            style={{
              letterSpacing: "1px",
              fontFamily: "Roboto, sans-serif",
              color: tab.name == "Fines" ? "#2575c0" : "#ffffff",
              fontWeight: "500",
              marginLeft: "7px",
            }}
          >
            Fines
          </p>
        </div>

        {/* Complaints */}
        <div
          className="li-hover"
          style={{
            borderRadius: "12px",
            height: "55px",
            marginBottom: "8px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: tab.name == "Complaints" ? "#ffffff" : "#2575c0",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "10px",
          }}
          onClick={() => {
            settab({
              name: "Complaints",
              icon: "https://img.icons8.com/ios-filled/50/2575c0/gender-neutral-user.png",
            });
          }}
        >
          <img
            style={{ width: "32px", height: "32px" }}
            src={
              tab.name == "Complaints"
                ? "https://img.icons8.com/ios-filled/50/2575c0/gender-neutral-user.png"
                : "https://img.icons8.com/ios-filled/50/ffffff/gender-neutral-user.png"
            }
          />
          <p
            style={{
              letterSpacing: "1px",
              fontFamily: "Roboto, sans-serif",
              color: tab.name == "Complaints" ? "#2575c0" : "#ffffff",
              fontWeight: "500",
              marginLeft: "11px",
            }}
          >
            Complaints
          </p>
        </div>

        {/* Visitors */}
        <div
          className="li-hover"
          style={{
            borderRadius: "12px",
            height: "55px",
            marginBottom: "8px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: tab.name == "Visitors" ? "#ffffff" : "#2575c0",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "10px",
          }}
          onClick={() => {
            settab({
              name: "Visitors",
              icon: "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/2575c0/external-report-news-kiranshastry-solid-kiranshastry.png",
            });
          }}
        >
          <img
            style={{ width: "32px", height: "32px" }}
            src={
              tab.name == "Visitors"
                ? "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/2575c0/external-report-news-kiranshastry-solid-kiranshastry.png"
                : "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/ffffff/external-report-news-kiranshastry-solid-kiranshastry.png"
            }
          />
          <p
            style={{
              letterSpacing: "1px",
              fontFamily: "Roboto, sans-serif",
              color: tab.name == "Visitors" ? "#2575c0" : "#ffffff",
              fontWeight: "500",
              marginLeft: "11px",
            }}
          >
            Visitors
          </p>
        </div>

        {/* Circulars */}
        <div
          className="li-hover"
          style={{
            borderRadius: "12px",
            height: "55px",
            marginBottom: "8px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: tab.name == "Circulars" ? "#ffffff" : "#2575c0",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "10px",
          }}
          onClick={() => {
            settab({
              name: "Circulars",
              icon: "https://img.icons8.com/material-rounded/24/2575c0/guarantee.png",
            });
          }}
        >
          <img
            style={{ width: "32px", height: "32px" }}
            src={
              tab.name == "Circulars"
                ? "https://img.icons8.com/material-rounded/24/2575c0/guarantee.png"
                : "https://img.icons8.com/material-rounded/24/ffffff/guarantee.png"
            }
          />
          <p
            style={{
              letterSpacing: "1px",
              fontFamily: "Roboto, sans-serif",
              color: tab.name == "Circulars" ? "#2575c0" : "#ffffff",
              fontWeight: "500",
              marginLeft: "11px",
            }}
          >
            Circulars
          </p>
        </div>

         {/* Short Leaves */}
       <div
          className="li-hover"
          style={{
            borderRadius: "12px",
            height: "55px",
            marginBottom: "8px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: tab.name == "Short Leaves" ? "#ffffff" : "#2575c0",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "10px",
          }}
          onClick={() => {
            settab({
              name: "Short Leaves",
              icon: "https://img.icons8.com/ios-filled/50/2575c0/leave.png",
            });
          }}
        >
          <img
            style={{ width: "25px", height: "25px" }}
            src={
              tab.name == "Short Leaves"
                ? "https://img.icons8.com/ios-filled/30/2575c0/leave.png"
                : "https://img.icons8.com/ios-filled/30/ffffff/leave.png"
            }
          />
          <p
            style={{
              letterSpacing: "1px",
              fontFamily: "Roboto, sans-serif",
              color: tab.name == "Short Leaves" ? "#2575c0" : "#ffffff",
              fontWeight: "500",
              marginLeft: "11px",
            }}
          >
            Short Leaves
          </p>
        </div>

      </div>


      



      {/* Bottom Section */}
      <div>
        <div
          style={{
            marginLeft: "8%",
            borderBottom: "0.5px ridge rgba(255, 255, 255, 0.40)",
            height: "40px",
            width: "80%",
            display: "flex",
            flexDirection: "row",
            backgroundColor: tab.name == "Logout" ? "#ffffff" : "#2575c0",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "10px",
          }}
        >
          <p
            className="blinker"
            style={{
              marginRight: "15px",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
            }}
          >
            {" "}
          </p>
          <p
            style={{
              letterSpacing: "1px",
              color: tab.name == "Logout" ? "#2575c0" : "#ffffff",
              fontWeight: "100",
            }}
          >
            {JSON.parse(localStorage.getItem("admin")).name}
          </p>
        </div>

        {/* Logout */}
        <div
          style={{
            borderRadius: "12px",
            height: "55px",
            marginBottom: "8px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: tab.name == "Logout" ? "#ffffff" : "#2575c0",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "18px",
          }}
          onClick={() => {
            settab({
              name: "Logout",
              icon: "https://img.icons8.com/ios-filled/50/2575c0/sign-in-form-password.png",
            });
            setloggedIn(false);
          }}
        >
          <img
            style={{ width: "32px", height: "32px" }}
            src={
              tab.name == "Logout"
                ? "https://img.icons8.com/ios-filled/50/2575c0/sign-in-form-password.png"
                : "https://img.icons8.com/ios-filled/50/ffffff/sign-in-form-password.png"
            }
          />
          <p
            style={{
              letterSpacing: "1px",
              fontFamily: "Roboto, sans-serif",
              color: tab.name == "Logout" ? "#2575c0" : "#ffffff",
              fontWeight: "500",
              marginLeft: "11px",
            }}
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
