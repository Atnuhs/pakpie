import { PieChartSvg } from "../../../domain/chart/pieChartSvg";
import { PieChartOnMemoryRepository } from "../../repository/pieChartOnMemoryRepository";
import { AddNewPieRequestDTO } from "./addNewPieDTO";

export class AddNewPieUseCase {
    private pieChartOnMemoryRepository = new PieChartOnMemoryRepository();
    addNewPie(req: AddNewPieRequestDTO): void {
        const pieChart = this.pieChartOnMemoryRepository.isSaved()
            ? this.pieChartOnMemoryRepository.load()
            : new PieChartSvg();

        pieChart.pushPie(req);
        this.pieChartOnMemoryRepository.save(pieChart);
    }
}
