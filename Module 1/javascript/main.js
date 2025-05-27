// == Exercise 1: JavaScript Basics & Setup ==

console.log("Welcome to the Community Portal");

window.onload = function() {
    alert("Page is fully loaded. Welcome!");
    init(); // Start the main app logic after page load
};


// == Exercise 2: Syntax, Data Types, and Operators ==

// Example event details
const eventName = "Community Music Festival";
const eventDate = "2025-07-15";
let availableSeats = 50;

// Using template literals to concatenate event info
const eventInfo = `Event: ${eventName} | Date: ${eventDate} | Seats Available: ${availableSeats}`;
console.log(eventInfo);


// == Exercise 3: Conditionals, Loops, and Error Handling ==

const events = [
    { id: 1, name: "Music Fest", date: "2025-07-15", seats: 50, category: "Music", location: "Park" },
    { id: 2, name: "Baking Workshop", date: "2023-05-01", seats: 0, category: "Workshop", location: "Community Center" },
    { id: 3, name: "Soccer Tournament", date: "2025-08-10", seats: 10, category: "Sports", location: "Stadium" },
    { id: 4, name: "Jazz Night", date: "2025-06-20", seats: 0, category: "Music", location: "Club" }
];

// Function to check if event is valid (upcoming and has seats)
function isValidEvent(event) {
    const today = new Date();
    const eventDate = new Date(event.date);
    if (eventDate < today || event.seats <= 0) {
        return false;
    }
    return true;
}

function displayValidEvents(eventList) {
    eventList.forEach(event => {
        if (isValidEvent(event)) {
            console.log(`Upcoming event: ${event.name} on ${event.date}, Seats left: ${event.seats}`);
        } else {
            console.log(`Skipping event: ${event.name} (either past or full)`);
        }
    });
}

displayValidEvents(events);

function registerForEvent(eventId) {
    try {
        const event = events.find(ev => ev.id === eventId);
        if (!event) throw new Error("Event not found.");
        if (!isValidEvent(event)) throw new Error("Event is full or already passed.");
        event.seats--;
        console.log(`Registered successfully for ${event.name}. Seats left: ${event.seats}`);
    } catch (error) {
        console.error("Registration failed:", error.message);
    }
}

registerForEvent(1);
registerForEvent(2); // Should throw error


// == Exercise 4: Functions, Scope, Closures, Higher-Order Functions ==

function addEvent(eventList, event) {
    eventList.push(event);
}

function registerUser(eventId) {
    let totalRegistrations = 0;

    function register() {
        const event = events.find(ev => ev.id === eventId);
        if (event && event.seats > 0) {
            event.seats--;
            totalRegistrations++;
            console.log(`User registered to ${event.name}. Total registrations: ${totalRegistrations}`);
        } else {
            console.log("Registration failed. No seats available.");
        }
    }
    return register;
}

// Closure usage example
const registerMusicEvent = registerUser(1);
registerMusicEvent();
registerMusicEvent();

function filterEventsByCategory(events, category, callback) {
    const filtered = events.filter(ev => ev.category === category);
    callback(filtered);
}

filterEventsByCategory(events, "Music", filteredEvents => {
    console.log("Filtered Music Events:", filteredEvents);
});


// == Exercise 5: Objects and Prototypes ==

function Event(name, date, seats, category, location) {
    this.name = name;
    this.date = date;
    this.seats = seats;
    this.category = category;
    this.location = location;
}

Event.prototype.checkAvailability = function() {
    return this.seats > 0;
};

const workshop = new Event("Baking Workshop", "2025-09-01", 15, "Workshop", "Community Center");
console.log(workshop.checkAvailability());

const entries = Object.entries(workshop);
console.log("Workshop object entries:", entries);


// == Exercise 6: Arrays and Methods ==

const communityEvents = [];

communityEvents.push(
    new Event("Music Jam", "2025-07-20", 30, "Music", "Park"),
    new Event("Art Workshop", "2025-08-15", 25, "Workshop", "Art Center"),
    new Event("Football Match", "2025-07-25", 20, "Sports", "Stadium")
);

const musicEvents = communityEvents.filter(ev => ev.category === "Music");

const displayCards = musicEvents.map(ev => `🎵 ${ev.name} on ${ev.date}`);
console.log("Music Events Display Cards:", displayCards);


// == Exercise 7: DOM Manipulation ==

const eventsContainer = document.querySelector("#eventsContainer");
const eventSelect = document.querySelector('select[name="eventSelect"]');

