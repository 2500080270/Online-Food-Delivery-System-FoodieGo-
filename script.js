/* =========================================
   FOODIEGO LOGIN SYSTEM
   Frontend Prototype
========================================= */


/* ---------- DEFAULT USERS ---------- */

let users = JSON.parse(localStorage.getItem("foodieGoUsers")) || [];


/* ---------- LOGIN FORM ELEMENTS ---------- */

const userLoginForm = document.getElementById("userLoginForm");
const adminLoginForm = document.getElementById("adminLoginForm");
const registerForm = document.getElementById("registerForm");


/* ---------- SHOW USER LOGIN ---------- */

function showUserLogin() {

    userLoginForm.classList.remove("hidden");
    adminLoginForm.classList.add("hidden");
    registerForm.classList.add("hidden");

    document.getElementById("formTitle").textContent = "User Login";
    document.getElementById("formSubtitle").textContent =
        "Login to continue to FoodieGo";

    document.getElementById("userTab").classList.add("active");
    document.getElementById("adminTab").classList.remove("active");
}


/* ---------- SHOW ADMIN LOGIN ---------- */

function showAdminLogin() {

    userLoginForm.classList.add("hidden");
    adminLoginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

    document.getElementById("formTitle").textContent = "Admin Login";
    document.getElementById("formSubtitle").textContent =
        "Administrator access to FoodieGo";

    document.getElementById("userTab").classList.remove("active");
    document.getElementById("adminTab").classList.add("active");
}


/* ---------- SHOW REGISTER ---------- */

function showRegister() {

    userLoginForm.classList.add("hidden");
    adminLoginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");

    document.getElementById("formTitle").textContent =
        "Create Account";

    document.getElementById("formSubtitle").textContent =
        "Register as a FoodieGo user";
}


/* =========================================
   USER REGISTRATION
========================================= */

registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const username =
        document.getElementById("registerUsername").value.trim();

    const mobile =
        document.getElementById("registerMobile").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message =
        document.getElementById("registerMessage");


    /* Validate mobile */

    if (!/^[0-9]{10}$/.test(mobile)) {

        message.textContent =
            "Please enter a valid 10-digit mobile number.";

        message.className = "message error";

        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        message.className = "message error";
        return;
    }


    /* Check username */

    const usernameExists = users.some(
        user => user.username.toLowerCase() === username.toLowerCase()
    );

    if (usernameExists) {

        message.textContent =
            "Username already taken.";

        message.className = "message error";

        return;
    }


    /* Check mobile */

    const mobileExists = users.some(
        user => user.mobile === mobile
    );

    if (mobileExists) {

        message.textContent =
            "Mobile number already taken.";

        message.className = "message error";

        return;
    }


    /* Create new user */

    const newUser = {
        name: name,
        username: username,
        mobile: mobile,
        password: password
    };


    users.push(newUser);

    localStorage.setItem(
        "foodieGoUsers",
        JSON.stringify(users)
    );


    message.textContent =
        "Account created successfully! You can now login.";

    message.className = "message success";


    registerForm.reset();

    showToast("User account created successfully");


    setTimeout(() => {
        showUserLogin();
    }, 1200);

});


/* =========================================
   USER LOGIN
========================================= */

userLoginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const message =
        document.getElementById("loginMessage");


    const user = users.find(
        user =>
            user.username.toLowerCase() === username.toLowerCase() &&
            user.password === password
    );


    if (!user) {

        message.textContent =
            "Invalid username or password.";

        message.className = "message error";

        return;
    }


    message.textContent =
        "Login successful!";

    message.className = "message success";


    showUserDashboard(user);

});


/* =========================================
   ADMIN LOGIN
========================================= */

adminLoginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username =
        document.getElementById("adminUsername").value.trim();

    const password =
        document.getElementById("adminPassword").value;


    const message =
        document.getElementById("adminMessage");


    /* Demo admin credentials */

    if (username === "admin" && password === "admin123") {

        message.textContent =
            "Admin login successful!";

        message.className = "message success";


        showAdminDashboard();

    } else {

        message.textContent =
            "Invalid admin username or password.";

        message.className = "message error";

    }

});


