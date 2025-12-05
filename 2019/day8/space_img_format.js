import { chunk } from "@std/collections/chunk";
import { sortBy } from "@std/collections/sort-by";
import { createFp } from "jsr:@std/internal@^1.0.12/diff";

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

const countFrequency = (image) =>  image.map(layer => findFrequency(layer));

const main = () => {
  const input = Deno.readTextFileSync("./data.txt");
  const image = createLayers(input,25,6);
  const freqOfLayers = countFrequency(image);
  const sortBy0 = sortBy(freqOfLayers, layer => layer[0]);
  const fewest0Layer = sortBy0[0];
  return fewest0Layer[1] * fewest0Layer[2];
  
}

console.log(main());