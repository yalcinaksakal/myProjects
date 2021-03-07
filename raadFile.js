function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        const listOfProjects = [];
        var allText = rawFile.responseText;
        let lengthAllText = allText.match(/\n/g).length;
        let n, g, a, i;

        while (lengthAllText > 0) {
          n = allText.slice(0, allText.indexOf("\n")).trim();
          allText = allText.slice(allText.indexOf("\n") + 1);
          g = allText.slice(0, allText.indexOf("\n")).trim();
          allText = allText.slice(allText.indexOf("\n") + 1);
          a = allText.slice(0, allText.indexOf("\n")).trim();
          allText = allText.slice(allText.indexOf("\n") + 1);
          i = allText.slice(0, allText.indexOf("\n")).trim();
          allText = allText.slice(allText.indexOf("\n") + 1);
          if (n) listOfProjects.push({ name: n, github: g, app: a, img: i });
          lengthAllText -= 4;
        }

        console.log(JSON.stringify(listOfProjects));
      }
    }
  };
  rawFile.send(null);
}
readTextFile("./projects.txt");
