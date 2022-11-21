import { PieChartSvg } from "../../domain/pieChartSvg";
import { PieChartOnMemoryRepository } from "../../repository/pieChartOnMemoryRepository";
import { newPieChartSvgResponseDTO } from "./newPieChartSvgDTO";

export class NewPieChartSvgUseCase {
    private pieChartOnMemoryRepository = new PieChartOnMemoryRepository();
    getPieChartSvg(): newPieChartSvgResponseDTO {
        if (this.pieChartOnMemoryRepository.isSaved())
            return { svg: this.pieChartOnMemoryRepository.load().svg() };
        else return { svg: new PieChartSvg().svg()};
    }
}
