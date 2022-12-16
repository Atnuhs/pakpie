import { PieChartSvg } from "../../../domain/chart/pieChartSvg";
import { PieChartOnMemoryRepository } from "../../repository/pieChartOnMemoryRepository";
import { NewPieChartSvgResponseDTO } from "./newPieChartSvgDTO";

export class NewPieChartSvgUseCase {
    private pieChartOnMemoryRepository = new PieChartOnMemoryRepository();
    getPieChartSvg(): NewPieChartSvgResponseDTO {
        const pieChart = this.pieChartOnMemoryRepository.isSaved()
            ? this.pieChartOnMemoryRepository.load()
            : new PieChartSvg();
        return {
            svg: pieChart.svg(),
        };
    }
}