/* =========================================
   USER DASHBOARD
========================================= */

function showUserDashboard(user) {

    document.querySelector(".main-container")
        .classList.add("hidden");

    document.getElementById("userDashboard")
        .classList.remove("hidden");

    document.getElementById("userWelcome")
        .textContent = user.name;


    document.getElementById("totalUsers")
        .textContent = users.length;
}


/* =========================================
   ADMIN DASHBOARD
========================================= */

function showAdminDashboard() {

    document.querySelector(".main-container")
        .classList.add("hidden");

    document.getElementById("adminDashboard")
        .classList.remove("hidden");

    document.getElementById("totalUsers")
        .textContent = users.length;
}


/* =========================================
   USER ACCESS
========================================= */

function userAction(action) {

    showToast(action + " feature selected.");
}


/* =========================================
   RESTRICTED ADMIN ACCESS
========================================= */

function restrictedAccess() {

    showToast(
        "Access denied. Only Admin can access this feature."
    );
}


/* =========================================
   ADMIN ACTIONS
========================================= */

function adminAction(action) {

    showToast(
        action + " module opened."
    );
}


/* =========================================
   LOGOUT
========================================= */

function logout() {

    document.getElementById("userDashboard")
        .classList.add("hidden");

    document.getElementById("adminDashboard")
        .classList.add("hidden");

    document.querySelector(".main-container")
        .classList.remove("hidden");


    showUserLogin();

    document.getElementById("userLoginForm").reset();

    document.getElementById("adminLoginForm").reset();

    showToast("Logged out successfully.");
}


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}
/* =========================================
   SOCIAL LOGIN
========================================= */

function googleLogin() {

    showToast(
        "Google Sign-In will be connected in the next phase."
    );
}


function phoneLogin() {

    showToast(
        "Phone OTP login will be connected in the next phase."
    );
}

/* =========================================================
   WORKING MODULE NAVIGATION & FUNCTIONALITY
   Added without changing the existing login/dashboard design.
========================================================= */

let currentLoggedInUser = null;
let currentRole = null;
let orders = JSON.parse(localStorage.getItem("foodieGoOrders")) || [];
let restaurants = JSON.parse(localStorage.getItem("foodieGoRestaurants")) || [
    { name: "Spice Garden", cuisine: "Indian", rating: "4.5" },
    { name: "Urban Bites", cuisine: "Fast Food", rating: "4.3" },
    { name: "Green Bowl", cuisine: "Healthy", rating: "4.6" },
    { name: "Paradise Kitchen", cuisine: "Biryani", rating: "4.7" }
];

localStorage.setItem("foodieGoRestaurants", JSON.stringify(restaurants));

