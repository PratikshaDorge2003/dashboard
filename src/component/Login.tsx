import React, { useState } from 'react';
import {  Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const [userName, setUserName] = useState("admin");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Submit = async () => {
    if (userName === "admin" && password === "1234") {
      navigate("/homepage");
    } else {
      setError("wrong credentials");
    }
  }

  return (
    <div>
      <div className='Container centerized'>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div className='FormDiv'>
            <div className='InnerDiv'>
              <div className='FormTitle'><h5>USER LOGIN</h5></div>
              <TextField
                style={{ width: "85%" }}
                margin="dense"
                id="userName"
                label="UserName"
                type="userName"
                value={userName}
                variant="outlined"
                color='success'
                required
                onChange={(event) => setUserName(event.target.value)}
              />
              <TextField
                style={{ width: "85%" }}
                margin="dense"
                id="password"
                label="Password"
                type="password"
                value={password}
                variant="outlined"
                color='success'
                required
                onChange={(event) => setPassword(event.target.value)}
              />
              <button className='FormBtn' type="button" onClick={Submit}>Log In</button>
            </div>
            <p style={{ color: "red" }}>{error}</p>
          </div>
        </Box>
       

      </div>

  


    </div>
  );
}

export default Authentication;
