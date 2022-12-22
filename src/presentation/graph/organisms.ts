import { Task } from "../task/task";
import { oSize, pie, rect, rSize, svg, text } from "./atoms";
import { frame } from "./moleculers";

export class PieChartSvg {
    private tasks: Task[] = [Task.new({label: "test", startTime: "0:00", finishTime: "12:00", color: "#ef2"})];
    svg(): SVGElement {
        const s = svg();
        const o = { x: oSize, y: oSize };
        const r = { value: rSize };

        s.appendChild(rect());
        frame().map((part) => s.appendChild(part));
        this.tasks.map((task) => s.appendChild(pie(task.getPieData(o, r))));
        this.tasks.map((task) =>
            s.appendChild(text(task.label, task.getPieData(o, r).g))
        );
        return s;
    }

    pushTask(task: Task) {
        this.tasks.push(task);
    }
}
