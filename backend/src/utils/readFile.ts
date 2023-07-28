import * as fs from "fs";
import * as path from "path";

export const dataFromFile = fs
  .readFileSync(path.join(__dirname, "../../src/assets/files/hemingway.txt"), "utf8")
  .match(/[a-zA-Z0-9'-]+/g);
