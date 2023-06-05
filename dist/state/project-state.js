import { Project, ProjectStatus } from "../models/project.js";
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listernerFn) {
        this.listeners.push(listernerFn);
    }
}
// Project State Management
export class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    // Singleton method
    static getInstance() {
        if (this.instace) {
            return this.instace;
        }
        this.instace = new ProjectState();
        return this.instace;
    }
    // Subscriber method
    addProject(title, desc, numOfPeople) {
        const newProject = new Project(Math.random().toString(), title, desc, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((prj) => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const fn of this.listeners) {
            fn(this.projects.slice()); // Copy of the array pushed.
        }
    }
}
// Singleton Method
export const projectState = ProjectState.getInstance();
