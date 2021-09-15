import { arrProjects } from "./projects.js";

const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const navItems = document.querySelector(".nav-items");

const projectPhotos = document.querySelector(".projects-showcase");

let numberofObservers = 0;

function toggleNav() {
  menuBars.classList.toggle("change");
  overlay.classList.toggle("overlay-slide-right");
}

function generateEls() {
  const numberOfProjects = arrProjects.length;
  arrProjects.forEach((project, index) => {
    //create nav items
    const aEl = document.createElement("a");
    aEl.setAttribute("href", project.app);
    aEl.setAttribute("target", "_blank");
    aEl.textContent = `${numberOfProjects - index}- ${project.name}${
      project.type
        ? ` (${
            project.type === "all" ? "redux, typescirpt, next.js" : project.type
          })`
        : ""
    }`;
    const liEl = document.createElement("li");
    liEl.appendChild(aEl);
    navItems.appendChild(liEl);

    //create projetcs

    //project-name
    const iEl = document.createElement("i");
    if (project.type) {
      iEl.classList.add("fab", "fa-react");
      if (project.passive) {
        iEl.classList.add("passive");
        iEl.title = "Private github project";
      }
      iEl.style.color = "dodgerblue";
    } else {
      iEl.classList.add("fab", "fa-js-square");
      iEl.style.color = "#cbb61b";
    }

    const aProjctEl = document.createElement("a");
    aProjctEl.setAttribute("href", project.github);
    aProjctEl.setAttribute("target", "_blank");
    aProjctEl.appendChild(iEl);

    const pEl = document.createElement("p");
    pEl.textContent = project.name;
    const pNameEl = document.createElement("div");
    pNameEl.classList.add("project-name");
    pNameEl.appendChild(aProjctEl);
    if (
      [
        "redux",
        "nextJS",
        "react-router",
        "redux&nextJS",
        "TS",
        "all",
        "three",
      ].includes(project.type)
    ) {
      const libraryUsed = document.createElement("img");
      libraryUsed.setAttribute("src", `./imgs/${project.type}Logo.png`);
      libraryUsed.setAttribute("alt", project.type);
      libraryUsed.style.width = ["redux", "TS"].includes(project.type)
        ? "20px"
        : "30px";
      libraryUsed.style.padding = "0 5px ";
      pNameEl.appendChild(libraryUsed);
    }
    pNameEl.appendChild(pEl);
    //project-photo

    //create spining loader div as a placeholder until images loaded
    const div = document.createElement("div");
    div.classList.add(`observe`);

    const aForImgEL = document.createElement("a");
    aForImgEL.classList.add("projectLink");
    aForImgEL.setAttribute("href", project.app);
    aForImgEL.setAttribute("target", "_blank");
    aForImgEL.appendChild(div);
    const paragraphEl = document.createElement("p");
    // paragraphEl.classList.add("paragraph");
    paragraphEl.id = "paragraph";
    paragraphEl.innerText = "Click to visit";
    aForImgEL.appendChild(paragraphEl);

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

//load images when they are observed
function imgloader(observedEl, imgNo) {
  observedEl.classList.add("loader");
  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", `./imgs/${arrProjects[imgNo].img}`);
  imgEl.setAttribute("alt", arrProjects[imgNo].name);

  imgEl.onload = () => {
    observedEl.parentElement.appendChild(imgEl);
    observedEl.parentElement.removeChild(observedEl);
  };
}

//event listeners
menuBars.addEventListener("click", toggleNav);
navItems.addEventListener("click", e => {
  if (e.target.closest("a")) toggleNav();
});

//onload
generateEls();

//intersection observers
const myObserver = new IntersectionObserver(elements => {
  if (elements[0].intersectionRatio !== 0) {
    //console.log(" The element is in view!");
    imgloader(elements[0].target, numberofObservers);
    myObserver.unobserve(observedEls[numberofObservers]);
    numberofObservers++;
    if (observedEls[numberofObservers])
      myObserver.observe(observedEls[numberofObservers]);
  } else {
    //console.log("The element is out of view");
  }
});
const observedEls = document.querySelectorAll(".observe");

myObserver.observe(observedEls[0]);