function renderEvents(eventList) {
    eventsContainer.innerHTML = "";  // Clear previous

    eventList.forEach(ev => {
        if (!isValidEvent(ev)) return;

        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <h3>${ev.name}</h3>
            <p><strong>Date:</strong> ${ev.date}</p>
            <p><strong>Category:</strong> ${ev.category}</p>
            <p><strong>Location:</strong> ${ev.location}</p>
            <p><strong>Seats Left:</strong> ${ev.seats}</p>
            <button class="register-btn" data-id="${ev.id}" ${ev.seats === 0 ? "disabled" : ""}>Register</button>
        `;

        eventsContainer.appendChild(card);
    });

    populateEventSelect(eventList);
}

function populateEventSelect(eventList) {
    eventSelect.innerHTML = '<option value="">Select Event</option>';
    eventList.forEach(ev => {
        if (isValidEvent(ev)) {
            const option = document.createElement("option");
            option.value = ev.id;
            option.textContent = ev.name;
            eventSelect.appendChild(option);
        }
    });
}

renderEvents(events);


// == Exercise 8: Event Handling ==

eventsContainer.onclick = function(e) {
    if (e.target.classList.contains("register-btn")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        registerForEvent(id);
        renderEvents(events);
        showMessage(`Registered for event ID: ${id}`, false);
    }
};

const categoryFilter = document.querySelector("#categoryFilter");
categoryFilter.onchange = function() {
    const selected = categoryFilter.value;
    if (selected === "all") {
        renderEvents(events);
    } else {
        const filtered = events.filter(ev => ev.category === selected);
        renderEvents(filtered);
    }
};

const searchBox = document.querySelector("#searchBox");
searchBox.onkeydown = function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const query = searchBox.value.toLowerCase();
        const filtered = events.filter(ev => ev.name.toLowerCase().includes(query));
        renderEvents(filtered);
    }
};


// == Exercise 9: Async JS, Promises, Async/Await ==

const loadingSpinner = document.createElement("p");
loadingSpinner.textContent = "Loading events...";
loadingSpinner.style.textAlign = "center";

async function fetchEvents() {
    eventsContainer.appendChild(loadingSpinner);
    try {
        // Using mock JSON endpoint (simulate)
        // Here, using a Promise to simulate fetch delay
        const response = await new Promise((resolve) =>
            setTimeout(() => resolve({ ok: true, json: () => Promise.resolve(events) }), 1500)
        );

        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        console.log("Fetched Events:", data);
        renderEvents(data);
    } catch (error) {
        eventsContainer.textContent = "Error loading events.";
        console.error(error);
    } finally {
        loadingSpinner.remove();
    }
}

// Call fetchEvents for demonstration (commented so it doesn't overwrite initial render)
// fetchEvents();


// == Exercise 10: Modern JavaScript Features ==

function displayEventSummary({ name, date, seats = 0 } = {}) {
    console.log(`Summary: ${name} on ${date}, Seats: ${seats}`);
}

const clonedEvents = [...events];
const filteredMusicEvents = clonedEvents.filter(({ category }) => category === "Music");

filteredMusicEvents.forEach(event => displayEventSummary(event));


// == Exercise 11: Working with Forms ==

const registrationForm = document.querySelector("#registrationForm");
const messageDiv = document.querySelector("#message");

registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.elements["name"].value.trim();
    const email = this.elements["email"].value.trim();
    const selectedEventId = parseInt(this.elements["eventSelect"].value);

    messageDiv.style.color = "red";

    if (!name || !email || isNaN(selectedEventId)) {
        messageDiv.textContent = "Please fill all fields correctly.";
        return;
    }

    // Simple email validation
    if (!email.includes("@")) {
        messageDiv.textContent = "Please enter a valid email.";
        return;
    }

    registerForEvent(selectedEventId);

    messageDiv.style.color = "green";
    messageDiv.textContent = `Thanks ${name}! You have registered successfully.`;

    this.reset();
    renderEvents(events);
});


// == Exercise 12: AJAX & Fetch API ==

function postRegistration(data) {
    messageDiv.style.color = "black";
    messageDiv.textContent = "Submitting registration...";

    // Simulate backend with setTimeout
    setTimeout(() => {
        // Simulate random success/failure
        if (Math.random() > 0.2) {
            messageDiv.style.color = "green";
            messageDiv.textContent = "Registration successful!";
        } else {
            messageDiv.style.color = "red";
            messageDiv.textContent = "Registration failed. Please try again.";
        }
    }, 1500);
}

registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
        name: this.elements["name"].value.trim(),
        email: this.elements["email"].value.trim(),
        eventId: parseInt(this.elements["eventSelect"].value)
    };

    if (!formData.name || !formData.email || isNaN(formData.eventId)) {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Please fill all fields correctly.";
        return;
    }

    postRegistration(formData);
});


// == Exercise 13: Debugging and Testing ==

// To debug, open Chrome Dev Tools:
// - Check Console for logs/errors
// - Use Network tab to inspect requests
// - Add breakpoints in sources to pause on errors
// Logs below help tracking form submission:

console.log("Debug: Script loaded and ready.");

// Add console logs on form submit
registrationForm.addEventListener("submit", function(e) {
    console.log("Form submission triggered.");
    console.log("Form data:", {
        name: this.elements["name"].value,
        email: this.elements["email"].value,
        event: this.elements["eventSelect"].value,
    });
});


// == Exercise 14: jQuery and JS Frameworks ==

// Since we are not including jQuery script, this is a demonstration of code only:

/*

$(document).ready(function() {
    $('#registerBtn').click(function(e) {
        e.preventDefault();
        alert('Register button clicked!');
    });

    $('.event-card').fadeIn();

    // Benefit of frameworks like React/Vue:
    // They allow for better state management, component-based architecture,
    // and easier handling of complex UI updates.

});

*/

// End of main.js


// =========== Helper function ===========

function showMessage(text, isError = false) {
    messageDiv.textContent = text;
    messageDiv.style.color = isError ? "red" : "green";
}

// Initialization
function init() {
    renderEvents(events);
}

