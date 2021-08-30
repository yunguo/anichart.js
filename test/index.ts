import * as ani from "../src/index";
import * as d3 from "d3";
const stage = new ani.Stage();
stage.options.fps = 60;
stage.options.sec = 60 * 0.5;
stage.outputOptions.splitSec = 60 * 0.5;
stage.output = true;
stage.addChild(new ani.Rect({ fillStyle: "#333" }));
let t1 = new ani.Text({
  fontSize: 120,
  position: { x: 500, y: 500 },
  shadow: { blur: 20, enable: true, color: "#000" },
  text: "hello, world!",
});
let t2 = new ani.Text({
  fontSize: 120,
  position: { x: 1500, y: 500 },
  shadow: { blur: 20, enable: true, color: "#000" },
  text: "hello, world!",
});
stage.addChild(
  new ani.Rect({ fillStyle: "#333", shape: { width: 1920, height: 1080 } })
);
stage.addChild(ani.createAni([t1, t2], [0, 0.5 * 60]));
stage.play();

if (typeof window !== "undefined") {
  (window as any).stage = stage;
  (window as any).d3 = d3;
}
