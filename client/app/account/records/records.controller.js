// 'use strict';
// @flow
// import angular from 'angular';
// import uiRouter from 'angular-ui-router';
// import routing from './main.routes';

type currentUser = {
  _id: integer;
};

export default class RecordsController {
  $http;
  $cookies;
  $location;
  Auth;
  // User;
  // user: currentUser = {
  //   _id: 0
  // };

  // user: User = {
  //   oldPassword: '',
  //   newPassword: '',
  //   confirmPassword: ''
  // };

  records = [];
  users = {};
  // chaincodeUrl = "http://9.28.242.61:7050/chaincode";
  // chaincodeUrl1 = "http://9.28.242.24:7050/chaincode";
  chaincodeUrl1 = "https://383097f792934cca95c24594dbbd5fcb-vp0.us.blockchain.ibm.com:5003/chaincode";
  chaincodeName = "c84b31ff4cd718a7d7d5895bee42d57ce28dcbe9138a776e5118bb8a12c7aa9910e33e6b1571bd109632091f2e94fd4d8db05d4822956b01196fdcde7615b45a"
  // chaincodeUrl1 = "http://9.28.242.62:7050/chaincode";
  // chaincodeUrl1 = "http://9.28.248.225:7050/chaincode";
  hideLoading = true;
  getCurrentUser: Function;
  user : currentUser ={
    _id:0
  } ;
  newRecord = '';
  blockChainResponse = [];

  /*@ngInject*/
  constructor($http,Auth,User,$cookies,$location) {
    this.$http = $http;
    // this.Auth = Auth;
    this.User = User;
    this.$cookies = $cookies;
    this.$cookies = $location;
    this.getCurrentUser = Auth.getCurrentUserSync;

    // this.chaincodeUrl = "http://9.28.242.61:7050/chaincode";
    // this.chaincodeUrl1 = "http://9.28.248.225:7050/chaincode";
    // console.log('here');
    if($cookies.get('token') && $location.path() !== '/logout') {
    }
  }



  $onInit() {
      this.myRecords();
      this.bcQuery();
  }

  myRecords(){
    this.$http.get('/api/users/me')
      .then(response => {
        this.user = response.data;
        // this.awesomeThings = response.data;
        console.log(this.user);
        this.$http.get('/api/records/' + this.user._id + '/records')
        .then(response => {
          console.log(response.data);
          this.records = response.data;
        })
      });
  }

  // Inserts record (approve/deny) to local DB
  createRecord(record) {
    if(record) {
      // console.log(angular.toJson(this.User.get()));
      this.$http.post('/api/records', {
        UserId: record._id,
        // trans_id: record.block_id,
        req_name: record.RequesterName,
        approved: record.Approve,
        date: new Date()
      });
      this.newRecord = '';
    }
  }

  bcInit(){

    var initData = {
      "jsonrpc": "2.0",
      "method": "deploy",
      "params": {
        "secureContext":"admin",
        "type": 1,
        "chaincodeID":{
          "name": chaincodeName
        },
        "ctorMsg": {
          "function":"init",
          "args": ["a", "1000", "b", "2000"]
        }
      },
      "id": 1
    }

    this.$http.post(this.chaincodeUrl1,initData)
    .then(response => {
      console.log("bcInvoke() success");
    },
    error =>{
      console.log("bcInvoke() fail " + JSON.stringify(error));
    });

  }

  bcInvoke(){
    var invokeData = {
      "jsonrpc": "2.0",
      "method": "invoke",
      "params": {
        "secureContext":"admin",
        "type": 1,
        "chaincodeID":{
          "name": chaincodeName
        },
      "ctorMsg": {
        "function":"invoke",
        "args":["b", "a", "50"]
      }
    },
    "id": 1
    }

    this.$http.post(this.chaincodeUrl1,invokeData)
    .then(response => {
      console.log("bcInvoke() success");
      // this.blockChainResponse.push( JSON.parse(JSON.parse(JSON.stringify(response.data)).result.message));
    },
    error =>{
      console.log("bcInvoke() fail " + JSON.stringify(error));
    });
  }

