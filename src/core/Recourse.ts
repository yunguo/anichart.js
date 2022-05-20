import { imageLoader } from "./ImageLoader";
import { csv, csvParse, json } from "d3";
export class Recourse {
  constructor() {
    if (typeof window === "undefined") {
      var fetch = require("node-fetch-polyfill");
      global.fetch = fetch;
    }
  }
  setup() {
    const promises = [] as Promise<any>[];
    for (const [key, promise] of this.imagesPromise) {
      promise.then((src: CanvasImageSource | null) => {
        if (src) return this.images.set(key, src);
        else return this.images;
      });
      promises.push(promise);
    }
    for (const [key, promise] of this.dataPromise) {
      promise.then((data: any) => this.data.set(key, data));
      promises.push(promise);
    }
    return Promise.all(promises);
  }
  private imagesPromise: Map<
    string,
    Promise<CanvasImageSource | null>
  > = new Map();
  images: Map<string, CanvasImageSource> = new Map();

  private dataPromise: Map<string, Promise<any>> = new Map();
  data: Map<string, any> = new Map();

  loadImage(path: string, name?: string) {
    const promise = imageLoader.load(path);
    if (name) {
      this.imagesPromise.set(name, promise);
    }
    this.imagesPromise.set(path, promise);
    return promise;
  }

  loadCSV(path: string | any, name: string) {
    if (typeof path !== "string") {
      path = path.default;
    }
    if (typeof window !== "undefined") {
      const promise = csv(path);
      this.dataPromise.set(name, promise);
      return promise;
    } else {
      var fs = require("fs");
      var file = fs.readFileSync(path, "utf8");
      const promise = new Promise((resolve, reject) => {
        try {
          resolve(csvParse(file));
        } catch (e) {
          reject(e);
        }
      });
      this.dataPromise.set(name, promise);
      return promise;
    }
  }
  loadJSON(path: string | any, name: string) {
    if (typeof path !== "string") {
      path = path.default;
    }
    this.data.set(name, path);
  }
}
export const recourse = new Recourse();
