'use strict';
// @flow

type User = {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  password: string;
};

export default class LoginController {
  user: User = {
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Logged in, redirect to home
          this.$state.go('records');
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }
}
