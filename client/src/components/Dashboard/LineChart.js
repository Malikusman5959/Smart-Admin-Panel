import React , {useState , useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import moment from 'moment';
import axios from 'axios';


function LineChart() {

    const [attendance, setAttendance] = useState([])
    const [data, setdata] = useState({
        labels : [  moment().subtract(6, 'days').format('ll') ,  moment().subtract(5, 'days').format('ll') ,  moment().subtract(4, 'days').format('ll') ,  moment().subtract(3, 'days').format('ll') ,  moment().subtract(2, 'days').format('ll') ,  moment().subtract(1, 'days').format('ll') ,  moment().format('ll')],
        datasets : [
            {
                label : 'OnLeave',
                data : [14 , 11 , 22 , 16 , 10 , 17 , 21],
                borderColor: '#2575c0',
                backgroundColor: '#2575c0',
            },
            {
                label : 'Absent',
                data : [10 , 8 , 21 , 12 , 15 , 21 , 13],
                borderColor: '#de5349',
                backgroundColor: '#de5349',
            },
            {
                label : 'Present',
                data : [30 , 41 , 56 , 28 , 40 , 43 , 32],
                borderColor: '#99cc00',
                backgroundColor: '#99cc00',
            }
        ]
    })

    let filterAttendance = (date,status) => {
        const filteredResult = attendance.filter((item) => {return (item.date === date && item.status === status)});
        return filteredResult.length;
    };

    const getdata = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };


    let fetchAttendance = async () => {
        const url = `${process.env.REACT_APP_API}/v1/adminAttendance`;
        const newData = await getdata(url);
        const filteredResult = newData.data.attendance;
        setAttendance(filteredResult);
        console.log(moment().subtract(6, 'days').format('L'));
        console.log(filterAttendance(moment().subtract(6, 'days').format('L') , 'Present') );
    };


    useEffect(() => {

      fetchAttendance()

    }, [])

    useEffect(() => {

        if(attendance.length !== 0)
        {
            setdata({
                labels : [  moment().subtract(6, 'days').format('ll') ,  moment().subtract(5, 'days').format('ll') ,  moment().subtract(4, 'days').format('ll') ,  moment().subtract(3, 'days').format('ll') ,  moment().subtract(2, 'days').format('ll') ,  moment().subtract(1, 'days').format('ll') ,  moment().format('ll')],
                datasets : [
                    {
                        label : 'OnLeave',
                        data : [filterAttendance(moment().subtract(6, 'days').format('L') , 'OnLeave') , filterAttendance(moment().subtract(5, 'days').format('L') , 'OnLeave') , filterAttendance(moment().subtract(4, 'days').format('L') , 'OnLeave') , filterAttendance(moment().subtract(3, 'days').format('L') , 'OnLeave') , filterAttendance(moment().subtract(2, 'days').format('L') , 'OnLeave') , filterAttendance(moment().subtract(1, 'days').format('L') , 'OnLeave') , filterAttendance(moment().format('L') , 'OnLeave')],
                        borderColor: '#2575c0',
                        backgroundColor: '#2575c0',
                    },
                    {
                        label : 'Absent',
                        data : [filterAttendance(moment().subtract(6, 'days').format('L') , 'Absent') , filterAttendance(moment().subtract(5, 'days').format('L') , 'Absent') , filterAttendance(moment().subtract(4, 'days').format('L') , 'Absent') , filterAttendance(moment().subtract(3, 'days').format('L') , 'Absent') , filterAttendance(moment().subtract(2, 'days').format('L') , 'Absent') , filterAttendance(moment().subtract(1, 'days').format('L') , 'Absent') , filterAttendance(moment().format('L') , 'Absent')],
                        borderColor: '#de5349',
                        backgroundColor: '#de5349',
                    },
                    {
                        label : 'Present',
                        data : [filterAttendance(moment().subtract(6, 'days').format('L') , 'Present') , filterAttendance(moment().subtract(5, 'days').format('L') , 'Present') , filterAttendance(moment().subtract(4, 'days').format('L') , 'Present') , filterAttendance(moment().subtract(3, 'days').format('L') , 'Present') , filterAttendance(moment().subtract(2, 'days').format('L') , 'Present') , filterAttendance(moment().subtract(1, 'days').format('L') , 'Present') , filterAttendance(moment().format('L') , 'Present')],
                        borderColor: '#99cc00',
                        backgroundColor: '#99cc00',
                    }
                ]
            })

        }

    }, [attendance])

    return (
        <Line data={data}/>
    )
}

export default LineChart
