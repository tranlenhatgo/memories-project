import useStyle from './styles';
import { Avatar, Button, Container, Grid, Paper, Typography  } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import React, { useState } from 'react';
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; //useHistory is now useNavigate

import Input from './Input';
import { signIn, signUp } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

//Sign up and Sign in form
const Auth = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (isSignUp) {
        dispatch(signUp(formData, navigate));
      } else {
        dispatch(signIn(formData, navigate));
      }

    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const switchMode = () => {
      setIsSignUp((prevIsSignUp) => !prevIsSignUp);
      setShowPassword(false);
    };

    const getProfileObj = (credential) => {
      const token = credential;
      const profile = jwtDecode(token);
      return {
        email: profile.email,
        familyName: profile.family_name,
        givenName: profile.given_name,
        googleId: profile.sub,
        imageUrl: profile.picture,
        name: profile.name,
      };
    }

    const handleCredentialResponse = (res) => {
      const result = res ? getProfileObj(res?.credential) : undefined;
      const token = res?.credential;
      try {
        dispatch({ type: 'AUTH', data: { result, token } });
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    };
  
    useGoogleOneTapLogin({
      googleAccountConfigs: {
        client_id:
          "590338034860-88qek55hknjsui21dpopgoud8oor5jk6.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      },
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (error) => console.log(error),
    });

    // change the state of showPassword from true to false or vice versa
    const handleShowPassword = () =>
      setShowPassword((prevShowPassword) => !prevShowPassword);
    
    return (
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="h5">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit}>

            <Grid container spacing={2}>

              {/* fist name and last name fields for sign up */}
              { isSignUp && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}

              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />

              {/* repeat password field for sign up */}
              { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }

            </Grid>

            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}> 
              {isSignUp ? 'Sign Up' : 'Sign In'} 
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>

          </form>
        </Paper>
      </Container>
    );
};

export default Auth;