  bcQuery(){
    this.hideLoading = false
    var user = {};
    this.$http.get('/api/users/me')
      .then(response => {
        this.user = response.data;
        user.dob = this.user.dob
        user.firstName = this.user.firstName
        user.lastName = this.user.lastName
        // console.log(this.user);
        var queryData = {
          "jsonrpc": "2.0",
          "method": "query",
          "params": {
            "secureContext":"admin",
            "type": 1,
            "chaincodeID":{
              "name": chaincodeName
            },
            "ctorMsg": {
              "function":"getRequest",
              "args":[JSON.stringify(user)]
            }
          },
          "id": 1
        }
        console.log(queryData)
        this.$http.post(this.chaincodeUrl1,queryData)
        .then(response => {
          console.log("bcTest()1 success");
          this.hideLoading = true
          this.blockChainResponse = JSON.parse(JSON.parse(JSON.stringify(response.data)).result.message).Request;
        },
        error =>{
          console.log("bcTest() fail " + JSON.stringify(error));
        });

      });
    }

  approve(data) {
    console.log("approve");
    this.hideLoading = false
    var user = {};
    this.$http.get('/api/users/me')
      .then(response => {
        this.user = response.data;
        data.dob = this.user.dob
        data.firstName = this.user.firstName
        data.lastName = this.user.lastName
        delete data.PatientId
        data.Approve = true;
        console.log(data)
        var Data = {
          "jsonrpc": "2.0",
          "method": "invoke",
          "params": {
            "secureContext":"admin",
            "type": 1,
            "chaincodeID":{
              "name": chaincodeName
            },
          "ctorMsg": {
            "function":"approveTx",
            "args":[JSON.stringify(data)]
            // "args":["{\"dob\":\"23/11/1991\",\"firstName\":\"Emman\",\"lastName\":\"Etti\",\"approve\":true,\"Date\":\"05/12/2016\",\"requesterName\":\"\",\"userId\":\"1\"}" ]
          }
        },
        "id": 1
        }

        this.$http.post(this.chaincodeUrl1,Data)
        .then(response => {
          console.log("approve() success");
          this.hideLoading = true
          var index = this.blockChainResponse.indexOf(data);
          this.blockChainResponse.splice(index, 1);
          // this.$http.get('/api/users/me')
          // .then(response => {
          // data._id = response.data._id;
          // this.blockChainResponse.push( JSON.parse(JSON.parse(JSON.stringify(response.data)).result.message));
            data._id = this.user._id;
            this.createRecord(data);
            this.myRecords();
        },
        error =>{
          console.log("approve() fail " + JSON.stringify(error));
        });
    });
  }

  deny(data){
    console.log("deny");
    var user = {};
    this.$http.get('/api/users/me')
      .then(response => {
        this.user = response.data;
        data.dob = this.user.dob
        data.firstName = this.user.firstName
        data.lastName = this.user.lastName
        delete data.PatientId
        data.Approve = false;
        console.log(data)
        var Data = {
          "jsonrpc": "2.0",
          "method": "invoke",
          "params": {
            "secureContext":"admin",
            "type": 1,
            "chaincodeID":{
              "name": chaincodeName
            },
          "ctorMsg": {
            "function":"approveTx",
            "args":[JSON.stringify(data)]
            // "args":["{\"dob\":\"23/11/1991\",\"firstName\":\"Emman\",\"lastName\":\"Etti\",\"approve\":true,\"Date\":\"05/12/2016\",\"requesterName\":\"\",\"userId\":\"1\"}" ]
          }
        },
        "id": 1
        }

        this.$http.post(this.chaincodeUrl1,Data)
        .then(response => {
          console.log("approve() success");
          this.hideLoading = true
          var index = this.blockChainResponse.indexOf(data);
          this.blockChainResponse.splice(index, 1);
          // this.$http.get('/api/users/me')
          // .then(response => {
          // data._id = response.data._id;
          // this.blockChainResponse.push( JSON.parse(JSON.parse(JSON.stringify(response.data)).result.message));
            data._id = this.user._id;
            this.createRecord(data);
            this.myRecords();
        },
        error =>{
          console.log("approve() fail " + JSON.stringify(error));
        });
    });
  }

  // export default angular.module('healthchainWebApp.records',[uiRouter])
  //   .config(routing)
  //   .component

  // changePassword(form) {
  //   this.submitted = true;
  //
  //   if(form.$valid) {
  //     this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
  //       .then(() => {
  //         this.message = 'Password successfully changed.';
  //       })
  //       .catch(() => {
  //         form.password.$setValidity('mongoose', false);
  //         this.errors.other = 'Incorrect password';
  //         this.message = '';
  //       });
  //   }
  // }
}
