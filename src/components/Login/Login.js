import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const initEmailState = {
  value: '',
  isValid: null
}

const initPasswordState = {
  value: '',
  isValid: null
}

const emailReducer = (state, action) => {
   switch(action.type) {
    case 'USER_INPUT': 
      return {value: action.val, isValid: action.val.includes('@')}
    case 'INPUT_BLUR': 
      return {value: state.value, isValid: state.value.includes('@')}
    default:
      throw new Error('Invalid action')
        
  }
}

const passwordReducer = (state, action) => {
  switch(action.type) {
    case 'USER_INPUT': 
      return {value: action.val, isValid: action.val.trim().length > 6}
    case 'INPUT_BLUR': 
      return {value: state.value, isValid: state.value.trim().length > 6}
    default:
      throw new Error('Invalid action')
        
  }
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, initEmailState)
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, initPasswordState)

  const {isValid: emailIsValid} = emailState
  const {isValid: passwordIsValid} =passwordState

  useEffect(() => {
    let timeout = setTimeout(() => {
      console.log('Ckecking')
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 1000)
    return () => {
      clearTimeout(timeout);
    }
  }, [emailIsValid, passwordIsValid])


  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // )
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // )
 
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login
