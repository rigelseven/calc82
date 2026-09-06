import { BUTTONS, KEYBOARD_MAP, NAV_BUTTONS, NAV_DIMENSIONS, REVERSED_KEYBOARD_MAP, ROW_HEIGHTS, VARIABLE_MAP } from "./buttons.js";

export default class LayoutEngine {
    constructor() {
        this.buttons = {};
        this.userKeyboardMap = {};
    }
    
    createButtons() {
        this.buttons = {};
        const container = document.querySelector("#buttons-container");
        container.style.setProperty("--rows", BUTTONS.length);
        
        let outer_index = 0;
        for (const row of BUTTONS) { 
            const rowElement = document.createElement("div");
            rowElement.className = "button-row";

            rowElement.style.gridTemplateColumns = `repeat(${row.length}, minmax(0, 1fr))`;
            container.style.gridTemplateRows =
            ROW_HEIGHTS.map(w => `minmax(0, ${w}fr)`).join(" ");

            let index = 0;
            for (const entry of Object.values(row)) {
                const wrapper = document.createElement("div");
                wrapper.className = "button-wrapper";
                wrapper.id = `${outer_index}_${index}`;
                if (entry !== null) {;
                    const keyName = Object.keys(row)[index]
                    // Get keyboard keys for help menu

                    const label = document.createElement("div");
                    label.className = "button-label";

                    LayoutEngine.renderContent(label, entry[1], entry[2], entry[3]);
                    

                    const button = document.createElement("button");
                    button.className = "input-button";
                    button.style.fontSize = `${3.5*ROW_HEIGHTS[outer_index]}cqb`

                    LayoutEngine.renderContent(button, entry[0], null, null);
                    
                    wrapper.appendChild(label);
                    wrapper.appendChild(button);

                    wrapper.style.gridColumn = index+1;
                    rowElement.appendChild(wrapper);
                    this.buttons[keyName] = ({entry, button});
                }

                index++;
            }
            
            if (outer_index !== BUTTONS.length-1) container.appendChild(rowElement); // avoid adding hidden
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
            this.buttons[dir] = ({entry: NAV_BUTTONS[dir], button: button});
        }
    }

    nameHelpLabels() {
        // Label based on the button map and user-defined map.

        const reversedUserMap = Object.fromEntries(
            Object.entries(this.userKeyboardMap).map(([key, value]) => {
                if (value[0] == "Shift") return ["Shift,Shift", key];  // Shift and alpha are displayed above
                if (value[0] == "Alpha") return ["Alpha,Alpha", key];
                return [value, key];
            })
        );

        Object.entries(this.buttons).forEach(([btnName, button]) => {
            const keyboardKeyNames = {
                Main: reversedUserMap[`${btnName},`] ??
                    (this.userKeyboardMap[REVERSED_KEYBOARD_MAP[`${btnName},`]]
                        ? null
                        : REVERSED_KEYBOARD_MAP[`${btnName},`]),

                Shift: reversedUserMap[`${btnName},Shift`] ??
                    (this.userKeyboardMap[REVERSED_KEYBOARD_MAP[`${btnName},Shift`]]
                        ? null
                        : REVERSED_KEYBOARD_MAP[`${btnName},Shift`]),

                Alpha: reversedUserMap[`${btnName},Alpha`] ??
                    (this.userKeyboardMap[REVERSED_KEYBOARD_MAP[`${btnName},Alpha`]]
                        ? null
                        : REVERSED_KEYBOARD_MAP[`${btnName},Alpha`]),
            };

            for (const activeKeyType of Object.keys(keyboardKeyNames)) {
                const buttonWrapper = button.button.closest('.button-wrapper');
                const helpLabel = (buttonWrapper ? buttonWrapper : button.button).querySelector(`.help-${activeKeyType}`)
                if (helpLabel) {
                    helpLabel.textContent = keyboardKeyNames[activeKeyType];
                    helpLabel.style.display = keyboardKeyNames[activeKeyType] ? "": "none";
                }
            }
        });
    }

    getButton(row, col) {
        if (row == "nav")
            return NAV_BUTTONS[col];
        return Object.values(BUTTONS[row])[col]
    }

    getButtonKey(row, col) {
        if (row == "nav")
            return col;
        return Object.keys(BUTTONS[row])[col]
    }

    getButtonFromKey(key, specialMap=null, ignoreUser=false) {
        let keyMap;
        if (specialMap === "Variable") keyMap = VARIABLE_MAP[key];
        else if (!ignoreUser && key in this.userKeyboardMap) keyMap = this.userKeyboardMap[key];
        else  {
            const keyboardKeyMap = KEYBOARD_MAP[key];
            if (ignoreUser || keyboardKeyMap && !Object.values(this.userKeyboardMap).some(
                value => value[0] === keyboardKeyMap[0] &&
                        value[1] === keyboardKeyMap[1]
            )) {
                keyMap = keyboardKeyMap;
            }
        }
        if (keyMap) {
            return [this.buttons[keyMap[0]].entry, keyMap[1], this.buttons[keyMap[0]].button];
        }
    }

    static renderContent(element, text1 = "", text2 = "", text3 = "") {
        element.replaceChildren();

        const parts = [
            { text: text1, className: "label-main label-text", helpColour: "rgba(0, 180, 255, 0.8)", activeKeyType: "Main" },
            { text: text2, className: "label-shift label-text", helpColour: "rgba(255, 180, 0, 0.8)", activeKeyType: "Shift" },
            { text: text3, className: "label-alpha label-text", helpColour: "rgba(255, 0, 0, 0.8)", activeKeyType: "Alpha" },
        ];

        for (const { text, className, helpColour, activeKeyType } of parts) {
            if (!text) continue;

            const span = document.createElement("span");
            span.className = className;

            if (text.startsWith("$") && text.endsWith("$")) {
                katex.render(`${text.slice(1, -1)}`, span);
            } else {
                span.textContent = text;
            }

            // Add help label
            const helpLabelContainer = document.createElement("div");
            helpLabelContainer.className = "help-overlay-container";
            const helpLabel = document.createElement("div");
            helpLabel.className = `help-overlay help-${activeKeyType}`;
            helpLabel.textContent = "";
            helpLabel.style.backgroundColor = helpColour;
            helpLabelContainer.appendChild(helpLabel);
            span.appendChild(helpLabelContainer);

            element.appendChild(span);
        }
    }

    rebindKey(button, key) {
        this.userKeyboardMap[key] = button;
        this.updateBindsStorage();
    }

    clearRebinds() {
        this.userKeyboardMap = {};
        this.updateBindsStorage();
    }

    removeBind(key) {
        delete(this.userKeyboardMap[key]);
        this.updateBindsStorage();
    }

    updateBindsStorage() {
        localStorage.setItem(
            "userKeybinds",
            JSON.stringify(this.userKeyboardMap)
        );
        this.nameHelpLabels();
    }

    readBindsStorage() {
        let parsedStorage = {};
        try {
            parsedStorage = JSON.parse(localStorage.getItem("userKeybinds"));
        } catch {;}
        this.userKeyboardMap = parsedStorage;
        this.nameHelpLabels();
    }
}