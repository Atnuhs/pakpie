import {
    PieChartRepositoryInterface,
    PieChartSvg,
} from "../domain/pieChartSvg";

export class PieChartOnMemoryRepository implements PieChartRepositoryInterface {
    private pieChart: PieChartSvg | null;
    constructor() {
        this.pieChart = null;
    }

    save(graph: PieChartSvg): void {
        this.pieChart = graph;
    }

    load(): PieChartSvg {
        return this.pieChart as PieChartSvg;
    }

    isSaved(): boolean {
        return this.pieChart instanceof PieChartSvg;
    }
}
