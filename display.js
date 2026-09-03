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
            const displayLine = this.displayLines[line];
            this.documentLines[line].style.opacity = 1;
            if (displayLine.length === 0) return;
            if (displayLine.length === 1) {
                this.documentLines[line].innerText = displayLine[0].endsWith("§")
                    ? displayLine[0].slice(0, -1) : displayLine[0];
                if (displayLine[0] && displayLine[0].at(-1) === "§")
                    this.documentLines[line].style.opacity = 0.3;
            }
            else {
                const div1 = document.createElement('div');
                div1.className = 'message-display-half';
                div1.textContent = displayLine[0].endsWith("§")
                    ? displayLine[0].slice(0, -1) : displayLine[0];

                const div2 = document.createElement('div');
                div2.className = 'message-display-half';
                div2.textContent = displayLine[1].endsWith("§")
                    ? displayLine[1].slice(0, -1) : displayLine[1];

                // Append divs to the parent
                if (displayLine[0]) div1.style.opacity = displayLine[0].at(-1) === "§" ? 0.3 : 1;
                if (displayLine[1]) div2.style.opacity = displayLine[1].at(-1) === "§" ? 0.3 : 1;
                this.documentLines[line].append(div1, div2);
            }
        }
    }

    updateDisplay(newLines) {
        this.displayLines = newLines;
        this.renderDisplay();
    }
    
    clearDisplay() {
        this.displayLines = [[""],[""],[""],[""]];
        this.renderDisplay();
    }

    renderError(errorText) {
        this.updateDisplay(
            [
                [errorText],
                [""],
                ["[AC]: Cancel"],
                ["[◀][▶]: Goto"]
            ]
        )
    }

    renderConfirmation(messageText) {
        this.updateDisplay(
            [
                [messageText],
                [""],
                ["[=]: Yes"],
                ["[AC]: Cancel"]
            ]
        )
    }

    renderMenu(options, hasTitle) {
        this.clearDisplay();
        let optionsText = [[], [], [], []];
        if (hasTitle) optionsText[0] = [options[0]];
        for (let idx = hasTitle*2; idx < options.length; idx++) {
            optionsText[Math.floor(idx/2)].push(`${Number(idx)+1-hasTitle*2}: ${options[idx]}`);
        }
        this.updateDisplay(optionsText);
    }
}

export const display = new Display;