// 'use strict';
// @flow
// import angular from 'angular';
// import uiRouter from 'angular-ui-router';
// import routing from './main.routes';

type currentUser = {
  _id: integer;
};

export default class PrescriptionController {
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
  // chaincodeUrl1 = "http://9.28.241.160:7050/chaincode";
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
    if($cookies.get('token') && $location.path() !== '/logout') {
    }
  }



  $onInit() {
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
      this.bcQuery();
  }

  createRecord(record) {
    if(record) {
      console.log(angular.toJson(this.User.get()));
      this.$http.post('/api/records', {
        user_id: angular.toJson(this.User.get())._id,
        trans_id: record.block_id,
        approved: false,
        date: new Date("27-10-2016")
      });
      this.newRecord = '';
    }
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
              "function":"getRecordPatient",
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
          this.blockChainResponse = JSON.parse(JSON.parse(JSON.stringify(response.data)).result.message).Record;
        },
        error =>{
          console.log("bcTest() fail " + JSON.stringify(error));
        });

      });
    }
}
