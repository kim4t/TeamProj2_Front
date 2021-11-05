import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {useHistory, useLocation} from "react-router-dom";
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

const {useState} = require("react");
export default function Login() {
    const [response, setResponse] = useState();
    let history = useHistory();

    const submit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);        
        /*console.log({
          email: data.get('email'),
          password: data.get('password'),
        }); */
        login(data);
        if (response) {
            localStorage.setItem("user", response.userName);
            console.log(response);
            history.push("/")
        }
      };

    function login(data) {
        var email =  data.get('email');
        var pass = data.get('password');

        console.log(email, pass);
        const specs = {
            method: 'POST',
            headers: {'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify({userName: email, password: pass})
        };
        fetch("http://localhost:8080/api/auth", specs)
            .then(response => response.json())
            .then(data => setResponse(data));
     
    }
    return(
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1> LOGIN</h1>
            <Box component="form" onSubmit={submit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 5}}
              >
            Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>


    );


}