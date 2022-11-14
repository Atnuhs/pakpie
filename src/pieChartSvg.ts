import { P } from "@tauri-apps/api/event-2a9960e7"

interface TaskData {
    readonly taskName: string
    readonly startTime : string
    readonly finishTime : string
}

class PieChartData {
    constructor(
        private taskName: string,
        private radianSpans: [start: number, finish: number][],
        private selected: boolean = false
    ){}

    private static strTimeToSec(timeStr: string): number {
        let [h,m] = timeStr.split(":").map(str => Number(str))
        return h*3600 + m*60 
    }

    private static secToRadian(sec: number): number {
        let DaySec = 24*60*60
        return sec / DaySec * 2 * Math.PI
    }

    private static strTimeToRadian(timeStr: string): number {
        return this.secToRadian(this.strTimeToSec(timeStr))
    }    
    
    private static strTimeSpanToRadianSpan([startTimeStr, finishTimeStr]: [string, string]): [number, number] {
        let startRadian = this.strTimeToRadian(startTimeStr)
        let finishRadian = this.strTimeToRadian(finishTimeStr)
        return [startRadian, finishRadian]
    }

    static newFromTaskData(taskData: TaskData): PieChartData {
        return new PieChartData(taskData.taskName, [this.strTimeSpanToRadianSpan([taskData.startTime, taskData.finishTime])])
    }

    private setPieAttributes() {

    }

    taskNameIs(taskName: string): boolean{
        return this.taskName === taskName
    }

    appendSpans(taskData: TaskData):void {
        let radianSpan = PieChartData.strTimeSpanToRadianSpan([taskData.startTime, taskData.finishTime])
        this.radianSpans.push(radianSpan)
    }

    newPieClickHandler(): EventListener{

        return (e: Event) => {
            const pie = e.target as SVGPathElement
            if (this.selected) {
                pie.setAttribute('fill-opacity', '50%')
                this.selected = false
            } else {
                pie.setAttribute('fill-opacity', '80%')
                this.selected = true
            }
            
        }
    }

    toSvg(center: number, radius: number, fontSize: number): [SVGPathElement, SVGTextElement][] {
        return this.radianSpans.map(radianSpan => {
            const pie = document.createElementNS("http://www.w3.org/2000/svg", "path")
            const pieText = document.createElementNS("http://www.w3.org/2000/svg", "text")
            const [startRadian, finishRadian] = radianSpan
            const sx = Math.sin(startRadian)*radius + center
            const sy = -Math.cos(startRadian)*radius + center
            const fx = Math.sin(finishRadian)*radius + center
            const fy = -Math.cos(finishRadian)*radius + center
            const rad = finishRadian - startRadian
            const largeArcSweepFlag = rad <= Math.PI ? 0: 1

            pie.setAttribute('d', `
                M ${center} ${center} 
                L ${sx} ${sy}
                A ${radius} ${radius}
                0 ${largeArcSweepFlag} 1
                ${fx} ${fy} Z`)
            pie.setAttribute('fill', '#aaa')
            pie.setAttribute('fill-opacity', '50%')
            pie.onpointerdown = this.newPieClickHandler()

            const gx = (center + sx + fx) / 3
            const gy = (center + sy + fy) / 3
            pieText.innerHTML = `${this.taskName}`
            pieText.setAttribute('x', `${gx}`)
            pieText.setAttribute('y', `${gy}`)
            pieText.setAttribute('text-anchor', 'middle')
            pieText.setAttribute('dominant-baseline', 'central')
            pieText.setAttribute('font-size', `${fontSize}`)
            return [pie, pieText]
        })
    } 
}

class PieChartDatas {
    constructor(private pies: PieChartData[]) {}

    static newFromTaskDatas (taskDatas: TaskData[]): PieChartDatas {
        let pieChartDatas: PieChartDatas = new PieChartDatas([])
    
        taskDatas.forEach(taskData => {
            pieChartDatas.append(taskData)
        })
        return pieChartDatas
    }

