const query = document.getElementsByClassName('documentation');
const doc = document.documentElement;
const body = query && query[0];

window.CSS.registerProperty({
  name: "--starfieldStars",
  syntax: "<number>",
  inherits: false,
  initialValue: 3881,
});

window.CSS.registerProperty({
  name: "--starfieldOffset",
  syntax: "<number>",
  inherits: false,
  initialValue: 0,
});

CSS.paintWorklet.addModule('./assets/starfield-worklet.js');

if (body) {
  const m = 500;
  let offset = 0;
  let dir = 1;
  let target = 1;

  function update() {
    if (offset > m) {
      target = -1;
    }
    else if (offset < -m) {
      target = 1;
    }
    if (dir < target) {
      dir += 0.01;
    }
    else if (dir > target) {
      dir -= 0.01;
    }
    doc.style.setProperty('--starfieldOffset', offset += dir);
    body.style.backgroundColor = offset & 2 ? '#272730' : '#272731';

    requestAnimationFrame(update);
  }

  update();
}
