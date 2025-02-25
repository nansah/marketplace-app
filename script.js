
// Typewriter effect for rotating text
const words = ["Connect with Expert Seamstresses", "Find a Tailor", "Discover Custom Designers"];
let wordIndex = 0;
const rotatingText = document.getElementById("rotating-text");

function rotateText() {
    rotatingText.textContent = words[wordIndex];
    wordIndex = (wordIndex + 1) % words.length;
}

setInterval(rotateText, 3000);

// Search & Filtering Functionality
const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar");
const resultsList = document.getElementById("results-list");

const designers = [
    { name: "Anna Tailoring", specialty: "Wedding Dresses", price: "$$$", location: "New York", orders: 3 },
    { name: "Mike Custom Suits", specialty: "Men's Suits", price: "$$", location: "Los Angeles", orders: 5 },
    { name: "Casual Creations", specialty: "Casual Wear", price: "$", location: "Chicago", orders: 2 },
];

function searchDesigners() {
    const query = searchBar.value.toLowerCase();

    const filteredResults = designers.filter(designer => 
        designer.name.toLowerCase().includes(query) ||
        designer.specialty.toLowerCase().includes(query) ||
        designer.location.toLowerCase().includes(query)
    );

    resultsList.innerHTML = filteredResults.length > 0 ? 
        filteredResults.map(d => `
            <div class="profile-card">
                <img src="profile-placeholder.jpg" alt="${d.name}" class="profile-img">
                <h3>${d.name}</h3>
                <p>${d.specialty} - ${d.location} - ${d.price}</p>
                <span class="order-count">${d.orders} active orders</span>
            </div>`).join("") :
        "<p>No results found.</p>";
}

searchBtn.addEventListener("click", searchDesigners);