function navigateToModule(moduleName) {
    const user = JSON.parse(localStorage.getItem("foodieGoCurrentUser") || "null");
    const role = localStorage.getItem("foodieGoRole");

    if (!role) {
        showToast("Please login first.");
        return;
    }

    currentLoggedInUser = user;
    currentRole = role;

    document.getElementById("userDashboard").classList.add("hidden");
    document.getElementById("adminDashboard").classList.add("hidden");
    document.getElementById("moduleArea").classList.remove("hidden");

    document.querySelectorAll(".module-panel").forEach(panel => panel.classList.add("hidden"));

    const panel = document.getElementById(moduleName + "Module");
    if (!panel) return;
    panel.classList.remove("hidden");

    const titles = {
        userRestaurants: ["USER MODULE", "Browse Restaurants", "Explore restaurants and available cuisines."],
        userMenu: ["USER MODULE", "View Menu", "Choose food items and place an order."],
        placeOrder: ["USER MODULE", "Place Order", "Select a food item and place your order."],
        myOrders: ["USER MODULE", "My Orders", "View your current and previous orders."],
        profile: ["USER MODULE", "My Profile", "View your registered account information."],
        manageUsers: ["ADMIN MODULE", "Manage Users", "View registered customer accounts."],
        manageRestaurants: ["ADMIN MODULE", "Manage Restaurants", "Add or remove restaurant entries."],
        manageOrders: ["ADMIN MODULE", "Manage Orders", "Monitor and update customer orders."],
        reports: ["ADMIN MODULE", "Reports", "View live system activity information."],
        settings: ["ADMIN MODULE", "System Settings", "View prototype configuration information."]
    };

    const data = titles[moduleName] || ["MODULE", "Module", ""];
    document.getElementById("moduleRoleTitle").textContent = data[0];
    document.getElementById("moduleTitle").textContent = data[1];
    document.getElementById("moduleDescription").textContent = data[2];

    if (moduleName === "userRestaurants") renderRestaurants();
    if (moduleName === "myOrders") renderMyOrders();
    if (moduleName === "profile") renderProfile();
    if (moduleName === "manageUsers") renderUsers();
    if (moduleName === "manageRestaurants") renderAdminRestaurants();
    if (moduleName === "manageOrders") renderAdminOrders();
    if (moduleName === "reports") renderReports();
}

function backToDashboard() {
    document.getElementById("moduleArea").classList.add("hidden");
    if (currentRole === "admin") {
        document.getElementById("adminDashboard").classList.remove("hidden");
    } else {
        document.getElementById("userDashboard").classList.remove("hidden");
    }
}

function renderRestaurants() {
    const list = document.getElementById("restaurantList");
    list.innerHTML = restaurants.map((r, i) => `
        <div class="module-item">
            <div class="module-icon">🏪</div>
            <h3>${r.name}</h3>
            <p>${r.cuisine} cuisine • ⭐ ${r.rating}</p>
            <button onclick="navigateToModule('userMenu')">View Menu</button>
        </div>
    `).join("");
}

function placeFoodOrder(item, price) {
    const user = JSON.parse(localStorage.getItem("foodieGoCurrentUser") || "null");
    if (!user) {
        showToast("Please login first.");
        return;
    }
    const order = {
        id: "FG" + Date.now(),
        username: user.username,
        name: user.name,
        item: item,
        price: price,
        status: "Preparing",
        date: new Date().toLocaleString()
    };
    orders.push(order);
    localStorage.setItem("foodieGoOrders", JSON.stringify(orders));
    showToast("Order placed successfully!");
    setTimeout(() => navigateToModule("myOrders"), 500);
}

function renderMyOrders() {
    const list = document.getElementById("myOrdersList");
    const user = JSON.parse(localStorage.getItem("foodieGoCurrentUser") || "null");
    const mine = orders.filter(o => user && o.username === user.username);

    list.innerHTML = mine.length ? mine.map(o => `
        <div class="module-list-item">
            <div><h3>${o.item}</h3><p>Order ID: ${o.id}<br>₹${o.price} • ${o.date}</p></div>
            <strong class="status-text">${o.status}</strong>
        </div>
    `).join("") : `<div class="profile-box"><h3>No orders yet</h3><p>Browse the menu and place your first order.</p></div>`;
}

function renderProfile() {
    const box = document.getElementById("profileDetails");
    const user = JSON.parse(localStorage.getItem("foodieGoCurrentUser") || "null");
    if (!user) return;
    box.innerHTML = `<h3>${user.name}</h3><p>Username: @${user.username}</p><p>Mobile: ${user.mobile}</p><p>Role: User</p>`;
}

function renderUsers() {
    const list = document.getElementById("adminUsersList");
    if (!list) return;
    list.innerHTML = users.length ? users.map(u => `
        <div class="module-list-item"><div><h3>${u.name}</h3><p>@${u.username} • ${u.mobile}</p></div><strong>User</strong></div>
    `).join("") : `<div class="profile-box"><h3>No registered users</h3><p>Users will appear here after signup.</p></div>`;
}

