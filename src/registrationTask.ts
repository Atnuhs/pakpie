const size = 26

const newLabel = (title: string): HTMLLabelElement => {
    const label = document.createElement("label")
    label.innerHTML = title
    label.style.fontSize = `${size}px`
    return label
}


const newTimeInputElement = (): HTMLInputElement => {
    const timeInput = document.createElement("input")
    
    timeInput.type = "text"
    timeInput.placeholder = "XX:XX"
    timeInput.style.width = `${size*3}px`
    timeInput.style.fontSize = `${size*0.9}px`
    timeInput.pattern = '^[0-9]{2}:[0-9]{2}$'
    timeInput.required = true
    timeInput.title = "hogehoge"
    return timeInput
}

const newTaskNameInputElement = (): HTMLInputElement => {
    const textInput = document.createElement("input")

    textInput.type = "text"
    textInput.required = true
    textInput.style.width = `${size*8}px`
    textInput.style.fontSize = `${size*0.9}px`
    return textInput
}

const newColorInputElement = (): HTMLInputElement => {
    const colorInput = document.createElement('input')
    colorInput.type = 'color'
    colorInput.required = true
    colorInput.style.width = `${size*2}px`
    colorInput.style.height = `${size*1.2}px`
    return colorInput
}


export const newRegistrationTaskForm = (): HTMLFormElement => {
    const form = document.createElement("form")
    const legend = document.createElement("legend")
    const labelTaskName = newLabel("Task Name:")
    const labelStartTime = newLabel("Start Time:")
    const labelFinishTime = newLabel("Finish Time:")
    const labelColor = newLabel("Color:")
    const inputTaskName = newTaskNameInputElement()
    const inputStartTime = newTimeInputElement()
    const inputFinishTime = newTimeInputElement()
    const inputColor = newColorInputElement()
    const submitButton = document.createElement("button")

    inputTaskName.name = 'task-name'
    inputStartTime.name = 'start-time'
    inputFinishTime.name = 'finish-time'
    inputColor.name = 'color'

    form.style.border = "solid 2px #eee"
    form.style.boxShadow = "4px 4px 10px -2px"
    form.style.padding = "10px"
    form.style.display = "flex"
    form.style.flexDirection = "column"
    form.style.alignItems = "flex-start"
    form.style.fontSize = `${size}px`
    form.style.border = "solid"

    legend.innerHTML = "New Task Registration"

    submitButton.innerHTML = "TOUROKU"
    submitButton.style.fontSize = `${size}px`

    labelTaskName.appendChild(inputTaskName)
    labelStartTime.appendChild(inputStartTime)
    labelFinishTime.appendChild(inputFinishTime)
    labelColor.appendChild(inputColor)

    form.appendChild(legend)
    form.appendChild(labelTaskName)
    form.appendChild(labelStartTime)
    form.appendChild(labelFinishTime)
    form.appendChild(labelColor)
    form.appendChild(submitButton)
    return form
}