class Display {
    constructor() {
        this.displayLines = ["","","",""];
        this.documentLines = [
            document.querySelector("#message-display-line1"),
            document.querySelector("#message-display-line2"),
            document.querySelector("#message-display-line3"),
            document.querySelector("#message-display-line4"),
        ];
    }

    renderDisplay() {
        for (const line in this.displayLines) {
            this.documentLines[line].innerText = this.displayLines[line];
        }
    }

    updateDisplay(newLines) {
        this.displayLines = newLines;
        this.renderDisplay();
    }

    clearDisplay() {
        this.displayLines = ["","","",""];
        this.renderDisplay();
    }

    renderError(errorText) {
        this.updateDisplay(
            [
                errorText,
                "",
                "[AC]: Cancel",
                "[◀][▶]: Goto"
            ]
        )
    }
}

export const display = new Display;