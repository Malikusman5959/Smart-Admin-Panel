import React , {useState , useEffect} from 'react'
import {Bar} from 'react-chartjs-2'
import moment from 'moment';
import axios from 'axios';

function BarChart() {


    const [data, setdata] = useState({
        labels : [ moment().format('MMM ') , moment().subtract(1, 'months').format('MMM ') , moment().subtract(2, 'months').format('MMM ')],
        datasets : [
            {
                label : 'Violations',
                data : [12 , 15 , 14],
                borderColor: '#2575c0',
                backgroundColor: '#2575c0',
            },
            {
                label : 'Fines',
                data : [ 2 , 3 , 1],
                borderColor: '#de5349',
                backgroundColor: '#de5349',
            }
        ]
    })

    const [fines, setfines] = useState(null);
    const [violations, setviolations] = useState(null);

  
    let filterData = (data, month) => {
        const filteredResult = data.filter((item) => {return (moment(item.date).format('MMM ') === month )});
        return filteredResult.length
    };

    const getdata = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let fetchFines = async () => {
        const url = `${process.env.REACT_APP_API}/v1/adminFine`;
        const newData = await getdata(url);
        const filteredResult = newData.data.fine;
        setfines(filteredResult);
    };

    let fetchViolations = async () => {
        const url = `${process.env.REACT_APP_API}/v1/adminViolation`;
        const newData = await getdata(url);
        const filteredResult = newData.data.violation;
        setviolations(filteredResult);
    };

    useEffect(() => {

      fetchFines();
      fetchViolations();

    }, [])

    useEffect(() => {

        if(fines && violations)
        {
            setdata({
                labels : [ moment().format('MMM ') , moment().subtract(1, 'months').format('MMM ') , moment().subtract(2, 'months').format('MMM ')],
                datasets : [
                    {
                        label : 'Violations',
                        data : [filterData(violations , moment().format('MMM ')) , filterData(violations , moment().subtract(1, 'months').format('MMM ')) , filterData(violations , moment().subtract(2, 'months').format('MMM '))],
                        borderColor: '#2575c0',
                        backgroundColor: '#2575c0',
                    },
                    {
                        label : 'Fines',
                        data : [filterData(fines , moment().format('MMM ')) , filterData(fines , moment().subtract(1, 'months').format('MMM ')) , filterData(fines , moment().subtract(2, 'months').format('MMM '))],
                        borderColor: '#de5349',
                        backgroundColor: '#de5349',
                    }
                ]
            })

        }

    }, [fines, violations])


    return (
        <Bar data={data}/>
    )
}

export default BarChart
