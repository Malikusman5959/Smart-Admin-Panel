import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import TopBar from '../TopBar'
import BarChart from './BarChart'
import DoughnutChart from './DoughnutChart'
import LineChart from './LineChart'
import Numerics from './Numerics'
import './style.css'


function index({ tab }) {


    return (
        <div style={{ paddingLeft: '6px', marginLeft: '18vw', marginRight: '5px', backgroundColor: '#f0f1f2', width: '100%', height: '100%' }}>

            <TopBar heading={tab} />

            {/* Body */}
            <div style={{ marginTop: '100px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '50%', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Numerics/>
                    <div style={{ borderRadius: '15px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', height: '255px', width: '200px', backgroundColor: '#ffffff', padding: '5px', marginRight: '10px', marginTop: '6px' }}>
                        <p style={{ color: '#2575c0', fontSize: '20px', fontWeight: 'bold', letterSpacing: '1px', margin: "10px", textAlign: 'center' }}> USERS </p>
                        <DoughnutChart />
                    </div>
                </div>
                <div style={{ marginTop: '-185px', marginLeft: '13px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: '13px', padding: '20px', height: '345px', width: '560px', backgroundColor: '#ffffff' }}>
                    <div style={{ height: '340px', width: '550px' }}>

                        <LineChart />
                        <br />

                        <p style={{ color: '#2575c0', fontSize: '20px', fontWeight: 'bold', letterSpacing: '1px', margin: 0, textAlign: 'center' }}> WEEKLY ATTENDANCE REPORT</p>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '60%', justifyContent: 'space-around' }}>

                <div className='hero-image' style={{ borderRadius: '15px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', height: '210px', width: '469px', backgroundColor: '#ffffff', marginLeft: '614px', marginTop: '-210px' }}>

                    <CircularCard />
                </div>

            </div>

            <div style={{ padding : '8px' , paddingBottom : '0px' , borderRadius: '15px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', height: '150px', width: '230px', backgroundColor: '#ffffff', marginLeft: '629px', marginTop: '-383px' }}>
            <p style={{ color : '#2575c0' , fontSize : '13px' , fontWeight : 'bold' , letterSpacing : '1px' , margin : 0 , textAlign : 'center' , margin : '3px'}}> FINE VIOLATION RATIO</p>
 
              <BarChart/>
            </div>

        </div>
    )
}


function CircularCard() {

    const [circular, setcircular] = useState(null);

    const getdata = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let fetchCircular = async () => {
        const url = `${process.env.REACT_APP_API}/v1/adminCircular`;
        const newData = await getdata(url);
        const filteredResult = newData.data.circular.filter(item => item.date === moment().format('L'));
        if (filteredResult.length > 0) {
            setcircular(filteredResult[0])
        }
       
    };

    useEffect(() => {

        fetchCircular();
        // setcircular({
        //     classes: ["3A", "3B", "3C"],
        //     subject: "Billion Tree",
        //     date: "12/12/2021",
        //     body: "We’re currently urath everything new from Framer.We’re currently working on even more curated content and tutorials. Sign up below, and we’ll keep you up to date with everything new from Framer.We’re currently working on even more curated content and tutorials. Sign up below, and we’ll keep you up to date with everything new from Framer.",
        //   });

    }, [])


    return (
        <>
            {circular ?

                <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
                    <div style={{display : 'inline', textAlign : 'center', fontSize: '27px', fontWeight: 'bold', color: '#ffffff' , marginTop : '5px' }}> {circular.subject} </div>
                    <p className='circularBody' style={{ height : '95px' , overflow : 'scroll',  fontSize: '13px', fontWeight: '100', color: '#ffffff', letterSpacing: '0px', textAlign: 'center' }}> {circular.body} </p>
                    <p style={{ margin: '0', fontSize: '14px', fontWeight: '600', color: '#ffffff', letterSpacing: '1px', textAlign: 'end' }}> {moment(circular.date).format('ll')} </p>
               
                </div>
                :

                 <div style={{padding: '30px 75px 30px 75px'  , display: 'flex' , flexDirection : 'column', alignContent : 'center' , justifyContent : 'center'}}>
                    <p style={{fontSize: '18px', fontWeight : '100' , color: '#ffffff', letterSpacing : '0px' , textAlign : 'center'}}> You haven't posted any circulars lately. Want to post one?</p>
                    <button style={{alignSelf : 'center', backgroundColor : '#ffffff' ,fontSize: '15px', margin : '5px' , fontWeight : '100' , color: '#000000' , height : '40px' , width : '120px' , border: 'none' , borderRadius : '10px'}} > Post Now</button> 
                </div>

            }
        </>
    )
}

export default index
