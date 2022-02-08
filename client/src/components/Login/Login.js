import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import './style.css'


const Login = ({setloggedIn}) => {

    let [ID, setID] = useState("");
    let [password, setPassword] = useState("");
    let [admin, setAdmin] = useState(null);
    const [error, seterror] = useState(null)

    // call an api 
    const getData = async (url, data) => {
        let res = await axios.post(url, data);
        return res.data;
    };

      let loginAdmin = async () => {
    
        const url = `${process.env.REACT_APP_API}/v1/login`;
        const newData = await getData(url, {
            "id" : ID, 
            "password" : password
        });
        console.log(newData.data)
        if (newData.status)
        {
            setAdmin(newData.data.admin);
            localStorage.setItem('admin', JSON.stringify(newData.data.admin));
            setID('');
            setPassword('')
            setloggedIn(true);
            
        }
        else{
            seterror(true);
            setID('');
            setPassword('')
        }
      };

      useEffect(() => {
          
          var admin = JSON.parse(localStorage.getItem('admin'));
          if (admin)
          {
              setID(admin.adminId);
              setPassword(admin.password);
          }
        
      }, [])


    return (
        <div class="container bootstrap snippets bootdey">
            <div class="bg"></div>
            <div class="bg bg2"></div>
            <div class="bg bg3"></div>
            <div class="row login-page">
                <div class="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
                    <img src="https://img.icons8.com/ios-glyphs/100/ffffff/user--v1.png" class="user-avatar img-thumbnail"/>
                    
                    
                        <div class="form-content">
                            
                            <div class="form-group">
                                <input type="text" class="form-control input-underline input-lg" placeholder="Login ID" value={ID} onChange={(e)=>{setID(e.target.value); seterror(null)}}/>
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control input-underline input-lg" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value); seterror(null)}}/>
                            </div>
                        </div>
                        {error ? 
                        <p style={{marginTop : '-20px' , fontWeight : '100px' , color : 'red'}}>Invalid id or password</p> : null}

                        <button onClick={()=>{loginAdmin()}}  class="btn btn-info btn-lg">
                            Signin
                        </button>
                    
                </div>
            </div>
        </div>
    );
};

export default Login;