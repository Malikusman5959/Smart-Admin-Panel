import React from "react";
import moment from "moment";

function ComplaintCardSquare({ item, setselected }) {
  return (
    <div class="card"  onClick={() => {
      setselected(item);
      // setModalShow(true);
    }}>
      <img src={item.studentId.photo} />
      <h1 className="nameHeading">{item.studentId.name}</h1>

      <table>
        <tr>
          <td className="leftData">
            <strong>Reg No</strong>
          </td>
          <td className="rightData">{item.RegNo}</td>
        </tr>
        <tr>
        <td className="leftData">
            <strong>Date</strong>
          </td>
          <td className="rightData">{item.date}</td>
        </tr>
        <tr>
        <td className="leftData">
            <strong>Status</strong>
          </td>
          <td className="rightData" style={{color : item.status === 'Pending' ? 'red' : 'green'}}>{item.status}</td>
        </tr>
      </table>
      <div class="social">
      </div>
    </div>
  );
}

export default ComplaintCardSquare;
