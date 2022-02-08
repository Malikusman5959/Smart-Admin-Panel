import React, { useState } from "react";
import SideNavBar from "./SideNavBar";
import Fines from "./Fines";
import Complaints from "./Complaints";
import Visitors from "./Visitors";
import ShortLeaves from "./ShortLeaves";
import Dashboard from "./Dashboard";
import Circulars from "./Circulars";

export function AdminHome({ setloggedIn }) {
  const [tab, settab] = useState({
    name: "Dashboard",
    icon: "https://img.icons8.com/windows/96/2575c0/increase-profits.png",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#f0f1f2",
      }}
    >
      {/* Left Section */}
      <SideNavBar tab={tab} settab={settab} setloggedIn={setloggedIn} />

      {/* Right Section */}
      {tab.name === "Fines" && <Fines tab={tab} />}
      {tab.name === "Complaints" && <Complaints tab={tab} />}
      {tab.name === "Visitors" && <Visitors tab={tab} />}
      {tab.name === "Short Leaves" && <ShortLeaves tab={tab} />}
      {tab.name === "Dashboard" && <Dashboard tab={tab} />}
      {tab.name === "Circulars" && <Circulars tab={tab} />}

    </div>
  );
}
