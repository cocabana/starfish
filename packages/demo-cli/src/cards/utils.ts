import fs from "fs";
import path, { resolve } from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getFile(type: 'css' | 'fonts' | 'images', name: string) {
  return fs.readFileSync(
    resolve(__dirname, `./assets/${type}/${name}`),
  );
}

export function getAssetPath(type: 'css' | 'fonts' | 'images', name: string) {
  return resolve(__dirname, `./assets/${type}/${name}`);
}

export function getImageData(name: string) {
  const image = getImageFile(name);
  return 'data:image/png;base64,' + image.toString('base64');
}

//<image src="" /> -- Easy to embed. Change fill color. - imgStr.replace('#000000', newColor)
// Other tips for sizing: https://css-tricks.com/scale-svg/
export function getSvgSrc(name: string, color?: string) {
  const image = getImageFile(name);
  let imgStr = image.toString('utf8');
  if (color && imgStr.includes('fill=')) {
    imgStr = imgStr.replace(/fill="#[0-9a-fA-F]{6}"/g, `fill="${color}"`);
  }
  // console.log(imgStr)
  return 'data:image/svg+xml;utf8,'+ encodeURIComponent(imgStr);
}

export function getImageFile(name: string) {
  return getFile('images', name);
}

export function ellipsis(str: string, start = 6, end = 4) {
  if (!str) return '';
  const len = str.length;
  return str.substring(0, start) + '...' + str.substring(len - end, len);
}