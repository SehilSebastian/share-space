// ---------- MOCK AUTH ----------
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
// If viewing other user
const viewedUserEmail = localStorage.getItem("viewProfileEmail") || loggedInUser.email;

const isOwnProfile = loggedInUser.email === viewedUserEmail;

// ---------- ELEMENTS ----------
const nameEl = document.getElementById("profileName");
const emailEl = document.getElementById("profileEmail");
const contactEl = document.getElementById("profileContact");
const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const logoutBtn = document.getElementById("logoutBtn");
const pic = document.getElementById("profilePic");
const picInput = document.getElementById("picInput");
const postsGrid = document.getElementById("postsGrid");

// ---------- LOAD USER ----------
const users = JSON.parse(localStorage.getItem("users")) || [];
const user = users.find(u => u.email === viewedUserEmail);

nameEl.textContent = user.firstName + " " + user.lastName;
emailEl.textContent = user.email;
contactEl.textContent = user.contact || "Contact not set";
pic.src = user.pic || "default-avatar.png";

// ---------- PERMISSIONS ----------
if (!isOwnProfile) {
    editBtn.style.display = "none";
    logoutBtn.style.display = "none";
}

// ---------- EDIT PROFILE ----------
editBtn.onclick = () => {
    contactEl.innerHTML = `<input id="contactInput" value="${user.contact || ""}">`;
    saveBtn.classList.remove("hidden");
    editBtn.classList.add("hidden");
};

saveBtn.onclick = () => {
    user.contact = document.getElementById("contactInput").value;
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
};

// ---------- PROFILE PIC ----------
if (isOwnProfile) {
    pic.onclick = () => picInput.click();
}

picInput.onchange = () => {
    const file = picInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        user.pic = reader.result;
        localStorage.setItem("users", JSON.stringify(users));
        pic.src = reader.result;
    };
    reader.readAsDataURL(file);
};

// ---------- LOGOUT ----------
logoutBtn.onclick = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
};

// ---------- LOAD POSTS ----------
const posts = JSON.parse(localStorage.getItem("posts")) || [];
const userPosts = posts.filter(p => p.owner === viewedUserEmail);

userPosts.forEach(post => {
    postsGrid.innerHTML += `
        <div class="post-card">
            <img src="${post.image}">
            <h4>${post.title}</h4>
            <p>₹${post.price}</p>
        </div>
    `;
});
