// 'use strict';
import { login, logout } from './login';

// Nav var
const menubar = document.querySelector('.navbar');

// DOM Element
//////////////////////////
//////////////////////////

const loginForm = document.querySelector('.form--login');
const allbranchForm = document.querySelector('.form__branch--all');
const btnlogout = document.querySelector('.nav__el--logout');

// Value
//////////////////////////
//////////////////////////

// Dropdown manu
document.querySelector('.icon--res').addEventListener('click', function (e) {
  e.preventDefault();
  if (menubar.className === 'navbar') {
    menubar.className += ' responsive';
  } else {
    menubar.className = 'navbar';
  }
});

// Login and log out functionallity

///////////////////////////
///////////////////////////

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
  });

if (btnlogout) btnlogout.addEventListener('click', logout);

///////////////////////////
///////////////////////////
// Branch Manipulation

//      1) Search for branch result

if (allbranchForm)
  allbranchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const branchId = document.querySelector('#branch--id').value;
    const from = document.querySelector('#date--from').value;
    let to = document.querySelector('#date--to').value;

    if(!to) to = new Date(Date.now());

    console.log(branchId, from, to);
  });
