// ================================
// DEFAULT NEWS
// ================================

let defaultNews = [
    {
        title: "New Technology Trends in 2026",
        category: "Technology",
        description: "Discover the latest technology trends and innovations shaping the future."
    },
    {
        title: "Latest Sports Updates",
        category: "Sports",
        description: "Get the latest updates, results and important sports news."
    },
    {
        title: "New Education Opportunities",
        category: "Education",
        description: "Explore the latest educational opportunities and learning updates."
    },
    {
        title: "Entertainment News",
        category: "Entertainment",
        description: "Stay updated with the latest movies, shows and entertainment news."
    }
];


// ================================
// CREATE NEWS STORAGE
// ================================

if (!localStorage.getItem("news")) {
    localStorage.setItem("news", JSON.stringify(defaultNews));
}


// ================================
// DISPLAY NEWS
// ================================

function displayNews() {

    let container = document.getElementById("newsContainer");

    if (!container) return;

    let news = JSON.parse(localStorage.getItem("news")) || [];

    container.innerHTML = "";

    news.forEach(function(item) {

        container.innerHTML += `
            <div class="news-card">
                <span class="news-category">${item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;

    });
}


// ================================
// DISPLAY ADMIN NEWS
// ================================

function showAdminNews() {

    let container = document.getElementById("adminNewsList");

    if (!container) return;

    let news = JSON.parse(localStorage.getItem("news")) || [];

    container.innerHTML = "";

    news.forEach(function(item) {

        container.innerHTML += `
            <div class="admin-news-card">

                <span class="news-category">
                    ${item.category}
                </span>

                <h3>${item.title}</h3>

                <p>
                    ${item.description}
                </p>

            </div>
        `;

    });


    // Total News

    let totalNews = document.getElementById("totalNews");

    if (totalNews) {
        totalNews.innerText = news.length;
    }


    // Total Users

    let totalUsers = document.getElementById("totalUsers");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (totalUsers) {
        totalUsers.innerText = users.length;
    }
}


// ================================
// RUN WHEN PAGE LOADS
// ================================

document.addEventListener("DOMContentLoaded", function() {

    displayNews();

    showAdminNews();

});


// ================================
// ADD NEWS - ADMIN
// ================================

function addNews(event) {

    event.preventDefault();

    let title = document.getElementById("newsTitle").value;
    let category = document.getElementById("newsCategory").value;
    let description = document.getElementById("newsDescription").value;

    let news = JSON.parse(localStorage.getItem("news")) || [];

    news.push({
        title: title,
        category: category,
        description: description
    });

    localStorage.setItem("news", JSON.stringify(news));

    alert("News added successfully!");

    document.getElementById("newsForm").reset();

    showAdminNews();
}


// ================================
// LOGIN
// ================================

function loginUser(event) {

    event.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(function(u) {

        return u.email === email &&
               u.password === password;

    });


    // ================================
    // ADMIN LOGIN
    // ================================

    if (email === "admin@gmail.com" && password === "admin123") {

        localStorage.setItem("loggedIn", "admin");

        window.location.href = "admin.html";

        return;
    }


    // ================================
    // USER LOGIN
    // ================================

    if (user) {

        localStorage.setItem("loggedIn", "user");

        window.location.href = "user.html";

        return;
    }


    // ================================
    // INVALID LOGIN
    // ================================

    alert("Invalid email or password.");
}


// ================================
// SIGNUP
// ================================

function signupUser(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let existingUser = users.find(function(user) {

        return user.email === email;

    });


    // Existing account

    if (existingUser) {

        document.getElementById("signupMessage").innerText =
            "Email already registered!";

        return;
    }


    // Create new user

    users.push({

        name: name,
        email: email,
        password: password

    });


    localStorage.setItem("users", JSON.stringify(users));


    document.getElementById("signupMessage").innerText =
        "Account created successfully!";


    document.getElementById("signupForm").reset();


    // Go to Login page

    setTimeout(function() {

        window.location.href = "login.html";

    }, 1200);

}


// ================================
// LOGOUT
// ================================

function logout() {

    // Remove login status

    localStorage.removeItem("loggedIn");

    // Go to Login page

    window.location.href = "login.html";
}