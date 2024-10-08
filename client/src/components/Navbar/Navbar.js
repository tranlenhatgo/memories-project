import useStyles from "./styles.js";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from "../../images/memories.png";

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log("user ",user);

    useEffect(() => {
      const token = user?.token;
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }

      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
      try {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        navigate('/');
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <AppBar className={classes.appBar} position="static" color="inherit">

        <div className={classes.brandContainer}>
          <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography> 
          <img className={classes.image} src={memories} alt="memories" height="60" ></img>
        </div>

        <Toolbar className={classes.toolbar}>

          {user ? (
            //if user is logged in, display user's name and profile picture
              <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar> 
                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
              </div>
          ) : (
            //else, display Sign In button
              <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )}

        </Toolbar>
      </AppBar>
    );
};

export default Navbar;