import { BUTTONS, NAV_BUTTONS, NAV_DIMENSIONS, ROW_HEIGHTS } from "./buttons.js";

export default class LayoutEngine {
    constructor() {
        this.buttons = [];  // TODO: is this really needed
    }
    
    createButtons() {
        this.buttons = [];
        const container = document.querySelector("#buttons-container");
        container.style.setProperty("--rows", BUTTONS.length);
        
        let outer_index = 0;
        for (const row of BUTTONS) {
            const rowElement = document.createElement("div");
            rowElement.className = "button-row";

            rowElement.style.gridTemplateColumns = `repeat(${row.length}, minmax(0, 1fr))`;
            container.style.gridTemplateRows =
            ROW_HEIGHTS.map(w => `minmax(0, ${w}fr)`).join(" ");
            const buttonRow = [];

            let index = 0;
            for (const entry of row) {
                const wrapper = document.createElement("div");
                wrapper.className = "button-wrapper";
                wrapper.id = `${outer_index}_${index}`;
                if (entry !== null) {;
                    const label = document.createElement("div");
                    label.className = "button-label";

                    LayoutEngine.renderContent(label, entry[1], entry[2], entry[3]);
                    const button = document.createElement("button");
                    button.className = "input-button";
                    button.style.fontSize = `${3.5*ROW_HEIGHTS[outer_index]}cqb`
                    LayoutEngine.renderContent(button, entry[0]);
                    
                    wrapper.appendChild(label);
                    wrapper.appendChild(button);

                    wrapper.style.gridColumn = index+1;
                    rowElement.appendChild(wrapper);
                    buttonRow.push({wrapper});
                }

                index++;
            }
            
            container.appendChild(rowElement);
            this.buttons.push(buttonRow);
            outer_index++;
        }
        this.createNavButtons();
    }

    createNavButtons() {
        const container = document.querySelector("#buttons-overlay");

        const cx = NAV_DIMENSIONS.cx;
        const cy = NAV_DIMENSIONS.cy;
        const offsetx = NAV_DIMENSIONS.offsetx;
        const offsety = NAV_DIMENSIONS.offsety;

        const positions = {
            up:    [cx, cy - offsety],
            left:  [cx - offsetx, cy],
            right: [cx + offsetx, cy],
            down:  [cx, cy + offsety],
        };

        for (const [dir, [x, y]] of Object.entries(positions)) {
            const button = document.createElement("button");
            
            button.id = `nav_${dir}`;
            button.className = "nav-button";
            button.style.position = "absolute";
            button.style.left = `${x}%`;
            button.style.top = `${y}%`;
            button.style.transform = "translate(-50%, -50%)";
            button.textContent = NAV_BUTTONS[dir][0];
            
            container.appendChild(button);
            this.buttons.push(button)
        }
    }

    getButton(row, col) {
        if (row == "nav")
            return NAV_BUTTONS[col];
        return BUTTONS[row][col]
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