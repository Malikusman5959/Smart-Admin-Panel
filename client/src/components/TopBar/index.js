import React from 'react'


function TopBar({heading , searchKey , setsearchKey}) {

    return (

        <div style={{zIndex : '2',  position : 'fixed', width : '81%' , height : '90px' , display : 'flex' , justifyContent : 'center' , alignItems : 'center'}}> 

             <div style={{borderRadius : '12px' ,   marginLeft : '3px' , width : '98.8%' , height : '85px' , display : 'flex' , flexDirection : 'row' , justifyContent : 'space-between' , alignItems : 'center' , 
             }}>

                <div style={{marginLeft : '39%' , display : 'flex' , flexDirection : 'row' , justifyContent : 'space-between' , alignItems : 'center'}}>
                <img style={{height : '40px' , marginRight : '10px'}} src={heading.icon}/>
                <p style={{color : '#2575c0' , fontSize : '30px' , fontWeight : 'bold' , letterSpacing : '3px'}}> {heading.name.toUpperCase()} </p>
                </div>

                {/* Selectors */}
                { heading.name == 'Dashboard' ? null : <div style={{marginRight : '15px'}}>
                <input style={{height : '28px',  width: '180px', marginRight: '5px', border: '2px solid #2575c0', borderRadius: '8px' }} type="text" value={searchKey} onChange={(e) => { setsearchKey(e.target.value) }} />
                    <button style={{height : '32px',fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#ffffff', width: '70px', backgroundColor: '#2575c0', border: '2px solid #2575c0', borderRadius: '8px' }} type="button" onClick={() => { console.log(true) }}> Search </button>
                </div>   }  

            </div>      

        </div>

    )
}

export default TopBar
