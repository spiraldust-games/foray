const query = document.getElementsByClassName('documentation');
const intro = document.querySelector('.keyline-top-not.py2');
const doc = document.documentElement;
const body = query && query[0];
const r = (v) => (Math.round((v*1000))/1000);

if (intro && intro.classList) {
  intro.classList.add('intro');
}

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
  let switched = 0;
  let offset = 0;
  let dir = 1;
  let pdir = 1;
  let target = 1;

  function update() {
    if (offset > m) {
      target = -1;
    }
    else if (offset < -m) {
      target = 1;
    }
    pdir = dir;
    if (dir < target) {
      dir += 0.01;
    }
    else if (dir > target) {
      dir -= 0.01;
    }

    if (pdir > 0 && dir < 0) {
      switched++;
    }
    if (pdir < 0 && dir > 0) {
      switched++;
    }
    if (switched > 2) return;

    offset += dir;

    doc.style.setProperty('--starfieldOffset', r(offset));
    body.style.backgroundColor = offset & 2 ? '#272730' : '#272731';

    requestAnimationFrame(update);
  }

  update();
}
