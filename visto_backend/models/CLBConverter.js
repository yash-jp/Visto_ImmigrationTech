const CLBConverter = (l, r, w, s) => {
  // convert l,r,w,s to float
  l = parseFloat(l);
  r = parseFloat(r);
  w = parseFloat(w);
  s = parseFloat(s);

  // console.log(`here are they - ${l} ${r} ${w} ${s}`);
  if (l === 4.5 && r === 3.5 && w === 4 && s === 4) {
    return "4";
  } else if (l === 5 && r === 4 && w === 5 && s === 5) {
    return "5";
  } else if (l === 5.5 && r === 5 && w === 5.5 && s === 5.5) {
    return "6";
  } else if (l === 6 && r === 6 && w === 6 && s === 6) {
    return "7";
  } else if (l === 7.5 && r === 6.5 && w === 6.5 && s === 6.5) {
    return "8";
  } else if (l === 8 && r === 7 && w === 7 && s === 7) {
    return "9";
  } else if (l === 8.5 && r === 8 && w === 7.5 && s === 7.5) {
    return "10";
  } else if (l === 9 && r === 8.5 && w === 8 && s === 8) {
    return "11";
  } else if (l === 9 && r === 9 && w === 9 && s === 9) {
    return "12";
  } else {
    return "3";
  }
};

module.exports = CLBConverter;
