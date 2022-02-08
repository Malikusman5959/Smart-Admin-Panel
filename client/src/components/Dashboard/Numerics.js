import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';


function Numerics() {

    const [date, setdate] = useState({
        type : 'TODAY',
        date : moment().format('L')
    });
    const [complaints, setcomplaints] = useState(0);
    const [fines, setfines] = useState(0);
    const [violations, setviolations] = useState(0);
    const [visits, setvisits] = useState(0);

    const getdata = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let fetchComplaints = async () => {
        const url = `${process.env.REACT_APP_API}/v1/adminComplaint`;
        const newData = await getdata(url);
        console.log(newData);
        console.log(newData.data.complaint);
        const filteredResult = newData.data.complaint.filter(item => item.date >= date.date);
        console.log(filteredResult);
        setcomplaints(filteredResult.length);
    };

    let fetchFines = async () => {
        const url = `${process.env.REACT_APP_API}/v1/adminFine`;
        const newData = await getdata(url);
        const filteredResult = newData.data.fine.filter(item => item.date >= date.date);
        setfines(filteredResult.length);
    };

    let fetchViolations = async () => {
        const url = `${process.env.REACT_APP_API}/v1/adminViolation`;
        const newData = await getdata(url);
        const filteredResult = newData.data.violation.filter(item => item.date >= date.date);
        setviolations(filteredResult.length);
    };

    let fetchVisits = async () => {
        const url = `${process.env.REACT_APP_API}/v1/visit`;
        const newData = await getdata(url);
        const filteredResult = newData.data.visit.filter(item => item.date >= date.date);
        setvisits(filteredResult.length);
    };


    useEffect(() => {

        fetchComplaints();
        fetchFines();
        fetchViolations();
        fetchVisits();

    }, [date])


    return (

        complaints !== null && fines !== null && violations != null ?
            <div style={{marginLeft : '10px',  display: 'flex', flexDirection: 'row', height: '280px', width: '870px', justifyContent: 'center' }}>
                
                <div onClick={()=>{ 
                    date.type  === 'TODAY' ? setdate({
                        type : 'WEEKLY',
                        date : moment().subtract(7, 'days').format('L')
                    }) :
                    setdate ({
                        type : 'TODAY',
                        date : moment().format('L')
                    })
                }} style={{ margin: '6px', marginTop: '5px', width: '162px', height: '90px', backgroundColor: '#2575c0', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',  borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                   <div style={{ fontSize: '27px', fontWeight: 'bold', color: '#ffffff' , marginTop : '5px' }}> {date.type} </div>
                    <p style={{ color: '#ffffff', textAlign : 'center' , letterSpacing: '2px', margin: 0, fontSize: '13px' }}>
                    {date.type === 'TODAY' ? moment().format('ll') : 'since'}
                    <br/>
                    {date.type === 'TODAY' ? moment().format('dddd') : moment().subtract(7, 'days').format('ll')}
                     </p>

                </div>

                <div style={{ margin: '6px', marginTop: '5px', width: '162px', height: '90px', backgroundColor: '#ffffff', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',  borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ fontSize: '45px', fontWeight: 'bold', color: '#2575c0' }}> {fines} </div>
                    <p style={{ color: '#2575c0', letterSpacing: '2px', margin: 0, fontSize: '13px' }}> FINES </p>

                </div>
                <div style={{ margin: '6px', marginTop: '5px', width: '162px', height: '90px', backgroundColor: '#ffffff', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',  borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ fontSize: '45px', fontWeight: 'bold', color: '#2575c0' }}> {complaints} </div>
                    <p style={{ color: '#2575c0', letterSpacing: '2px', margin: 0, fontSize: '13px' }}> COMPLAINTS </p>

                </div>
                <div style={{ margin: '6px', marginTop: '5px', width: '162px', height: '90px', backgroundColor: '#ffffff', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',  borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ fontSize: '45px', fontWeight: 'bold', color: '#2575c0' }}> {violations} </div>
                    <p style={{ color: '#2575c0', letterSpacing: '2px', margin: 0, fontSize: '13px' }}> VIOLATIONS </p>

                </div>

                <div style={{ margin: '6px', marginTop: '5px', width: '162px', height: '90px', backgroundColor: '#ffffff', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',  borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ fontSize: '45px', fontWeight: 'bold', color: '#2575c0' }}> {visits} </div>
                    <p style={{ color: '#2575c0', letterSpacing: '2px', margin: 0, fontSize: '13px' }}> VISITS </p>

                </div>
            </div>
            : null

    )
}

export default Numerics
