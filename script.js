var wiki = readTextFile("wiktionary.txt"),
    cities = readTextFile("cities.txt");

document.getElementById("field").onkeyup = ()=>{
  document.getElementById("dropdown").innerHTML = "";
  var terms = search(document.getElementById("field").value, document.getElementById("wik").checked ? wiki : cities);
  for (i=0;i<terms.length;i++){
    var li = document.createElement("li");
    li.innerHTML = terms[i];
    document.getElementById("dropdown").appendChild(li);
  }
};

function readTextFile(file){
  var rawFile = new XMLHttpRequest(),
      assignto;
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = ()=>{
    if(rawFile.readyState === 4){
      if(rawFile.status === 200 || rawFile.status === 0){
        var allText = rawFile.responseText,
            stuff = parseTheFile(allText);
        assignto = stuff;
      }
    }
  };
  rawFile.send(null);
  return assignto;
}

function parseTheFile(content){
  var lines = content.split('\n'),
      words = {};
  for (i=0;i<lines.length;i++){
    words[lines[i].split("\t")[1]] = lines[i].split("\t")[0];
  }
  return words;
}


function search(term, list){
  var items = Object.keys(list),
      words = {},
      final = [];
  for (i=0;i<items.length;i++){
    var w = items[i].split("").splice(0,term.length).join("");
    if (w === term){
      words[list[items[i]]] = items[i];
    }
  }
  var sorted = Object.keys(words).sort(),
      ordered = {};
  for (i=0;i<sorted.length;i++){
    ordered[sorted[i]] = words[sorted[i]];
  }
  for (i=0;i<7;i++){
    if (Object.values(ordered)[i] === undefined) {
      break;
    }
    final.push(Object.values(ordered)[i]);
  }
  console.log('final', final)
  console.log('words', words)
  return final.reverse();
}