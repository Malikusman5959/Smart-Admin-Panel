import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2'

function DoughnutChart() {


    const [data, setdata] = useState({
        labels : [ 'Students' , 'Teachers' , 'Parents' , 'Guards'],
        datasets : [ 
            {
                data : [4 , 5 , 6 , 7],
                borderColor: ['#2575c0' , '#de5349' , '#99cc00' , '#fff01f'],
                backgroundColor: ['#2575c0' , '#de5349' , '#99cc00' , '#fff01f' ],
            }
    
        ]
    })

    const [students, setstudents] = useState(null);
    const [teachers, setteachers] = useState(null);
    const [parents, setparents] = useState(null);
    const [guards, setguards] = useState(null);

    const getdata = async (url) => {

        let res = await axios.get(url);
        return res.data;
    };

    let fetchStudents = async () => {
        const url = `${process.env.REACT_APP_API}/v1/student`;
        const newData = await getdata(url);
        const filteredResult = newData.data.students;
        setstudents(filteredResult.length);
    };

    let fetchTeachers = async () => {
        const url = `${process.env.REACT_APP_API}/v1/teacher`;
        const newData = await getdata(url);
        const filteredResult = newData.data.teacher;
        setteachers(filteredResult.length);
    };

    let fetchParents = async () => {
        const url = `${process.env.REACT_APP_API}/v1/parent`;
        const newData = await getdata(url);
        const filteredResult = newData.data.parent;
        setparents(filteredResult.length);
    };

    let fetchGuards = async () => {
        const url = `${process.env.REACT_APP_API}/v1/guard`;
        const newData = await getdata(url);
        const filteredResult = newData.data.guard;
        setguards(filteredResult.length);
    };


    useEffect(() => {

        fetchStudents();
        fetchTeachers();
        fetchParents();
        fetchGuards();

    }, [])

    
    useEffect(() => {

       if (parents != null && teachers != null  && students != null )
       {
            setdata({
                labels : [ 'Students' , 'Teachers' , 'Parents' , 'Guards'],
                datasets : [
                    {
                        data : [students , teachers , parents , guards],
                        borderColor: ['#2575c0' , '#de5349' , '#99cc00' , '#fff01f'],
                        backgroundColor: ['#2575c0' , '#de5349' , '#99cc00' , '#fff01f' ],
                    }
            
                ]
            })
       }

    }, [parents , teachers , students , guards])

    return (
        <Doughnut data={data}/>
    )
}

export default DoughnutChart