function renderAdminRestaurants() {
    const list = document.getElementById("adminRestaurantsList");
    if (!list) return;
    list.innerHTML = restaurants.map((r, i) => `
        <div class="module-list-item"><div><h3>${r.name}</h3><p>${r.cuisine} • ⭐ ${r.rating}</p></div><button class="delete-btn" onclick="deleteRestaurant(${i})">Remove</button></div>
    `).join("");
}

function addRestaurant() {
    const name = document.getElementById("newRestaurantName").value.trim();
    const cuisine = document.getElementById("newRestaurantCuisine").value.trim();
    if (!name || !cuisine) {
        showToast("Enter restaurant name and cuisine.");
        return;
    }
    restaurants.push({ name: name, cuisine: cuisine, rating: "4.0" });
    localStorage.setItem("foodieGoRestaurants", JSON.stringify(restaurants));
    document.getElementById("newRestaurantName").value = "";
    document.getElementById("newRestaurantCuisine").value = "";
    renderAdminRestaurants();
    showToast("Restaurant added successfully!");
}

function deleteRestaurant(index) {
    restaurants.splice(index, 1);
    localStorage.setItem("foodieGoRestaurants", JSON.stringify(restaurants));
    renderAdminRestaurants();
    showToast("Restaurant removed.");
}

function renderAdminOrders() {
    const list = document.getElementById("adminOrdersList");
    if (!list) return;
    list.innerHTML = orders.length ? orders.map((o, i) => `
        <div class="module-list-item">
            <div><h3>${o.item}</h3><p>${o.username} • Order ID: ${o.id} • ₹${o.price}</p></div>
            <div><select onchange="updateOrderStatus(${i}, this.value)">
                ${["Preparing","Out for Delivery","Delivered","Cancelled"].map(s => `<option ${o.status === s ? "selected" : ""}>${s}</option>`).join("")}
            </select><button class="delete-btn" onclick="deleteOrder(${i})">Delete</button></div>
        </div>
    `).join("") : `<div class="profile-box"><h3>No orders available</h3><p>Customer orders will appear here.</p></div>`;
}

function updateOrderStatus(index, status) {
    orders[index].status = status;
    localStorage.setItem("foodieGoOrders", JSON.stringify(orders));
    showToast("Order status updated.");
}

function deleteOrder(index) {
    orders.splice(index, 1);
    localStorage.setItem("foodieGoOrders", JSON.stringify(orders));
    renderAdminOrders();
    showToast("Order removed.");
}

function renderReports() {
    document.getElementById("reportUsers").textContent = users.length;
    document.getElementById("reportRestaurants").textContent = restaurants.length;
    document.getElementById("reportOrders").textContent = orders.length;
    document.getElementById("reportRevenue").textContent = "₹" + orders.reduce((sum, o) => sum + Number(o.price), 0);
}

function clearDemoOrders() {
    orders = [];
    localStorage.setItem("foodieGoOrders", JSON.stringify(orders));
    showToast("Demo orders cleared.");
}

/* Keep dashboard login state for module navigation. */
const originalShowUserDashboard = showUserDashboard;
showUserDashboard = function(user) {
    localStorage.setItem("foodieGoCurrentUser", JSON.stringify(user));
    localStorage.setItem("foodieGoRole", "user");
    currentLoggedInUser = user;
    currentRole = "user";
    originalShowUserDashboard(user);
};

const originalShowAdminDashboard = showAdminDashboard;
showAdminDashboard = function() {
    localStorage.setItem("foodieGoRole", "admin");
    localStorage.removeItem("foodieGoCurrentUser");
    currentRole = "admin";
    originalShowAdminDashboard();
};

const originalLogout = logout;
logout = function() {
    localStorage.removeItem("foodieGoCurrentUser");
    localStorage.removeItem("foodieGoRole");
    document.getElementById("moduleArea").classList.add("hidden");
    originalLogout();
};
