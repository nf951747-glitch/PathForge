// =======================================
// PathForge AI — Skill Selection Logic
// =======================================

const hiddenInput       = document.getElementById("skills");
const searchInput       = document.getElementById("searchSkill");
const selectedContainer = document.getElementById("selectedSkills");
const skillButtons      = document.querySelectorAll(".skill-chip");

let selectedSkills = [];


// =======================================
// Add Skill
// =======================================

function addSkill(skill) {
    skill = skill.trim();
    if (!skill) return;
    if (selectedSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())) return;
    selectedSkills.push(skill);
    updateSelectedSkills();
}


// =======================================
// Remove Skill
// =======================================

function removeSkill(skill) {
    selectedSkills = selectedSkills.filter(
        item => item.toLowerCase() !== skill.toLowerCase()
    );
    updateSelectedSkills();

    // Deactivate matching chip button if it exists
    const btn = document.querySelector(`[data-skill="${skill}"]`);
    if (btn) btn.classList.remove("active");
}


// =======================================
// Update Selected Skills UI
// =======================================

function updateSelectedSkills() {

    selectedContainer.innerHTML = "";

    if (selectedSkills.length === 0) {
        selectedContainer.innerHTML = '<span class="empty-text">No skills selected</span>';
    } else {
        selectedSkills.forEach(skill => {
            const chip = document.createElement("div");
            chip.className = "selected-chip";
            chip.innerHTML = `${skill}<span>&times;</span>`;
            chip.querySelector("span").addEventListener("click", () => removeSkill(skill));
            selectedContainer.appendChild(chip);
        });
    }

    hiddenInput.value = selectedSkills.join(", ");
}


// =======================================
// Skill Chip Button Click
// =======================================

skillButtons.forEach(button => {
    button.addEventListener("click", function () {
        const skill = this.dataset.skill;
        if (this.classList.contains("active")) {
            this.classList.remove("active");
            removeSkill(skill);
        } else {
            this.classList.add("active");
            addSkill(skill);
        }
    });
});


// =======================================
// Search Box — filter chips OR add typed skill on Enter
// =======================================

searchInput.addEventListener("keyup", function (e) {

    const value = this.value.trim();

    // Press Enter → add whatever is typed as a skill
    if (e.key === "Enter" && value !== "") {
        addSkill(value);
        this.value = "";
        // Reset chip visibility
        skillButtons.forEach(btn => btn.style.display = "inline-flex");
        return;
    }

    // Otherwise filter the visible chips
    const keyword = value.toLowerCase();
    skillButtons.forEach(button => {
        const skill = button.dataset.skill.toLowerCase();
        button.style.display = skill.includes(keyword) ? "inline-flex" : "none";
    });

    // If box is cleared, show all chips
    if (value === "") {
        skillButtons.forEach(btn => btn.style.display = "inline-flex");
    }
});


// =======================================
// Prevent Empty Submission
// =======================================

document.getElementById("recommendForm").addEventListener("submit", function (e) {

    // If the user has typed something in the box but hasn't pressed Enter yet,
    // treat it as an additional skill before submitting
    const typed = searchInput.value.trim();
    if (typed !== "") {
        addSkill(typed);
        searchInput.value = "";
    }

    if (selectedSkills.length === 0) {
        e.preventDefault();
        alert("Please select or type at least one skill.");
        return;
    }
});


// =======================================
// AI Loading Animation
// =======================================

const loadingScreen  = document.getElementById("loadingScreen");
const loadingText    = document.getElementById("loadingText");
const loadingBar     = document.getElementById("loadingProgress");
const loadingPercent = document.getElementById("loadingPercent");
const form           = document.getElementById("recommendForm");

form.addEventListener("submit", function () {

    if (selectedSkills.length === 0) return;

    loadingScreen.style.display = "flex";

    const steps = [
        "Collecting Skills...",
        "Building TF-IDF Vectors...",
        "Calculating Cosine Similarity...",
        "Ranking Career Matches...",
        "Preparing Career Roadmap..."
    ];

    let progress = 0;
    let index    = 0;

    const interval = setInterval(() => {
        progress += 5;
        loadingBar.style.width   = progress + "%";
        loadingPercent.innerText = progress + "%";

        if (progress % 20 === 0 && index < steps.length) {
            loadingText.innerText = steps[index++];
        }

        if (progress >= 100) {
            clearInterval(interval);
            form.submit();
        }
    }, 60);
});
