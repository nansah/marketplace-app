
// Typewriter effect for rotating text
const words = ["Connect with Expert Seamstresses", "Find a Tailor", "Discover Custom Designers"];
let wordIndex = 0;
const rotatingText = document.getElementById("rotating-text");

function rotateText() {
    rotatingText.textContent = words[wordIndex];
    wordIndex = (wordIndex + 1) % words.length;
}

setInterval(rotateText, 3000);

// Demo Seamstress Data
const designers = [
    { name: "Anna Tailoring", specialty: "wedding", price: "high", location: "New York", orders: 3, image: "profile1.jpg" },
    { name: "Mike Custom Suits", specialty: "suits", price: "medium", location: "Los Angeles", orders: 5, image: "profile2.jpg" },
    { name: "Casual Creations", specialty: "casual", price: "low", location: "Chicago", orders: 2, image: "profile3.jpg" },
    { name: "Elegant Stitch", specialty: "wedding", price: "high", location: "Atlanta", orders: 4, image: "profile4.jpg" },
    { name: "Urban Tailors", specialty: "suits", price: "medium", location: "Houston", orders: 6, image: "profile5.jpg" },
];

const resultsList = document.getElementById("results-list");
const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar");
const filterSpecialty = document.getElementById("filter-specialty");
const filterPrice = document.getElementById("filter-price");
const filterLocation = document.getElementById("filter-location");
const applyFilters = document.getElementById("apply-filters");

function displayResults(filteredResults) {
    resultsList.innerHTML = filteredResults.length > 0 ? 
        filteredResults.map(d => `
            <div class="profile-card">
                <img src="${d.image}" alt="${d.name}" class="profile-img">
                <h3>${d.name}</h3>
                <p>${d.specialty.toUpperCase()} - ${d.location} - ${d.price.toUpperCase()}</p>
                <span class="order-count">${d.orders} active orders</span>
            </div>`).join("") :
        "<p>No results found.</p>";
}

function searchDesigners() {
    const query = searchBar.value.toLowerCase();
    const specialty = filterSpecialty.value;
    const price = filterPrice.value;
    const location = filterLocation.value.toLowerCase();

    const filteredResults = designers.filter(designer => 
        (designer.name.toLowerCase().includes(query) || designer.location.toLowerCase().includes(query)) &&
        (specialty === "" || designer.specialty === specialty) &&
        (price === "" || designer.price === price) &&
        (location === "" || designer.location.toLowerCase().includes(location))
    );

    displayResults(filteredResults);
}

searchBtn.addEventListener("click", searchDesigners);
applyFilters.addEventListener("click", searchDesigners);

// Load all designers on page load
document.addEventListener("DOMContentLoaded", () => displayResults(designers));