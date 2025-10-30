// Sample Data (Replace with API calls in real app)
const equipment = [
    { id: 1, name: "Caterpillar Excavator", type: "Excavator", status: "available", lastMaintenance: "2024-05-20" },
    { id: 2, name: "Komatsu Bulldozer", type: "Bulldozer", status: "booked", lastMaintenance: "2024-04-15" },
    { id: 3, name: "Tower Crane", type: "Crane", status: "maintenance", lastMaintenance: "2024-03-10" }
];

// Load Equipment into Table
function loadEquipment() {
    const tableBody = document.getElementById("equipmentTableBody");
    tableBody.innerHTML = equipment.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.type}</td>
            <td><span class="status ${item.status}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span></td>
            <td>${item.lastMaintenance}</td>
            <td>
                <button class="edit-btn" data-id="${item.id}">Edit</button>
                <button class="delete-btn" data-id="${item.id}">Delete</button>
            </td>
        </tr>
    `).join("");
}

// Update Stats Overview
function updateStats() {
    const total = equipment.length;
    const available = equipment.filter(e => e.status === "available").length;
    const booked = equipment.filter(e => e.status === "booked").length;
    const maintenance = equipment.filter(e => e.status === "maintenance").length;

    document.getElementById("totalEquipment").textContent = total;
    document.getElementById("availableEquipment").textContent = available;
    document.getElementById("bookedEquipment").textContent = booked;
    document.getElementById("maintenanceEquipment").textContent = maintenance;
}

// Modal Handling
const modal = document.getElementById("equipmentModal");
const addBtn = document.getElementById("addEquipmentBtn");
const closeBtn = document.querySelector(".close");

addBtn.onclick = () => {
    document.getElementById("modalTitle").textContent = "Add New Equipment";
    modal.style.display = "flex";
};

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadEquipment();
    updateStats();
});