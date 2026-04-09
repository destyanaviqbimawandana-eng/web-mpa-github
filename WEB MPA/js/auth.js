// Auth functions untuk MPA

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const $loginNavItem = $("#loginNavItem");
    const $logoutNavItem = $("#logoutNavItem");
    const $loginText = $("#loginText");
    
    if (isLoggedIn) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        if ($loginNavItem.length) $loginNavItem.hide();
        if ($logoutNavItem.length) $logoutNavItem.show();
        if ($loginText.length) {
            const t = translations[currentLang] || translations.id;
            $loginText.html(`<i class="bi bi-person-circle"></i> ${currentUser.username} <span class="login-status-badge">${t.loginLoggedIn}</span>`);
        }
        
        // Attach logout event
        $("#navLogoutLink").off("click").on("click", function(e) {
            e.preventDefault();
            logoutUser();
        });
    } else {
        if ($loginNavItem.length) $loginNavItem.show();
        if ($logoutNavItem.length) $logoutNavItem.hide();
    }
}

function logoutUser() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// Fungsi untuk halaman login
function handleLogin() {
    const username = $("#loginUsername").val().trim();
    const email = $("#loginEmail").val().trim();
    const password = $("#loginPassword").val().trim();
    
    if (username === "admin" && email === "admin@lembaga.id" && password === "123456") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify({ username: username, email: email }));
        window.location.href = "index.html";
    } else {
        $("#loginError").removeClass("d-none");
    }
}