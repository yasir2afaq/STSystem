
// Login handling: username 'admin' password '1234'
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e){
        e.preventDefault();
        const u = document.getElementById('username').value.trim();
        const p = document.getElementById('password').value.trim();
        if (u === 'admin' && p === '1234') {
            localStorage.setItem('ets_logged', 'admin');
            window.location.href = 'expenses.html';
        } else {
            document.getElementById('login-msg').textContent = 'Invalid username or password';
        }
    });
}

// Protect expenses page
if (window.location.pathname.endsWith('expenses.html')) {
    if (!localStorage.getItem('ets_logged')) {
        window.location.href = 'login.html';
    }
}

// Expenses handling
const expForm = document.getElementById('expense-form');
const expTable = document.getElementById('expense-table');
let expenses = JSON.parse(localStorage.getItem('ets_expenses')||'[]');

function renderExpenses() {
    if (!expTable) return;
    expTable.innerHTML = '';
    expenses.forEach((ex, i) => {
        expTable.innerHTML += `<tr><td>${ex.name}</td><td>${ex.amount}</td><td>${ex.cat}</td><td><button onclick="deleteExp(${i})" class="btn btn-sm btn-danger">Del</button></td></tr>`;
    });
    localStorage.setItem('ets_expenses', JSON.stringify(expenses));
}

function deleteExp(i){ expenses.splice(i,1); renderExpenses(); }

if (expForm) {
    expForm.addEventListener('submit', function(e){
        e.preventDefault();
        const name = document.getElementById('exp-name').value.trim();
        const amount = document.getElementById('exp-amount').value.trim();
        const cat = document.getElementById('exp-category').value;
        if (name && amount) {
            expenses.push({name, amount, cat});
            renderExpenses();
            expForm.reset();
        }
    });
}

renderExpenses();