    indexOf(taskName: string): [number, boolean] {
        
        for (let i=0; i<this.pies?.length; i++) {
            if (this.pies[i].taskNameIs(taskName)) return [i, true]
        }
        return [-1, false]
    }

    append(taskData: TaskData): void {
        let [index, include] = this.indexOf(taskData.taskName)
        if (include) {
            this.pies[index].appendSpans(taskData)
        } else {
            this.pies.push(PieChartData.newFromTaskData(taskData))
        }
    }

    newPieSvgs(center: number, radius: number, fontSize: number): [SVGPathElement, SVGTextElement][] {
        let allSvgs: [SVGPathElement, SVGTextElement][] = []
        this.pies.forEach(pie => {
            allSvgs.push(...pie.toSvg(center, radius, fontSize))
        })
        return allSvgs
    }
}


const newGraphCircle = (center: number, radius: number): SVGCircleElement => {
    const graphCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    graphCircle.setAttribute('cx', `${center}`)
    graphCircle.setAttribute('cy', `${center}`)
    graphCircle.setAttribute('r', `${radius}`)
    graphCircle.setAttribute('fill', "None")
    graphCircle.setAttribute('stroke', "#aaa")

    return graphCircle
}

const newGraphAxisLabel = (i:number, center: number, axisRadius: number, fontSize: number): SVGTextElement => {
        const timeText = document.createElementNS("http://www.w3.org/2000/svg", "text")
        const rad = (i/24)*2*Math.PI
        const x = Math.sin(rad)*axisRadius + center
        const y = -Math.cos(rad)*axisRadius + center

        timeText.innerHTML = `${i}`
        timeText.setAttribute('x', `${x}`)
        timeText.setAttribute('y', `${y}`)
        timeText.setAttribute('text-anchor', 'middle')
        timeText.setAttribute('dominant-baseline', 'central')
        timeText.setAttribute('font-size', `${fontSize}`)
        return timeText
}

const newGraphAxis = (i:number, center: number, radius: number, axisLength: number): SVGLineElement => {
    const axis = document.createElementNS("http://www.w3.org/2000/svg", "line")
    const rad = (i/24)*2*Math.PI
    const x1 = Math.sin(rad)*radius + center
    const y1 = -Math.cos(rad)*radius + center
    const x2 = Math.sin(rad)*(radius-axisLength) + center
    const y2 = -Math.cos(rad)*(radius-axisLength) + center
    
    axis.setAttribute('x1', `${x1}`)
    axis.setAttribute('y1', `${y1}`)
    axis.setAttribute('x2', `${x2}`)
    axis.setAttribute('y2', `${y2}`)
    axis.setAttribute('stroke', '#4444')
    return axis
}


export const newPieChartDiv = (taskDatas: TaskData[]): HTMLDivElement => {
    const pieChartDiv = document.createElement("div")
    const pieChartSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    const size = 500
    const center = size/2
    const radius = center*0.8
    const axisRadius = center*0.88
    const fontSizeAxis = center / 10
    const fontSizeLabel = center / 12
    const axisLength = radius * 0.1

    const pieChartDatas = PieChartDatas.newFromTaskDatas(taskDatas)

    pieChartSvg.setAttribute('width', String(size))
    pieChartSvg.setAttribute('height', String(size))


    for (let i=0; i<24; i++) {
        pieChartSvg.appendChild(newGraphAxisLabel(i, center, axisRadius, fontSizeAxis))
        pieChartSvg.appendChild(newGraphAxis(i, center, radius, axisLength))
    }

    pieChartDatas.newPieSvgs(center, radius, fontSizeLabel).forEach(([pie, pieText]) => {
        pieChartSvg.appendChild(pie)
        pieChartSvg.appendChild(pieText)
    })

    pieChartDiv.style.border = "solid 2px #eee"
    pieChartDiv.style.boxShadow = "4px 4px 10px -2px"

    pieChartSvg.appendChild(newGraphCircle(center, radius))
    pieChartDiv.appendChild(pieChartSvg)
    pieChartDiv.onpointerdown = (e: Event) => {e.preventDefault()}
    return pieChartDiv
}