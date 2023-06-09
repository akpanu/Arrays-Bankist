'use strict'; /////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
// Data

var account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  // %
  pin: 1111
};
var account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222
};
var account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333
};
var account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444
};
var accounts = [account1, account2, account3, account4]; // Elements

var labelWelcome = document.querySelector('.welcome');
var labelDate = document.querySelector('.date');
var labelBalance = document.querySelector('.balance__value');
var labelSumIn = document.querySelector('.summary__value--in');
var labelSumOut = document.querySelector('.summary__value--out');
var labelSumInterest = document.querySelector('.summary__value--interest');
var labelTimer = document.querySelector('.timer');
var containerApp = document.querySelector('.app');
var containerMovements = document.querySelector('.movements');
var btnLogin = document.querySelector('.login__btn');
var btnTransfer = document.querySelector('.form__btn--transfer');
var btnLoan = document.querySelector('.form__btn--loan');
var btnClose = document.querySelector('.form__btn--close');
var btnSort = document.querySelector('.btn--sort');
var inputLoginUsername = document.querySelector('.login__input--user');
var inputLoginPin = document.querySelector('.login__input--pin');
var inputTransferTo = document.querySelector('.form__input--to');
var inputTransferAmount = document.querySelector('.form__input--amount');
var inputLoanAmount = document.querySelector('.form__input--loan-amount');
var inputCloseUsername = document.querySelector('.form__input--user');
var inputClosePin = document.querySelector('.form__input--pin'); /////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

var currencies = new Map([['USD', 'United States dollar'], ['EUR', 'Euro'], ['GBP', 'Pound sterling']]);
var movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; /////////////////////////////////////////////////
// Manipulating the DOM
// Displaying the money movements

var displayBalances = function displayBalances(movements) {
  containerMovements.innerHTML = ""; // clear current contents of the container

  movements.forEach(function (val, index) {
    var type = val > 0 ? "deposit" : "withdrawal";
    var htmlText = "\n    <div class=\"movements__row\">\n      <div class=\"movements__type movements__type--".concat(type, "\">\n        ").concat(index + 1, " ").concat(type, "\n      </div>\n      <div class=\"movements__value\">").concat(val, "\u20AC</div>\n    </div>\n    ");
    containerMovements.insertAdjacentHTML("afterbegin", htmlText);
  });
};

displayBalances(account1.movements); // calculating ahd displaying the balance on the app

var calcDisplayBal = function calcDisplayBal(movements) {
  return movements.reduce(function (accumulator, amt) {
    return accumulator + amt;
  }, 0);
};

var currentBal = calcDisplayBal(movements);
labelBalance.textContent = "".concat(currentBal, "\u20AC"); // calculating and displaying the deposits on the app

var calcDisplaySummary = function calcDisplaySummary(movements) {
  var deposits = movements.filter(function (mov) {
    return mov > 0;
  }).reduce(function (acc, amt) {
    return acc + amt;
  }, 0);
  var withdrawals = movements.filter(function (amt) {
    return amt < 0;
  }).reduce(function (acc, amt) {
    return acc + amt;
  }, 0);
  var interest = movements.filter(function (amt) {
    return amt > 0;
  }).map(function (amt) {
    return amt * 1.2 / 100;
  }).filter(function (interest) {
    return interest >= 1.0;
  }).reduce(function (acc, intrst) {
    return acc + intrst;
  }, 0);
  labelSumIn.textContent = "".concat(deposits, "\u20AC");
  labelSumOut.textContent = "".concat(Math.abs(withdrawals), "\u20AC");
  labelSumInterest.textContent = "".concat(interest, "\u20AC");
};

calcDisplaySummary(account1.movements); // using the map and foreach method
// to compute usernames of each of the accounts

var createUsernameFromAccts = function createUsernameFromAccts(acctsArray) {
  acctsArray.forEach(function (acct) {
    // create a new propetty username
    acct.username = acct.owner.toLowerCase().split(" ").map(function (val) {
      return val.slice(0, 1);
    }).join('');
  });
};

console.log("----Transformed accounts array autogenerating usernames----");
createUsernameFromAccts(accounts); // Implementing login

var currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault(); // makes the console to retain contents after a button click
  // console.log(`LOGIN`);

  currentAccount = accounts.find(function (account) {
    return account.username === inputLoginUsername.value;
  });
  console.log(currentAccount);
  if (currentAccount.pin === Number(inputLoginPin.value)) console.log("Logged in");
});