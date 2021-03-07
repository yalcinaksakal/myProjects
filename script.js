const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const navItems = document.querySelector(".nav-items");
function toggleNav() {
  menuBars.classList.toggle("change");
  overlay.classList.toggle("overlay-slide-right");
}

//event listener
menuBars.addEventListener("click", toggleNav);
navItems.addEventListener("click", e => {
  if (e.target.closest("a")) toggleNav();
});



function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        const listOfProjects = new Map();
        var allText = rawFile.responseText;
        let lengthAllText = allText.match(/\n/g).length;
        let key, val;
        while (lengthAllText) {
          key = allText.slice(0, allText.indexOf("\n")).trim();
          allText = allText.slice(allText.indexOf("\n") + 1);
          val = allText.slice(0, allText.indexOf("\n")).trim();
          allText = allText.slice(allText.indexOf("\n") + 1);
          if (key) listOfProjects.set(key, val);
          lengthAllText--;
        }
        // while (allText.indexOf("\n")) {
        //   listOfProjects.push(allText.slice(0, allText.indexOf("\n")));
        //   allText = allText.slice(allText.indexOf("\n"));
        // }
        console.log(allText, listOfProjects);
        //console.log(allText.splice(0, allText.indexOf("\n")));
        //alert(allText);
      }
    }
  };
  rawFile.send(null);
}

readTextFile("./projects.txt");
