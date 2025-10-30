// ----------- BACK TO TOP BUTTON -----------
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('active', window.scrollY > 300);
});

// ----------- HAMBURGER MENU TOGGLE -----------
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header-nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Auto close nav menu on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    }
});

// Auto close nav when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// ----------- MODAL BOOKING LOGIC -----------
emailjs.init("BvDRvIEyQgsFZI7iT"); // Your EmailJS public key

const modal = document.getElementById("bookingModal");
const form = document.getElementById("bookingForm");
const equipmentInput = document.getElementById("equipment");
const equipmentTitle = document.getElementById("equipment-title");
const closeBtn = document.querySelector("#bookingModal .close-btn");

// Open booking modal with equipment name
document.querySelectorAll(".btn-rental").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        const equipmentName = btn.closest(".rental-content").querySelector("h3").innerText.trim();
        form.reset();
        equipmentInput.value = equipmentName;
        equipmentTitle.innerText = `📦 Book: ${equipmentName}`;
        modal.style.display = "flex";
    });
});

// Close modal on X click
closeBtn.onclick = () => modal.style.display = "none";

// Close modal on outside click
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

// ----------- EMAILJS SEND LOGIC -----------

const SERVICE_ID = "service_bidck89";
const ADMIN_TEMPLATE_ID = "template_me7oqg9";      // Admin template (summary only)
const CUSTOMER_TEMPLATE_ID = "template_zfxt8sc";   // Customer thank-you template

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const customerParams = {
        from_name: formData.get("from_name"),
        to_email: formData.get("to_email"),
        phone: formData.get("phone"),
        equipment: formData.get("equipment"),
        date: formData.get("date"),
        duration: formData.get("duration"),
        message: formData.get("message")
    };

    // Step 1: Send booking email to admin (using sendForm)
    emailjs.sendForm(SERVICE_ID, ADMIN_TEMPLATE_ID, form)
        .then(() => {
            // Step 2: Send thank-you email to customer (using send)
            return emailjs.send(SERVICE_ID, CUSTOMER_TEMPLATE_ID, customerParams);
        })
        .then(() => {
            // ✅ Both emails sent successfully
            modal.style.display = "none"; // Hide modal
            form.reset();

            Swal.fire({
                icon: 'success',
                title: 'Booking Confirmed!',
                text: 'Thank you. We’ve sent you a confirmation email.',
                confirmButtonColor: '#2c3e50'
            });
        })
        .catch((error) => {
            console.error("❌ Error sending emails:", error);
            modal.style.display = "none"; // Hide modal on error
            form.reset();

            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Something went wrong. Please check your email and try again.',
                confirmButtonColor: '#e74c3c'
            });
        });
});

// FILTER FUNCTION
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const rentalItems = document.querySelectorAll(".rental-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            rentalItems.forEach(item => {
                const category = item.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
});
