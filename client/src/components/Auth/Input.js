import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// for clean code, we can create a separate Input component
const Input = ({name, handleChange, label, half, autoFocus, type, handleShowPassword}) => {
    return (
      <Grid item xs={6} sm={half ? 6 : 12}>
        <TextField
          name={name}
          label={label}
          onChange={handleChange}
          autoFocus={autoFocus}
          type={type}
          InputProps={name === 'password' ? { 
            endAdornment : (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === 'password' ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
           } : {}}
          variant="outlined"
          required
          fullWidth
          xs={6}
        />
      </Grid>
    );
};

export default Input;