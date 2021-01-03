import React, { Component } from 'react';
import Joi, { errors } from 'joi-browser';
import Form from './common/form';
import * as userService from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form{

    state={
        data: {email: '', password: '', name: ''},
        errors: {}
    }

    schema={
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    }


  doSubmit = async () => {
    try {
      const res =  await userService.register(this.state.data);
      auth.loginWithJwt(res.headers['x-auth-token']);
      window.location = '/';
    } catch (ex) {
      if(ex.response && ex.response.status === 400){
        const errors = {...this.state.errors};
        errors.email = ex.response.data;
        this.setState({errors});
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Registraion Form</h1>
        <form onSubmit={this.handleSubmit}>
            {this.renderInput('email', 'email', 'email')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderInput('name', 'Name')}
            {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
