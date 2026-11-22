
// =====================================
// PROJECT DATA
// =====================================

const projects = [
    {
        title: "eg1(nav bar)",
        description: "",
        category: "HTML & CSS",
        image: "../images/ex1.jpg",
        github: "https://github.com/yourusername/project1",
        demo: "ex.html"
    },
    {
        title: "li,ol,p",
        description: "",
        category: "HTML & CSS",
        image: "../images/ex1.png",
        github: "https://github.com/yourusername/project2",
        demo: "ex1.html"
    },
    {
        title: "form",
        description: "",
        category: "HTML & CSS",
        image: "../images/form.png",
        github: "https://github.com/yourusername/project3",
        demo: "form.html"
    },
    {
        title: "card",
        description: "",
        category: "HTML & CSS",
        image: "../images/ex3.jpg",
        github: "https://github.com/yourusername/project4",
        demo: "ex3.html"
    },

 {
        title: "ex5",
        description: "",
        category: "HTML & CSS",
        image: "../images/ex4.jpg",
        github: "https://github.com/yourusername/project4",
        demo: "ex4.html"
    }

];

// =====================================
// SELECT ELEMENTS
// =====================================

const projectGrid = document.getElementById("projectGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const totalProjects = document.getElementById("totalProjects");
const showingCount = document.getElementById("showingCount");
const emptyState = document.getElementById("emptyState");

let currentCategory = "All";

// =====================================
// DISPLAY PROJECTS
// =====================================

function displayProjects(projectList) {

    projectGrid.innerHTML = "";

    totalProjects.textContent =
        String(projects.length).padStart(2, "0");

    showingCount.textContent =
        `${projectList.length} Projects`;

    if (projectList.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    projectList.forEach((project, index) => {

        // Project Card
        const card = document.createElement("article");
        card.className = "project-card";

        // Image Wrapper
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "image-wrapper";

        const img = document.createElement("img");
        img.className = "project-image";
        img.src = project.image;
        img.alt = project.title;
        img.loading = "lazy";

        img.onerror = function () {
            this.onerror = null;
            this.src =
                "https://placehold.co/600x400/e2e8f0/64748b?text=Project+Preview";
        };

        // Project Number
        const number = document.createElement("span");
        number.className = "project-number";
        number.textContent =
            `PROJECT ${String(index + 1).padStart(2, "0")}`;

        imageWrapper.append(img, number);

        // Project Information
        const info = document.createElement("div");
        info.className = "project-info";

        const category = document.createElement("span");
        category.className = "project-category";
        category.textContent = project.category;

        const title = document.createElement("h3");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        // =====================================
        // PROJECT ACTION BUTTONS
        // =====================================

        const actions = document.createElement("div");
        actions.className = "project-actions";

        // GitHub Button
        const githubLink = document.createElement("a");

        githubLink.className = "project-link github-btn";
        githubLink.href = project.github;
        githubLink.target = "_blank";
        githubLink.rel = "noopener noreferrer";

        githubLink.innerHTML = `
            <i class="fa-brands fa-github"></i>
            GitHub
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
        `;

        // HTML Demo Button
        const demoLink = document.createElement("a");

        demoLink.className = "project-link demo-btn";
        demoLink.href = project.demo;
        demoLink.target = "_blank";
        demoLink.rel = "noopener noreferrer";

        demoLink.innerHTML = `
            <i class="fa-solid fa-eye"></i>
            View HTML
        `;

        // Add buttons
        actions.append(githubLink, demoLink);

        // Add all elements to card
        info.append(
            category,
            title,
            description,
            actions
        );

        card.append(imageWrapper, info);

        projectGrid.appendChild(card);

    });
}

// =====================================
// CATEGORY FILTER
// =====================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory = button.dataset.category;

        filterAndSearch();

    });

});

// =====================================
// SEARCH PROJECTS
// =====================================

searchInput.addEventListener("input", filterAndSearch);

// =====================================
// FILTER + SEARCH FUNCTION
// =====================================

function filterAndSearch() {

    const keyword = searchInput.value.toLowerCase().trim();

    const filteredProjects = projects.filter(project => {

        const matchesCategory =
            currentCategory === "All" ||
            project.category === currentCategory;

        const matchesSearch =
            project.title.toLowerCase().includes(keyword) ||
            project.description.toLowerCase().includes(keyword) ||
            project.category.toLowerCase().includes(keyword);

        return matchesCategory && matchesSearch;

    });

    displayProjects(filteredProjects);

}

// =====================================
// MOBILE NAVIGATION
// =====================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const icon = menuBtn.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");

});

// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});

// =====================================
// NAVBAR ACTIVE LINK
// =====================================

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.id;
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }

    });

});

// =====================================
// INITIALIZE WEBSITE
// =====================================

displayProjects(projects);