export function validate(valiInput) {
    let isValid = true;
    if (valiInput.required) {
        isValid = isValid && valiInput.value.toString().trim().length !== 0;
    }
    if (valiInput.minLength != null && typeof valiInput.value === "string") {
        isValid = isValid && valiInput.value.length >= valiInput.minLength;
    }
    if (valiInput.maxLength != null && typeof valiInput.value === "string") {
        isValid = isValid && valiInput.value.length <= valiInput.maxLength;
    }
    if (valiInput.min != null && typeof valiInput.value === "number") {
        isValid = isValid && valiInput.value >= valiInput.min;
    }
    if (valiInput.max != null && typeof valiInput.value === "number") {
        isValid = isValid && valiInput.value <= valiInput.max;
    }
    return isValid;
}
