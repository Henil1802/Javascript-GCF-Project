function redirect(page) {
    const pages = ["login", "signup", "home", "upload", "fileDetails", "payment", "thankYou"];
    pages.forEach(p => document.getElementById(p).style.display = "none");
    document.getElementById(page).style.display = "block";
}

function validateAndRedirect(page) {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !email.includes("@")) {
        alert("Please enter a valid email.");
        return;
    }

    if (!password || password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    redirect(page);
}

function calculateCost() {
    const pages = parseInt(document.getElementById("pageCount").value) || 0;
    const qualityMultiplier = {
        "draft": 1,
        "standard": 1.2,
        "high-quality": 1.5
    };
    const thicknessMultiplier = {
        "standard": 1,
        "premium": 1.3
    };
    const bindingCost = {
        "none": 0,
        "spiral": 50,
        "stapler": 30
    };

    const printQuality = document.getElementById("printQuality").value;
    const paperThickness = document.getElementById("paperThickness").value;
    const binding = document.getElementById("binding").value;

    let costPerPage = 2;
    if (pages > 50 && pages <= 200) {
        costPerPage = 1.8;
    } else if (pages > 200) {
        costPerPage = 1.5;
    }

    let baseCost = pages * costPerPage;
    baseCost *= qualityMultiplier[printQuality];
    baseCost *= thicknessMultiplier[paperThickness];
    baseCost += bindingCost[binding];

    document.getElementById("totalCost").innerText = baseCost.toFixed(2);
}

function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({ behavior: "smooth" });
}

function reviewBeforePayment() {
    const confirmation = confirm("Review your selections before proceeding to payment.");
    if (confirmation) {
        redirect("payment");
    }
}
