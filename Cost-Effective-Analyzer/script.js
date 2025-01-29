const costData = [];
const labels = [];
let chart;

function addItem() {
    let itemName = document.getElementById("itemName").value.trim();
    let itemCost = parseFloat(document.getElementById("itemCost").value);

    if (itemName === "" || isNaN(itemCost) || itemCost <= 0) {
        alert("Enter valid item and cost.");
        return;
    }

    costData.push(itemCost);
    labels.push(itemName);

    updateTable();
    updateChart();
    
    document.getElementById("itemName").value = "";
    document.getElementById("itemCost").value = "";
}

function updateTable() {
    let table = document.getElementById("costTable");
    table.innerHTML = "";

    for (let i = 0; i < labels.length; i++) {
        table.innerHTML += `
            <tr>
                <td>${labels[i]}</td>
                <td>$${costData[i].toFixed(2)}</td>
                <td><button onclick="removeItem(${i})">Remove</button></td>
            </tr>
        `;
    }
}

function removeItem(index) {
    labels.splice(index, 1);
    costData.splice(index, 1);
    updateTable();
    updateChart();
}

function updateChart() {
    let ctx = document.getElementById("costChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Cost ($)",
                data: costData,
                backgroundColor: "#28a745",
                borderColor: "#218838",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function downloadChart() {
    let link = document.createElement("a");
    link.href = document.getElementById("costChart").toDataURL("image/png");
    link.download = "cost-analysis.png";
    link.click();
}
