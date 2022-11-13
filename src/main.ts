import { newPieChartDiv } from "./pieChartSvg"
const init = () => {
  const container = document.createElement("div")
  const visualizedSvg = newPieChartDiv(generateTestTasksData())
  container.appendChild(visualizedSvg)
  document.body.appendChild(container)
}

const generateTestTasksData = () => {
  return [{
    "taskName": "testData", 
    "startTime": "10:20", 
    "finishTime": "12:00"
  }, {
    "taskName": "sleep",
    "startTime": "23:30",
    "finishTime": "07:30"
  }]
}

window.onload = () => {
  init()
}
