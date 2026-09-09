// ===============================
// REGISTER
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration successful!");

        window.location.href = "login.html";
    });
}


// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {

            alert("Please register first.");
            return;
        }

        if (
            email === storedUser.email &&
            password === storedUser.password
        ) {

            localStorage.setItem("loggedIn", "true");

            alert("Login successful!");

            window.location.href = "dashboard.html";

        } else {

            alert("Invalid email or password.");

        }

    });
}


// ===============================
// CREATE BLOG
// ===============================

const blogForm = document.getElementById("blogForm");

if (blogForm) {

    blogForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const title = document.getElementById("blogTitle").value;
        const author = document.getElementById("blogAuthor").value;
        const content = document.getElementById("blogContent").value;

        const blog = {
            id: Date.now(),
            title: title,
            author: author,
            content: content
        };

        let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

        blogs.push(blog);

        localStorage.setItem("blogs", JSON.stringify(blogs));

        alert("Blog published successfully!");

        window.location.href = "dashboard.html";
    });
}


// ===============================
// DISPLAY BLOGS ON DASHBOARD
// ===============================

const dashboardBlogs = document.getElementById("dashboardBlogs");

if (dashboardBlogs) {

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    if (blogs.length === 0) {

        dashboardBlogs.innerHTML =
            "<p>No blogs created yet.</p>";

    } else {

        blogs.forEach(function (blog) {

            const card = document.createElement("div");

            card.className = "blog-card";

            card.innerHTML = `
                <h3>${blog.title}</h3>

                <p>${blog.content}</p>

                <span>By ${blog.author}</span>

                <br><br>

                <button
                    class="delete-btn"
                    onclick="deleteBlog(${blog.id})">
                    Delete
                </button>
            `;

            dashboardBlogs.appendChild(card);

        });
    }
}


// ===============================
// DELETE BLOG
// ===============================

function deleteBlog(id) {

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs = blogs.filter(function (blog) {
        return blog.id !== id;
    });

    localStorage.setItem("blogs", JSON.stringify(blogs));

    location.reload();
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("loggedIn");

    alert("You have been logged out.");

    window.location.href = "index.html";
}

// ===============================
// SHOW USER NAME
// ===============================

const userName = document.getElementById("userName");

if (userName) {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        userName.textContent = user.name;
    }
}


// ===============================
// DISPLAY BLOGS ON HOME PAGE
// ===============================

const blogContainer = document.getElementById("blogContainer");

if (blogContainer) {

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs.forEach(function (blog) {

        const card = document.createElement("div");

        card.className = "blog-card";

        card.innerHTML = `
            <h3>${blog.title}</h3>

            <p>${blog.content}</p>

            <span>By ${blog.author}</span>
        `;

        blogContainer.appendChild(card);
    });
}

// ===============================
// PROTECT DASHBOARD
// ===============================

if (window.location.pathname.includes("dashboard.html")) {

    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {

        alert("Please login first.");

        window.location.href = "login.html";
    }
}

// ===============================
// PROTECT CREATE BLOG PAGE
// ===============================

if (window.location.pathname.includes("create-blog.html")) {

    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {

        alert("Please login first.");

        window.location.href = "login.html";
    }
}