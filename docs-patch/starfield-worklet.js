function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(x, target, amt) {
  const factor = 1 - amt;
  return x * factor + target * amt;
}

const numberOfStars = 3881;
const random = mulberry32(numberOfStars);
const starsArr = [...Array(numberOfStars)].map((i) => {
  const flux = random();
  return {
    x: random(),
    y: random(),
    speed: lerp(0.5, 1.5, random()), // random speed for each star
    flux, // store a unique flux value for each star
    // pre-calculate the part of the intensity calculation that doesn't depend on normalizedX
    intensityBase: lerp(0.01, 0.3, flux)
  };
});

class Starfield {
  static get inputProperties() {
    return [
      `--starfieldStars`,
      `--starfieldOffset`,
    ];
  }

  paint(ctx, size, properties) {
    const elWidth = size.width;
    const elHeight = size.height;
    const stars = parseInt(properties.get(`--starfieldStars`), 10) || 3881;
    const offset = parseInt(properties.get(`--starfieldOffset`), 10) || 0;

    // we can request up to a maximum of starsArr.length per element applied
    starsArr.slice(0, stars).forEach((star) => {
      // Adjust the star's x position based on its speed and the offset
      const x = (star.x * elWidth + star.speed * offset / 4) % elWidth;
      const y = star.y * elHeight;
      const normalizedX = x / elWidth;  // Normalize the x-coordinate

      // Increase the intensity based on the x-coordinate + random flux
      const intensity = star.intensityBase * normalizedX;

      ctx.fillStyle = `hsl(0, 0%, 100%, ${intensity})`;
      ctx.beginPath();
      ctx.arc(x, y, lerp(0.2, 2, 0.825 * star.flux), 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

registerPaint('starfield', Starfield);
