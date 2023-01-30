var flyingElements = [];
var text = document.getElementById("face");
var button = document.getElementById('fire-button');
text.value = getEmoji();
fsize.value = "40";

function getEmoji() {
  return (Math.floor(Math.random() * 100) > 80) ? "💩" : "🦄";
}

function emoji(face, startx, starty, flour, fs, flyUpMax) {
  this.isAlive = true;
  this.face = face;
  this.x = startx;
  this.y = starty;
  this.flourLevel = flour;
  this.increment = -Math.floor((Math.random() * flyUpMax) + 10);
  this.xincrement = Math.floor((Math.random() * 10) + 1);
  this.xincrement *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
  this.element = document.createElement('div');
  this.element.innerHTML = face;
  this.element.style.position = "absolute";
  this.element.style.fontSize = fs + "px";
  this.element.style.color = "white";
  document.getElementById("fa").appendChild(this.element);

  this.refresh = function () {
    if (this.isAlive) {
      //------Y axis-----




      this.y += this.increment;
      this.x += this.xincrement;
      this.increment += 0.25;

      if (this.y >= this.flourLevel) {
        if (this.increment <= 5) {
          this.isAlive = false;
        }
        this.increment = -this.increment + 5;
      }

      this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    } else {
      this.element.style.transform = "translate(px, px)";
    }
  }

}

button.addEventListener("click", goB);

function goB() {
  var fontsize = fsize.value;
  var xv = (button.getBoundingClientRect().left + button.clientWidth / 2) - (fontsize / 2);
  var yv = (button.getBoundingClientRect().top + button.clientHeight / 2) - (fontsize / 2);
  var fl = button.getBoundingClientRect().top + 100;
  var face = getEmoji();
  for (var i = 0; i < 50; i++) {
    var coolGuy = new emoji(face, xv, yv, fl, fontsize, 12);
    flyingElements.push(coolGuy);
  }

}

function render() {
  for (var i = 0; i < flyingElements.length; i++) {
    if (flyingElements[i].isAlive == true) {
      flyingElements[i].refresh();
    } else {
      flyingElements[i].element.remove();
      flyingElements.splice(i, 1);
    }
  }
  requestAnimationFrame(render);
}

render();
