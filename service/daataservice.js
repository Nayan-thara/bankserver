//import jsonwebtoken
const jwt=require('jsonwebtoken')


//database
userDetails = {
  1000: { acno: 1000, username: "nivya", password: 123, balance: 0, transaction: [] },
  1001: { acno: 1001, username: "amritha", password: 123, balance: 0, transaction: [] },
  1002: { acno: 1002, username: "abhay", password: 123, balance: 0, transaction: [] },
  1003: { acno: 1003, username: "sree", password: 123, balance: 0, transaction: [] }
}


//register
register = (acno, uname, psw) => {
  if (acno in userDetails) {
    return {
      statusCode: 401,
      status: false,
      message: "user already exist"
    }
  }
  else {
    userDetails[acno] = { acno, username: uname, password: psw, balance: 0, transaction: [] }
    console.log(userDetails);
    return {
      statusCode: 200,
      status: true,
      message: "registration success"
    }
  }
}

//login
login = (acno, psw) => {



  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      const token=jwt.sign({currentAcno:acno},"secretkey123")                      //token generation

      return {
        statusCode: 200,
        status: true,
        message: "login success",
        token                                                                     //key , value same
      }

    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: "incorrect password"
      }
    }
  }
  else {
    return {
      statusCode: 401,
      status: false,
      message: "invalid acno"
    }
  }

}

//deposit
deposit = (acno, password, amount) => {

  var amnt = parseInt(amount) //convert to interger type
  if (acno in userDetails) {
    if (password == userDetails[acno]['password']) {
      userDetails[acno]['balance'] += amnt
      userDetails[acno]['transaction'].push({ type: 'CREDIT', amount: amnt }) //pushed element is object

      return {
        statusCode: 200,
        status: true,
        message: userDetails[acno]["balance"]
      }
    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: "invalid password"
      }
    }

  }
  else {
    return {
      statusCode: 401,
      status: false,
      message: "invalid acno"
    }
  }
}

//withdraw
withdraw=(acno,password,amount)=>{

  var amnt=parseInt(amount)
  if(acno in userDetails){
    if(password==userDetails[acno]['password']){
      if(amnt<=userDetails[acno]['balance']){
        userDetails[acno]['balance']-=amnt
        userDetails[acno]['transaction'].push({type:'DEBIT',amount:amnt}) //pushed element is object
       

        return {
          statusCode: 200,
          status: true,
          message: userDetails[acno]["balance"]
        }
       }
       else{
        return {
          statusCode: 401,
          status: false,
          message: "insufficient balance"
        }
       }
  }
  else{
   
    return {
      statusCode: 401,
      status: false,
      message: "incorrect password"
    }
  }
}
else{
 
  return {
    statusCode: 401,
    status: false,
    message: "invalid acno"
  }
}
}

//getransaction
gettransaction=(acno)=>{
  if(acno in userDetails){
    return  {
      statusCode: 200,
      status: true,
      message: userDetails[acno]['transaction']
    }
  }
 else{
  return {
    statusCode: 401,
    status: false,
    message: "invalid acno"
  }
 }
}

//exporting method
module.exports = {
  register,
  login,
  deposit,
  withdraw,
  gettransaction

}