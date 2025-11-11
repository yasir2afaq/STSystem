const form = document.getElementById("expense-form");
const table = document.getElementById("expense-table");
let expenses = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("expense-name").value;
    const amount = document.getElementById("expense-amount").value;
    const category = document.getElementById("expense-category").value;

    expenses.push({ name, amount, category });
    updateTable();
    form.reset();
});

function updateTable() {
    table.innerHTML = "";
    expenses.forEach((exp, index) => {
        table.innerHTML += `
            <tr>
                <td>${exp.name}</td>
                <td>${exp.amount}</td>
                <td>${exp.category}</td>
                <td><button onclick="deleteExpense(${index})">X</button></td>
            </tr>
        `;
    });
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateTable();
}
