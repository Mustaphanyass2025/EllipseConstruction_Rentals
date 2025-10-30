// Sample Data (Replace with API calls in real app)
const bookings = [
    { id: 1, customer: "John Doe", equipment: "Excavator", start: "2024-06-10", end: "2024-06-15", status: "Confirmed" },
    { id: 2, customer: "Jane Smith", equipment: "Bulldozer", start: "2024-06-12", end: "2024-06-14", status: "Pending" }
];

const customers = ["John Doe", "Jane Smith", "Mike Johnson"];
const equipmentList = ["Excavator", "Bulldozer", "Crane"];

// Load Bookings into Table
function loadBookings() {
    const tableBody = document.getElementById("bookingsTableBody");
    tableBody.innerHTML = bookings.map(booking => `
        <tr>
            <td>${booking.id}</td>
            <td>${booking.customer}</td>
            <td>${booking.equipment}</td>
            <td>${booking.start}</td>
            <td>${booking.end}</td>
            <td><span class="status ${booking.status.toLowerCase()}">${booking.status}</span></td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="cancel-btn">Cancel</button>
            </td>
        </tr>
    `).join("");
}

// Initialize Calendar
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: bookings.map(booking => ({
            title: `${booking.equipment} (${booking.customer})`,
            start: booking.start,
            end: booking.end,
            color: booking.status === "Confirmed" ? "#2ecc71" : "#f39c12"
        }))
    });
    calendar.render();

    loadBookings();
});

// Modal Handling
const modal = document.getElementById("bookingModal");
const newBookingBtn = document.getElementById("newBookingBtn");
const closeBtn = document.querySelector(".close");

newBookingBtn.onclick = () => modal.style.display = "flex";
closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};

// Populate Customer & Equipment Dropdowns
const customerSelect = document.getElementById("customerSelect");
customerSelect.innerHTML = customers.map(c => `<option>${c}</option>`).join("");

const equipmentSelect = document.getElementById("equipmentSelect");
equipmentSelect.innerHTML = equipmentList.map(e => `<option>${e}</option>`).join("");