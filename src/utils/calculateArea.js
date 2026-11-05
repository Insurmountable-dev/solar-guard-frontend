export function calculateArea(length, width) {

  const l = parseFloat(length);
  const w = parseFloat(width);

  if (!(l > 0) || !(w > 0)) {
     return null;
  };

  return {
    length:l,
    width: w,
    area: Math.round(l * w * 100) / 100,
  };
  
}