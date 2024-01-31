import { Controller } from "@hotwired/stimulus";
import { Circle, SVG } from "@svgdotjs/svg.js";
import { Bezier, Point } from "bezier-js";
import interact from "interactjs";
import { pid } from "process";

export default class extends Controller {
  static targets = ["container"];
  declare readonly containerTarget: HTMLElement;

  connect() {
    const draw = SVG().addTo(this.containerTarget).size("100%", "100%");

    const p = draw
      .path("M 100 100 C 100 300 300 100 400 400")
      .fill("none")
      .stroke("black");

    const l = draw
      .line([
        [500, 0],
        [500, 1000],
      ])
      .stroke("black");

    var p1 = draw.circle(30).move(100, 100).fill("cyan");
    var p2 = draw.circle(30).move(100, 300).fill("magenta");
    var p3 = draw.circle(30).move(400, 200).fill("yellow");
    var p4 = draw.circle(30).move(400, 400).fill("black");

    const redraw = () =>
      p.plot(
        `M ${p1.cx()} ${p1.cy()} C ${p2.cx()} ${p2.cy()} ${p3.cx()} ${p3.cy()} ${p4.cx()} ${p4.cy()}`
      );

    const bindero = (p: Circle, opts: any = {}) => {
      interact(p.node).draggable({
        // lockAxis: "x",
        ...opts,
        inertia: true,
        listeners: {
          move(event) {
            p.dmove(event.dx, event.dy);
            const bee = new Bezier([
              { x: p1.cx(), y: p1.cy() },
              { x: p2.cx(), y: p2.cy() },
              { x: p3.cx(), y: p3.cy() },
              { x: p4.cx(), y: p4.cy() },
            ]);
            const foo = bee.intersects({
              p1: { x: 500, y: 0 },
              p2: { x: 500, y: 1000 },
            });
            if (foo.length) {
              p.dmove(-event.dx, -event.dy);
              return;
            }
            redraw();
          },
        },
      });
    };

    bindero(p1, { lockAxis: "x" });
    bindero(p2);
    bindero(p3);
    bindero(p4, { lockAxis: "x" });
  }

  disconnect() {}
}
