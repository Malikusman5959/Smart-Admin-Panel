import React from 'react'
import moment from 'moment';


function ComplaintCardSquare({ item, setselected }) {

    return (
        <>

            <div onClick={()=>{setselected(item)}} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '40px', paddingTop: '20px' }}>

                {/* About Section */}
                <div style={{ backgroundColor: '#2575c0', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginTop: '50px', marginRight: '10px', width: '30%', height: '100%', minHeight: '350px', border: '2px solid #2575c0', borderRadius: '15px' }}>


                    <img
                        style={{ marginTop: '15px', height: '100px', width: '100px', borderRadius: '50%', border: '5px solid #ffffff' }}
                        src={item.studentId.photo}
                        alt="user"
                    />


                    <div style={{ width: '100%', paddingLeft: '25px', marginLeft: '25px' }}>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '500', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> RegNo   </p>
                            <p style={{ fontSize: '15px', fontWeight: '100', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> {item.RegNo} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '500', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> Name   </p>
                            <p style={{ fontSize: '15px', fontWeight: '100', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> :   {item.studentId.name} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '500', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> Filed By   </p>
                            <p style={{ fontSize: '15px', fontWeight: '100', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> :   {item.filedBy.name} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '500', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> Date   </p>
                            <p style={{ fontSize: '15px', fontWeight: '100', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> :   {item.date} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '500', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> Status   </p>
                            <p style={{ fontSize: '15px', fontWeight: '100', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> :   {item.status} </p>
                        </div>

                        {/* <div style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '500', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> Email   </p>
                            <p style={{ fontSize: '15px', fontWeight: '100', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> :   {email} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '500', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> PhNo   </p>
                            <p style={{ fontSize: '15px', fontWeight: '100', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}>:   {phone_number} </p>
                        </div> */}
                    </div>


                </div>

               




            </div>


        </>
    )
}

export default ComplaintCardSquare
