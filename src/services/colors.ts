import { delay } from "q";

const colors = [
  {
    hex: "#00adee",
    name: "Azure",
    rgb: "0, 173, 238"
  },
  {
    hex: "#9a52e5",
    name: "Lightish purple",
    rgb: "154, 82, 229"
  },
  {
    hex: "#22d6b9",
    name: "Tealish",
    rgb: "34, 214, 185"
  },
  {
    hex: "#f04040",
    name: "Tomato",
    rgb: "240, 64, 64"
  },
  {
    hex: "#2167f2",
    name: "Azul",
    rgb: "33, 103, 242"
  },
  {
    hex: "#ffffcb",
    name: "Ivory",
    rgb: "255, 255, 203"
  },
  {
    hex: "#f7f7f7 60%",
    name: "White60",
    rgb: "247, 247, 247, 60%"
  },
  {
    hex: "#000000",
    name: "Black",
    rgb: " 0, 0, 0"
  },
  {
    hex: "#ff2d55",
    name: "Reddish pink",
    rgb: "255, 45, 85"
  },
  {
    hex: "#ffffff",
    name: "White",
    rgb: "255, 255, 255"
  },
  {
    hex: "#000000 50%",
    name: "Black50",
    rgb: "0, 0, 0, 50%"
  },
  {
    hex: "#000000 0%",
    name: "Black0",
    rgb: "0, 0, 0, 0%"
  }
];

export async function fetchColorsApi(): Promise<any[]> {
  return delay(colors, 1000);
}