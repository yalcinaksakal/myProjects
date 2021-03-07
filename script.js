const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const navItems = document.querySelector(".nav-items");

const projectPhotos = document.querySelector(".projects-showcase");

const arrProjects = [
  {
    name: "Calculator",
    github: "https://github.com/yalcinaksakal/calculator",
    app: "https://yalcinaksakal.github.io/calculator/",
    img: "1calculator.png",
  },

  {
    name: "Drag and drop",
    github: "https://github.com/yalcinaksakal/drag-n-drop",
    app: "https://kanban-board100.netlify.app/",
    img: "2dragAndDrop.png",
  },

  {
    name: "Dice game",
    github: "https://github.com/yalcinaksakal/dicer",
    app: "https://dicer100.netlify.app/",
    img: "3dicer.png",
  },
];

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

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        const listOfProjects = [];
        var allText = rawFile.responseText;
        let lengthAllText = allText.match(/\n/g).length;
        let key, val;
        while (lengthAllText) {
          val = allText.slice(0, allText.indexOf("\n")).trim();
          allText = allText.slice(allText.indexOf("\n") + 1);
          key = allText.slice(0, allText.indexOf("\n")).trim();
          allText = allText.slice(allText.indexOf("\n") + 1);
          if (key) listOfProjects.push([key, val]);
          lengthAllText--;
          lengthAllText--;
        }

        console.log(listOfProjects);
      }
    }
  };
  rawFile.send(null);
}

//event listeners
menuBars.addEventListener("click", toggleNav);
navItems.addEventListener("click", e => {
  if (e.target.closest("a")) toggleNav();
});

//readTextFile("./projects.txt");

//onload
generateEls();
