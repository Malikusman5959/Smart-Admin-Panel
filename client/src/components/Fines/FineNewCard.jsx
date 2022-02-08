import React from "react";
import "./FineNewCard.css";
function FineNewCard({ item, setselected, setModalShow }) {
  return (
    <div class="card"  onClick={() => {
      setselected(item);
      setModalShow(true);
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
            <strong>Amount</strong>
          </td>
          <td className="rightData">{item.amount}</td>
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

export default FineNewCard;
