import { Project, ProjectStatus } from "../models/project.js";

type Listener<T> = (items: T[]) => void;

class State<T> {
	protected listeners: Listener<T>[] = [];

	addListener(listernerFn: Listener<T>) {
		this.listeners.push(listernerFn);
	}
}

// Project State Management
export class ProjectState extends State<Project> {
	private projects: Project[] = [];
	private static instace: ProjectState;

	private constructor() {
		super();
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

	addProject(title: string, desc: string, numOfPeople: number) {
		const newProject = new Project(
			Math.random().toString(),
			title,
			desc,
			numOfPeople,
			ProjectStatus.Active
		);

		this.projects.push(newProject);
		this.updateListeners();
	}

	moveProject(projectId: string, newStatus: ProjectStatus) {
		const project = this.projects.find((prj) => prj.id === projectId);

		if (project && project.status !== newStatus) {
			project.status = newStatus;
			this.updateListeners();
		}
	}

	private updateListeners() {
		for (const fn of this.listeners) {
			fn(this.projects.slice()); // Copy of the array pushed.
		}
	}
}

// Singleton Method
export const projectState = ProjectState.getInstance();
