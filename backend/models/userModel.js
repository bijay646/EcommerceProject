const uuidv1 = require('uuidv1')
const crypto = require('crypto');
const { useInflection } = require('sequelize');

module.exports = (sequelize,DataTypes)=>{
     const User = sequelize.define("user",{
          userId:{
               type:DataTypes.INTEGER,
               primaryKey:true,
               autoIncrement:true
           },
           username: {
               type: DataTypes.STRING,
               allowNull: false
           },
           email:{
               type: DataTypes.STRING,
               allowNull: false
           },
           hashed_password:{
               type: DataTypes.STRING,
               allowNull: false
           },
           password:{
               type: DataTypes.VIRTUAL,
               set(password){
                    this._password=password;
                    this.setDataValue('salt', uuidv1());
                    this.setDataValue('hashed_password',this.encryptPassword(password));
               },
               get(){
                    return this.getDataValue('_password')
               }

           },
           isVerified:{
               type: DataTypes.BOOLEAN,
               defaultValue: false
           },
           role:{
               type: DataTypes.INTEGER,
               defaultValue: 0
           },
           salt: DataTypes.STRING

     },{timestamps: true})

     User.prototype.authenticate = function(pwd){
          return (this.hashed_password === this.encryptPassword(pwd)? true: false)
      }

     User.prototype.encryptPassword= function(password){
          if(!password){
              return ''
          }
          try{
              return crypto.createHmac('sha256', this.salt)
              .update(password)
              .digest('hex')
          }
          catch(error){
              return ''
          }
      }
      

     return User
}