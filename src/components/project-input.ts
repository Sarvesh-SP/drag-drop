import { Component } from "./base-component.js";
import * as validation from "../util/validation.js";
import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		super("project-input", "app", true, "user-input");

		// Get access to form elements
		this.titleInputElement = this.element.querySelector(
			"#title"
		) as HTMLInputElement;
		this.descriptionInputElement = this.element.querySelector(
			"#description"
		) as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector(
			"#people"
		) as HTMLInputElement;

		this.configure();
	}

	configure() {
		this.element.addEventListener("submit", this.submitHandler);
	}

	renderContent(): void {}

	private gatherUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputElement.value;
		const enteredDesc = this.descriptionInputElement.value;
		const enteredPeope = +this.peopleInputElement.value;

		const titleValidatable: validation.Validatable = {
			value: enteredTitle,
			required: true,
		};

		const descValidatable: validation.Validatable = {
			value: enteredDesc,
			required: true,
			minLength: 5,
		};
		const peopleValidatable: validation.Validatable = {
			value: +enteredPeope,
			required: true,
			min: 1,
			max: 5,
		};

		if (
			!validation.validate(titleValidatable) ||
			!validation.validate(descValidatable) ||
			!validation.validate(peopleValidatable)
		) {
			alert("Invalid input");
			return;
		} else {
			return [enteredTitle, enteredDesc, enteredPeope];
		}
	}

	@AutoBind
	private submitHandler(event: Event) {
		event.preventDefault();
		const userInput = this.gatherUserInput();
		if (Array.isArray(userInput)) {
			const [title, desc, people] = userInput;
			projectState.addProject(title, desc, people);
			document.getElementById;
		}
		this.clearInputs();
	}

	private clearInputs() {
		this.titleInputElement.value = "";
		this.descriptionInputElement.value = "";
		this.peopleInputElement.value = "";
	}
}
