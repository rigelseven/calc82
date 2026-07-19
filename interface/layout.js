import { BUTTONS, ROW_HEIGHTS } from "./buttons.js";

export default class LayoutEngine {
    constructor() {
        this.buttons = [];
    }
    
    createButtons() {
        this.buttons = [];
        const container = document.querySelector("#buttons-container");
        container.style.setProperty("--rows", BUTTONS.length);
        
        let index = 0;
        for (const row of BUTTONS) {
            const rowElement = document.createElement("div");
            rowElement.className = "button-row";

            rowElement.style.gridTemplateColumns = `repeat(${row.length}, minmax(0, 1fr))`;
            container.style.gridTemplateRows =
            ROW_HEIGHTS.map(w => `minmax(0, ${w}fr)`).join(" ");
            const buttonRow = [];

            for (const entry of row) {
                const wrapper = document.createElement("div");
                wrapper.className = "button-wrapper";
                if (entry !== null) {;
                    const label = document.createElement("div");
                    label.className = "button-label";
                    LayoutEngine.renderContent(label, entry[1], entry[2], entry[3]);
                    const button = document.createElement("button");
                    button.className = "input-button";
                    button.style.fontSize = `${3.5*ROW_HEIGHTS[index]}cqb`
                    LayoutEngine.renderContent(button, entry[0]);

                    wrapper.appendChild(label);
                    wrapper.appendChild(button);
                }

                rowElement.appendChild(wrapper);
                buttonRow.push({wrapper});
            }
            
            container.appendChild(rowElement);
            this.buttons.push(buttonRow);
            index++;
        }
    }

static renderContent(element, text1 = "", text2 = "", text3 = "") {
    element.replaceChildren();

    const parts = [
        { text: text1, className: "label-main" },
        { text: text2, className: "label-shift" },
        { text: text3, className: "label-alpha" },
    ];

    for (const { text, className } of parts) {
        if (!text) continue;

        const span = document.createElement("span");
        span.className = className;

        if (text.startsWith("$") && text.endsWith("$")) {
            katex.render(`${text.slice(1, -1)}`, span);
        } else {
            span.textContent = text;
        }

        element.appendChild(span);
    }
}
}