const toggleBtn = document.getElementById("sidebarToggle");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});



document.addEventListener('DOMContentLoaded', function () {
    // Initialize Charts
    initRevenueChart();
    initUtilizationChart();

    // Load recent bookings
    loadRecentBookings();

    // Load maintenance alerts
    loadMaintenanceAlerts();

    // Update stats cards with dynamic data
    updateStatsCards();

    // Initialize Particles.js for background (optional)
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            // Your existing particles config
        });
    }
});

// Revenue Chart
function initRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');

    // Sample data - replace with your actual data
    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Monthly Revenue (GMD)',
            data: [85000, 92000, 105000, 112000, 125400, 118000, 134000],
            backgroundColor: 'rgba(243, 156, 18, 0.2)',
            borderColor: 'rgba(243, 156, 18, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    };

    const revenueChart = new Chart(ctx, {
        type: 'line',
        data: revenueData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return 'GMD ' + context.raw.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return 'GMD ' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Update chart when period changes
    document.getElementById('revenue-period').addEventListener('change', function () {
        // In a real app, you would fetch new data here
        Swal.fire({
            icon: 'info',
            title: 'Data Loading',
            text: 'Changing to ' + this.value + ' view',
            timer: 1500,
            showConfirmButton: false
        });
    });
}

// Utilization Chart
function initUtilizationChart() {
    const ctx = document.getElementById('utilizationChart').getContext('2d');

    // Sample data - replace with your actual data
    const utilizationData = {
        labels: ['Concrete Mixer', 'Acro Jack', 'Compactor', 'Scaffolding', 'Poker Vibrator'],
        datasets: [{
            label: 'Utilization Rate (%)',
            data: [85, 72, 68, 90, 55],
            backgroundColor: [
                'rgba(52, 152, 219, 0.7)',
                'rgba(46, 204, 113, 0.7)',
                'rgba(230, 126, 34, 0.7)',
                'rgba(155, 89, 182, 0.7)',
                'rgba(231, 76, 60, 0.7)'
            ],
            borderColor: [
                'rgba(52, 152, 219, 1)',
                'rgba(46, 204, 113, 1)',
                'rgba(230, 126, 34, 1)',
                'rgba(155, 89, 182, 1)',
                'rgba(231, 76, 60, 1)'
            ],
            borderWidth: 1
        }]
    };

    const utilizationChart = new Chart(ctx, {
        type: 'bar',
        data: utilizationData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function (value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Load Recent Bookings
function loadRecentBookings() {
    // Sample data - replace with your actual data
    const bookings = [
        {
            equipment: 'Concrete Mixer',
            customer: 'Alpha Construction',
            date: '2025-08-15',
            status: 'active'
        },
        {
            equipment: 'Acro Jack (x4)',
            customer: 'Beta Builders',
            date: '2025-08-14',
            status: 'active'
        },
        {
            equipment: 'Compactor',
            customer: 'Gamma Contractors',
            date: '2025-08-12',
            status: 'returned'
        },
        {
            equipment: 'Scaffolding',
            customer: 'Delta Developers',
            date: '2025-08-10',
            status: 'overdue'
        }
    ];

    const container = document.getElementById('recent-bookings');
    container.innerHTML = '';

    bookings.forEach(booking => {
        const item = document.createElement('div');
        item.className = 'activity-item';

        let statusClass = '';
        let icon = '';

        if (booking.status === 'active') {
            statusClass = 'text-primary';
            icon = 'fa-calendar-check';
        } else if (booking.status === 'returned') {
            statusClass = 'text-success';
            icon = 'fa-check-circle';
        } else {
            statusClass = 'text-danger';
            icon = 'fa-exclamation-circle';
        }

        item.innerHTML = `
            <div class="activity-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="activity-info">
                <h4>${booking.equipment}</h4>
                <p>${booking.customer}</p>
            </div>
            <div class="activity-time ${statusClass}">
                ${booking.date}
            </div>
        `;

        container.appendChild(item);
    });
}

// Load Maintenance Alerts
function loadMaintenanceAlerts() {
    // Sample data - replace with your actual data
    const alerts = [
        {
            equipment: 'Concrete Mixer #3',
            issue: 'Regular maintenance due',
            date: 'Due in 2 days'
        },
        {
            equipment: 'Compactor #1',
            issue: 'Oil change needed',
            date: 'Due today'
        },
        {
            equipment: 'Welding Generator',
            issue: 'Inspection overdue',
            date: 'Overdue by 5 days'
        }
    ];

    const container = document.getElementById('maintenance-alerts');
    container.innerHTML = '';

    alerts.forEach(alert => {
        const item = document.createElement('div');
        item.className = 'activity-item';

        item.innerHTML = `
            <div class="activity-icon bg-orange">
                <i class="fas fa-wrench"></i>
            </div>
            <div class="activity-info">
                <h4>${alert.equipment}</h4>
                <p>${alert.issue}</p>
            </div>
            <div class="activity-time">
                ${alert.date}
            </div>
        `;

        container.appendChild(item);
    });
}

// Update Stats Cards
function updateStatsCards() {
    // In a real app, you would fetch this data from your backend
    const stats = {
        totalEquipment: 42,
        availableEquipment: 28,
        activeRentals: 14,
        monthlyRevenue: 125400
    };

    document.getElementById('total-equipment').textContent = stats.totalEquipment;
    document.getElementById('available-equipment').textContent = stats.availableEquipment;
    document.getElementById('active-rentals').textContent = stats.activeRentals;
    document.getElementById('monthly-revenue').textContent = `GMD ${stats.monthlyRevenue.toLocaleString()}`;
}

// Notification click handler
document.querySelector('.notifications').addEventListener('click', function () {
    Swal.fire({
        title: 'Notifications',
        html: `
            <div class="notification-item">
                <i class="fas fa-tools text-primary"></i>
                <div>
                    <p>3 equipment due for maintenance</p>
                    <small>2 hours ago</small>
                </div>
            </div>
            <div class="notification-item">
                <i class="fas fa-calendar-check text-success"></i>
                <div>
                    <p>New booking: Concrete Mixer</p>
                    <small>5 hours ago</small>
                </div>
            </div>
            <div class="notification-item">
                <i class="fas fa-exclamation-triangle text-danger"></i>
                <div>
                    <p>Overdue equipment return</p>
                    <small>1 day ago</small>
                </div>
            </div>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: '400px'
    });
});

// Logout functionality
document.querySelector('.fa-sign-out-alt').addEventListener('click', function () {
    Swal.fire({
        title: 'Logout?',
        text: 'Are you sure you want to logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#2c3e50',
        cancelButtonColor: '#e74c3c',
        confirmButtonText: 'Yes, logout'
    }).then((result) => {
        if (result.isConfirmed) {
            // In a real app, you would handle logout here
            window.location.href = 'login.html';
        }
    });
});