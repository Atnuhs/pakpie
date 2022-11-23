import {
    PieChartRepositoryInterface,
    PieChartSvg,
} from "../domain/chart/pieChartSvg";
let pieChart: PieChartSvg | null = null;

export class PieChartOnMemoryRepository implements PieChartRepositoryInterface {
    save(graph: PieChartSvg): void {
        pieChart = graph;
    }

    load(): PieChartSvg {
        return pieChart as PieChartSvg;
    }

    isSaved(): boolean {
        return pieChart instanceof PieChartSvg;
    }
}
