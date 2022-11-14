import { newPieChartDiv } from "./pieChartSvg"
import { newRegistrationTaskForm } from "./registrationTask"
const init = () => {
  const container = document.createElement("div")
  const visualizedDiv = newPieChartDiv(generateTestTasksData())
  const registForm = newRegistrationTaskForm()

  registForm.onsubmit = (e: Event) => {
    alert("submitted")
  }

  container.style.display = "grid"
  container.style.gridTemplateColumns = "1fr 1fr"
  container.style.gap = "10px"

  container.appendChild(registForm)
  container.appendChild(visualizedDiv)
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
  }, {
    "taskName": "sleep",
    "startTime": "08:30",
    "finishTime": "09:30"
  }]
}

window.onload = () => {
  init()
}
