import { chunk } from "@std/collections/chunk";
import { sortBy } from "@std/collections/sort-by";

const createLayers = (imageData, width, hight) => {
  const layer = chunk(imageData, width * hight);
  return layer;
}

const findFrequency = (layer) => {
  return layer.reduce((object, data) => {
    object[data] = (object[data] || 0) + 1;
    return object;
  }, {});
}

const decodeImage = (layer) => {
  let col = 0;
  const answer = [];
  for (let row = 0; row < layer[0].length; row++) {     
       if (layer[col][row] === "2") {          
         col++;
         row--;
         continue;
       }
    answer.push(layer[col][row]);
    col = 0;
      }
  return answer;
}

const countFrequency = (image) =>  image.map(layer => findFrequency(layer));

const part1 = () => {
  const input = Deno.readTextFileSync("./data.txt");
  const image = createLayers(input,25,6);
  const freqOfLayers = countFrequency(image);
  const sortBy0 = sortBy(freqOfLayers, layer => layer[0]);
  const fewest0Layer = sortBy0[0];
  return fewest0Layer[1] * fewest0Layer[2];
}

const decodeLayer = (layer) => layer.reduce((string, ele) => {
  const char = ele === "1" ? "⬜️" : "  "
  return string + char
},"");

const main = () => {
  const input = Deno.readTextFileSync("./data.txt");
  const image = createLayers(input, 25, 6);
  const decodedImage =  decodeImage(image);
  const printTopView = chunk(decodedImage, 25).map(ele => decodeLayer(ele)).join("\n");
  console.log(printTopView);
  
}

console.log(main());