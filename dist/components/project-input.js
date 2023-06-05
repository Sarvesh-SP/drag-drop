var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component.js";
import * as validation from "../util/validation.js";
import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
export class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        // Get access to form elements
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent() { }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDesc = this.descriptionInputElement.value;
        const enteredPeope = +this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descValidatable = {
            value: enteredDesc,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enteredPeope,
            required: true,
            min: 1,
            max: 5,
        };
        if (!validation.validate(titleValidatable) ||
            !validation.validate(descValidatable) ||
            !validation.validate(peopleValidatable)) {
            alert("Invalid input");
            return;
        }
        else {
            return [enteredTitle, enteredDesc, enteredPeope];
        }
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            document.getElementById;
        }
        this.clearInputs();
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitHandler", null);
