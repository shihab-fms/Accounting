// 'use strict';

const btnAddBranchEmployees = document.querySelectorAll('#addEmployee');
const btnAddmoreBranchEmployees = document.querySelectorAll('#anotherEmployee');


// Functionality

const addEmployee = (e) => {
  e.preventDefault();

  const html = ' ';
  div = document.querySelector('.row__employees--branch');
  markup = `<select
            class="form-select form-control m-3"
            name="employees"
            id="employees"
          >
            <option selected>Select employees</option>
            <option value="2432414">Shihab</option>
            <option value="2432414">Shihab</option>
            <option value="2432414">Shihab</option>
          </select>`;
  div.insertAdjacentHTML('beforeend', markup);
};

if (btnAddBranchEmployees)
  btnAddBranchEmployees.forEach((el) =>
    el.addEventListener('click', addEmployee)
  );

if (btnAddmoreBranchEmployees)
  btnAddmoreBranchEmployees.forEach((el) =>
    el.addEventListener('click', addEmployee)
  );
