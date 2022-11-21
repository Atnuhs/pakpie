import { TaskRepositoryInterface } from "../domain/taskRepositoryInterface";

export class TaskDto {
    constructor(
        public name: string,
        public startTime: string,
        public finishTime: string,
    ){}
}

export class AddTaskUseCase {
    const taskRepository: TaskRepositoryInterface 
    constructor(
        
    ){}

    addTask(taskDto: TaskDto): void {
        
    }
}