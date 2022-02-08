import React, { useState, useEffect } from 'react'
import moment from 'moment';
import axios from 'axios';
import Modal from 'react-modal';
import './style.css'


function ComplaintDetail({ item, setselected, reload, report }) {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [success, setSuccess] = useState(false);
    const [CloseStatus, setCloseStatus] = useState(false);
    const [admin, setadmin] = useState(JSON.parse(localStorage.getItem('admin')));

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

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {

        if (success)
            setTimeout(function () { setSuccess(false); closeModal(); reload(); setselected(null); }, 2000);

    }, [success])

    const sendData = async (url, status, remarks) => {

        let res = await axios.patch(url, { "status": status, 'remarks': remarks, respondent: admin.name });
        return res.data;
    };

    let updateComplaintStatus = async (id, status) => {

        // status, remarks, respondant
        const url = `${process.env.REACT_APP_API}/v1/adminComplaint?id=${id}`;
        const newData = await sendData(url, status, remarks);
        setSuccess(true);

    };

    return (
        <>
            <button style={{ marginLeft: '20px', marginTop: '100px', height: '28px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#2575c0', width: '70px', backgroundColor: '#ffffff', border: '1px solid #2575c0', borderRadius: '8px' }} type="button" onClick={() => {
                setselected(null);
            }}> Back </button>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '40px', paddingTop: '20px' }}>

                {/* About Section */}
                <div style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.19)', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginTop: '50px', marginRight: '10px', width: '30%', height: '100%', minHeight: '350px', borderRadius: '15px' }}>


                    <img
                        style={{ marginTop: '15px', height: '140px', width: '140px', borderRadius: '50%', border: '5px solid #2575c0' }}
                        src={item.studentId.photo}
                        alt="user"
                    />

                    <div style={{ width: '100%', paddingLeft: '45px', marginLeft: '25px' }}>



                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row', marginBottom: '2px' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '600', letterSpacing: '0px', color: '#2575c0', margin: '0px' }}> RegNo   </p>
                            <p style={{ fontSize: '15px', fontWeight: '300', letterSpacing: '1px', color: '#2575c0', margin: '0px' }}> :   {item.RegNo} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row', marginBottom: '2px' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '600', letterSpacing: '0px', color: '#2575c0', margin: '0px' }}> Name   </p>
                            <p style={{ fontSize: '15px', fontWeight: '300', letterSpacing: '1px', color: '#2575c0', margin: '0px' }}> :   {item.studentId.name} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row', marginBottom: '2px' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '600', letterSpacing: '0px', color: '#2575c0', margin: '0px' }}> Subject   </p>
                            <p style={{ fontSize: '15px', fontWeight: '300', letterSpacing: '1px', color: '#2575c0', margin: '0px' }}> :   {item.subject} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row', marginBottom: '2px' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '600', letterSpacing: '0px', color: '#2575c0', margin: '0px' }}> Filed By   </p>
                            <p style={{ fontSize: '15px', fontWeight: '300', letterSpacing: '1px', color: '#2575c0', margin: '0px' }}> :   {item.filedBy.name} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row', marginBottom: '2px' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '600', letterSpacing: '0px', color: '#2575c0', margin: '0px' }}> Status   </p>
                            <p style={{ fontSize: '14px', fontWeight: '400', letterSpacing: '1px', color: item.status === 'Pending' ? 'red' : item.status === 'Closed' ? 'green' : 'orange', margin: '0px' }}> :   {item.status} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row', marginBottom: '2px' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '600', letterSpacing: '0px', color: '#2575c0', margin: '0px' }}> Date   </p>
                            <p style={{ fontSize: '15px', fontWeight: '300', letterSpacing: '1px', color: '#2575c0', margin: '0px' }}> :   {moment(item.date).format('ll')} </p>
                        </div>

                    </div>


                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.19)', marginTop: '50px', marginLeft: '10px', width: '45%', height: '80%', minHeight: '350px', borderRadius: '15px' }}>

                    {/* Detail */}
                    <div style={{ padding: '0px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <p style={{ color: '#2575c0', fontWeight: '500', letterSpacing: '2px' }}> Description </p>
                        <div style={{ alignSelf: 'center' }}>

                            <div className='noScroll' style={{ color: '#2575c0', width: '400px', maxHeight: '80px', overflow: 'scroll', fontWeight: '300', letterSpacing: '1px', fontSize: '14px' }} >  {item.description}</div>

                        </div>

                    </div>

                    {/* remarks */}
                    <div style={{ padding: '0px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <p style={{ color: '#2575c0', fontWeight: '500', letterSpacing: '2px' }}> Remarks </p>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                            <div className='noScroll' style={{ textAlign: 'center', color: '#2575c0', width: '400px', maxHeight: '60px', overflow: 'scroll', fontWeight: '300', letterSpacing: '1px', fontSize: '14px' }} >  {item.status === 'Pending' ? 'No remarks yet' : item.remarks} </div>

                        </div>
                    </div>

                    <p style={{ marginTop: '0', fontSize: '13px', alignSelf: 'end', marginRight: '28px', color: '#2575c0', fontWeight: '500', letterSpacing: '2px' }}> {item.status === 'Pending' ? null : 'by ' + item.respondent} </p>


                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        {item.status === 'Closed' ? null : <button style={{ paddingLeft: '15px', paddingRight: '15px', height: '36px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#ffffff', backgroundColor: item.status === 'Pending' ? '#2575c0' : '#57e031', border: 'none', borderRadius: '8px', margin: '5px', marginTop: '20px' }} type="button" onClick={() => {

                            if (item.status === 'Under Investigation') {
                                setCloseStatus(true);
                            }
                            setIsOpen(true);

                        }}>  <p style={{ display: 'inline' }}> {item.status === 'Pending' ? 'Respond' : 'Mark as Resolved'} </p> </button>
                        }


                        {item.status !== 'Pending' ? null : <button style={{ paddingLeft: '15px', paddingRight: '15px', height: '36px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#ffffff', backgroundColor: '#ff7759', border: 'none', borderRadius: '8px', margin: '5px', marginTop: '20px' }} type="button" onClick={() => {
                            setCloseStatus(true);
                            setIsOpen(true);
                        }}>  <p style={{ display: 'inline' }}> Close </p> </button>
                        }
                    </div>


                </div>

            </div>

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


                        <p style={{ marginTop: '-8px', color: '#2575c0', fontSize: '27px', fontWeight: '600', letterSpacing: '2px' }}> REMARKS </p>

                        <textarea autoFocus className='noFocus noScroll' style={{ marginTop: '-8px', backgroundColor: 'rgba(255, 255, 255, 0.75)', height: '80px', width: '300px', margin: '0px', border: 'none', borderRadius: '8px' }} type="text" value={remarks} onChange={(e) => { setRemarks(e.target.value) }} />

                        <div style={{ width: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <button style={{ paddingLeft: '15px', paddingRight: '15px', height: '36px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#ffffff', backgroundColor: '#2575c0', border: 'none', borderRadius: '8px', margin: '5px', marginTop: '20px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 4px 0 rgba(0, 0, 0, 0.19)' }} type="button" onClick={() => {
                                // logic
                                if (CloseStatus) {
                                    updateComplaintStatus(item._id, 'Closed');
                                }
                                else {
                                    updateComplaintStatus(item._id, 'Under Investigation');
                                }
                            }}>  <p style={{ display: 'inline' }}> Submit </p> </button>
                            <button style={{ paddingLeft: '15px', paddingRight: '15px', height: '36px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#ffffff', backgroundColor: '#ff7759', border: 'none', borderRadius: '8px', margin: '5px', marginTop: '20px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 4px 0 rgba(0, 0, 0, 0.19)' }} type="button" onClick={() => {
                                // logic
                                closeModal();
                            }}>  <p style={{ display: 'inline' }}> Cancel </p> </button>
                        </div>

                    </div>}

            </Modal>


        </>
    )
}

export default ComplaintDetail;


