'use strict';

//import crypto from 'crypto';
var crypto = require('crypto');
var hash = require('object-hash');
// import {Record} from '../record/record.model'


var validatePresenceOf = function(value) {
  return value && value.length;
};

export default function(sequelize, DataTypes) {
  var User = sequelize.define('User', {

    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dob: DataTypes.STRING,
    block_id: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'The specified email address is already in use.'
      },
      validate: {
        isEmail: true
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    provider: DataTypes.STRING,
    salt: DataTypes.STRING

  },

  {
    /**
     * Virtual Getters
     */
    getterMethods: {
      // Public profile information
      profile() {
        return {
          firstName: this.firstName,
          lastName: this.lastName,
          dob: this.dob,
          role: this.role,
          block_id: this.block_id
        };
      },

      // Non-sensitive info we'll be putting in the token
      token() {
        return {
          _id: this._id,
          role: this.role,
          block_id:this.block_id
        };
      }
    },

    /**
     * Pre-save hooks
     */
    hooks: {
      beforeBulkCreate(users, fields, fn) {
        var totalUpdated = 0;
        users.forEach(user => {
          user.updatePassword(err => {
            if(err) {
              return fn(err);
            }
            totalUpdated += 1;
            user.getHash(err => {
              if(err) {
                return fn(err);
              }
              // console.log("!!!!!!! totalUpdated: "+totalUpdated)
              // totalUpdated += 1;
              if(totalUpdated === users.length) {
                return fn();
              }
            });
          });
        });
      },
      beforeCreate(user, fields, fn) {
        // user.updatePassword(fn);
        user.updatePassword(err => {
          if(err) {
            return fn(err);
          }
          user.getHash(err => {
            if(err) {
              return fn(err);
            }
            return fn();
          });
        });
        // user.getHash(fn);
      },
      beforeUpdate(user, fields, fn) {
        if(user.changed('password')) {
          // return user.updatePassword(fn);
          return user.updatePassword(err => {
            if(err) {
              return fn(err);
            }
            user.getHash(err => {
              if(err) {
                return fn(err);
              }
              return fn();
            });
          });
        }
        // user.getHash(fn);
        fn();
      }
    },

    /**
     * Instance Methods
     */
    instanceMethods: {
      /**
       * Authenticate - check if the passwords are the same
       *
       * @param {String} password
       * @param {Function} callback
       * @return {Boolean}
       * @api public
       */
      authenticate(password, callback) {
        if(!callback) {
          return this.password === this.encryptPassword(password);
        }

        var _this = this;
        this.encryptPassword(password, function(err, pwdGen) {
          if(err) {
            callback(err);
          }

          if(_this.password === pwdGen) {
            callback(null, true);
          }
          else {
            callback(null, false);
          }
        });
      },

      /**
       * Make salt
       *
       * @param {Number} [byteSize] - Optional salt byte size, default to 16
       * @param {Function} callback
       * @return {String}
       * @api public
       */
      makeSalt(byteSize, callback) {
        var defaultByteSize = 16;

        if(typeof arguments[0] === 'function') {
          callback = arguments[0];
          byteSize = defaultByteSize;
        } else if(typeof arguments[1] === 'function') {
          callback = arguments[1];
        } else {
          throw new Error('Missing Callback');
        }

        if(!byteSize) {
          byteSize = defaultByteSize;
        }

        return crypto.randomBytes(byteSize, function(err, salt) {
          if(err) {
            callback(err);
          }
          return callback(null, salt.toString('base64'));
        });
      },

      /**
       * Encrypt password
       *
       * @param {String} password
       * @param {Function} callback
       * @return {String}
       * @api public
       */
      encryptPassword(password, callback) {
        if(!password || !this.salt) {
          return callback ? callback(null) : null;
        }

        var defaultIterations = 10000;
        var defaultKeyLength = 64;
        var salt = new Buffer(this.salt, 'base64');

        if(!callback) {
          return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
                       .toString('base64');
        }

        return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength,
          function(err, key) {
            if(err) {
              callback(err);
            }
            return callback(null, key.toString('base64'));
          });
      },

      /**
       * Update password field and Make hash
       *
       * @param {Function} fn
       * @return {String}
       * @api public
       */
      updatePassword(fn) {
        // Handle new/update passwords
        if(!this.password) return fn(null);

        if(!validatePresenceOf(this.password)) {
          fn(new Error('Invalid password'));
        }

        // Make salt with a callback
        this.makeSalt((saltErr, salt) => {
          if(saltErr) {
            return fn(saltErr);
          }
          this.salt = salt;
          this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
            if(encryptErr) {
              fn(encryptErr);
            }
            this.password = hashedPassword;

            fn(null);
          });
        });
      },


      /*
      * Hash Code Generator
      */

      makeHashCode(name,email,callback) {
        if(!name && !email && !role) {
          return callback ? callback(null) : null;
        }

        var userTest = {name: name, email: email};
        // console.log(userTest);
        var hashedUser = hash(userTest, { algorithm: 'md5', encoding: 'base64' });

        // console.log("Laura !!!!!"+salt+"\n\n\n\n\n"+"\n My hash "+hashedUser);

        if(!callback) {
          return hashedUser;
        }

        return callback(null,hashedUser);
      },

      getHash(fn) {
        if(this.block_id){
          return fn(null);
        }

        // Make hash with a callback
        this.makeHashCode(this.name,this.email,(hashErr,hash) => {
          if(!hashErr){
            fn(hashErr)
          }
          // console.log("!!!!!!!!! Scream Etti has gotten the Hash" +hash);
          this.block_id = hash;
          fn(null)
        });
      }
    }
  });

  return User;
}
