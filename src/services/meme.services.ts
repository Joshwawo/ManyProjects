import { createCanvas, loadImage } from "canvas";

const makeTextImage = (input: string) => {
  //creates the html canvas object
  //with a width of 200px
  //and a height of 200px
  const canvas = createCanvas(200, 200);

  //a reference to the 2d canvas rendering context
  //used for drawing shapes, text, and images
  const context = canvas.getContext("2d");

  //the font we are using
  const fontSetting = "bold 50px Impact";

  //set context to use the fontSetting
  context.font = fontSetting;

  //context.measureText is a function that measures the text
  //so we can adjust how wide the finished image is
  const textWidth = context.measureText(input).width;

  //change the canvas width to be wider than the text width
  canvas.width = textWidth + 100;

  //changing canvas width resets the canvas, so change the font again
  context.font = fontSetting;

  //fillStyle sets the color that you are drawing onto the canvas
  context.fillStyle = "white";

  //fillText draws text onto the canvas
  context.fillText(input, 50, 50, textWidth + 50);

  //set the color to black for the outline
  context.fillStyle = "black";

  //strokeText draws an outline of text on the canvas
  context.strokeText(input, 50, 50, textWidth + 50);

  //return a buffer (binary data) instead of the image itself
  return canvas.toBuffer();
};

type inputsTypes = {
  url: string | any;
  textTop: string;
  textBottom: string;
};

const makeMeme = async ({
  //the url of the image to put the text on
  url,
  //the text to put on the image
  textTop,
  textBottom,
}: inputsTypes) => {
  //if there's no image to work with
  //don't try anything
  if (!url) return undefined;

  const canvas = createCanvas(200, 200);
  const context = canvas.getContext("2d");

  const fontSetting = "bold 50px Impact";
  context.font = fontSetting;

  const text = context.measureText(String(textBottom));
  const text2 = context.measureText(String(textTop));
  const textWidth = text.width;
  const textWidth2 = text2.width;

  //loadImage is a function from node-canvas that loads an image
  const image = await loadImage(url);

  //set the canvas to the same size as the image
  canvas.width = image.width;
  canvas.height = image.height;

  //changing the canvas size resets the font
  //so use the fontSetting again
  context.font = fontSetting;

  //do some math to figure out where to put the text
  //indent the text in by half of the extra space to center it
  const center = Math.floor((canvas.width - textWidth) / 2) | 5;
  const centerTop = Math.floor((canvas.width - textWidth2) / 2) | 5;

  //put the text 30 pixels up from the bottom of the canvas
  const bottom = canvas.height - 30;
  const top = 50;

  //put the image into the canvas first
  //x: 0, y: 0 is the upper left corner
  context.drawImage(image, 0, 0);

  //set the color to white
  context.fillStyle = "white";
  //draw the text in white
  //x uses the value we calculated to center the text
  //y is 30 pixels above the bottom of the image
  context.fillText(String(textBottom), center, bottom);
  context.fillText(String(textTop), centerTop, top);

  //set the color to black
  context.fillStyle = "black";
  //draw the outline in black
  context.strokeText(String(textBottom), center, bottom);
    context.strokeText(String(textTop), centerTop, top);

  //return the buffer
  return canvas.toBuffer();
};

export { makeTextImage, makeMeme };
