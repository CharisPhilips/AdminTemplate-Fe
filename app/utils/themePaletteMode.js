// import lightPalette from './lightPalette';
// import darkPalette from './darkPalette';

const themePalette = (paletteTotal, color, mode) => {

  for (let i = 0; i < paletteTotal.size; i++) {
    if (paletteTotal.get(i).key === color) {
      if (mode === 'dark') {
        return paletteTotal.get(i).darkPalette;
      }
      else if(mode === 'light') {
        return paletteTotal.get(i).lightPalette;
      } else {
        return paletteTotal.get(i).themePalette;
      }
    }
  }

};

export default themePalette;
