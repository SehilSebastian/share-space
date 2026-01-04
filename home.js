let ads = [];

const modal = document.getElementById("modal");
const addPostBtn = document.getElementById("addPost");

const img = document.getElementById("img");
const category = document.getElementById("category");
const price = document.getElementById("price");
const email = document.getElementById("email");

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

function checkValid() {
    addPostBtn.disabled = !(
        img.files[0] &&
        category.value &&
        price.value &&
        email.value.endsWith("@ajce.in")
    );
}

img.onchange = category.onchange = price.oninput = email.oninput = checkValid;

function addPost() {
    const reader = new FileReader();
    reader.onload = () => {
        ads.push({
            img: reader.result,
            category: category.value,
            price: price.value,
            email: email.value
        });
        renderAds(ads);
        closeModal();
    };
    reader.readAsDataURL(img.files[0]);
}

function renderAds(list) {
    const box = document.getElementById("adsContainer");
    box.innerHTML = "";

    list.forEach(a => {
        box.innerHTML += `
        <div class="ad">
            <img src="${a.img}">
            <p>${a.category}</p>
            <strong>₹${a.price}</strong>
            <a class="msg"
            href="mailto:${a.email}?subject=ShareSpace Inquiry&body=Is this available? I am interested.">
            Message</a>
        </div>`;
    });
}

function applyFilter() {
    const f = document.getElementById("categoryFilter").value;
    renderAds(f ? ads.filter(a => a.category === f) : ads);
}

function resetFilter() {
    document.getElementById("categoryFilter").value = "";
    renderAds(ads);
}

function searchAds() {
    const s = document.getElementById("search").value.toLowerCase();
    renderAds(ads.filter(a => a.category.toLowerCase().includes(s)));
}
