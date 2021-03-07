import { arrProjects } from "./projects.js";

const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const navItems = document.querySelector(".nav-items");

const projectPhotos = document.querySelector(".projects-showcase");

function toggleNav() {
  menuBars.classList.toggle("change");
  overlay.classList.toggle("overlay-slide-right");
}

function generateEls() {
  arrProjects.forEach(project => {
    //create nav items
    const aEl = document.createElement("a");
    aEl.setAttribute("href", project.app);
    aEl.setAttribute("target", "_blank");
    aEl.textContent = project.name;
    const liEl = document.createElement("li");
    liEl.appendChild(aEl);
    navItems.appendChild(liEl);

    //create projetcs

    //project-name
    const iEl = document.createElement("i");
    iEl.classList.add("fab", "fa-github");
    const aProjctEl = document.createElement("a");
    aProjctEl.setAttribute("href", project.github);
    aProjctEl.setAttribute("target", "_blank");
    aProjctEl.appendChild(iEl);
    const pEl = document.createElement("p");
    pEl.textContent = project.name;
    const pNameEl = document.createElement("div");
    pNameEl.classList.add("project-name");
    pNameEl.append(aProjctEl, pEl);

    //project-photo
    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", `./imgs/${project.img}`);
    imgEl.setAttribute("alt", project.name);
    const aForImgEL = document.createElement("a");
    aForImgEL.setAttribute("href", project.app);
    aForImgEL.setAttribute("target", "_blank");
    aForImgEL.appendChild(imgEl);
    const figureEl = document.createElement("figure");
    figureEl.classList.add("project-photo");
    figureEl.appendChild(aForImgEL);
    //projects li element
    const liPhotoEl = document.createElement("li");
    liPhotoEl.append(pNameEl, figureEl);
    //append to ul
    projectPhotos.appendChild(liPhotoEl);
  });
}

//event listeners
menuBars.addEventListener("click", toggleNav);
navItems.addEventListener("click", e => {
  if (e.target.closest("a")) toggleNav();
});

//onload
generateEls();
