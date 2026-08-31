import { display } from "./display.js";
import trigSolver from "./math/trigonometry.js";
import { settingsManager } from "./settingsManager.js";
import { statusBar } from "./statusbar.js";

class MenuManager {
    constructor() {
        this.currentMenu = null
    }

    displayMenu() {
        if (this.currentMenu === null) return;
        const currentMenuItems = MENUS[this.currentMenu];
        let showMenu = [];
        let hasTitle = false;
        statusBar.toggle('up', false);
        statusBar.toggle('down', false);
        for (const item of Object.values(currentMenuItems)) {
            if (item.Name) showMenu.push(item.Name);
            if (item.Title) {
                showMenu.splice(0, 0, item.Title, "");
                hasTitle = true;
            }
        }
        if (currentMenuItems.Up) statusBar.toggle('up', true);
        if (currentMenuItems.Down) statusBar.toggle('down', true);
        display.renderMenu(showMenu, hasTitle);
    }

    executeMenuItem(item) {
        if (this.currentMenu === null) return;
        const currentMenuItems = MENUS[this.currentMenu];
        const menuItem = currentMenuItems[item];
        if (!menuItem) return;

        // Pagination
        if (menuItem.ToPage) {
            this.currentMenu = menuItem.ToPage;
            this.displayMenu();
        }
        else {
            if (menuItem.Action) {
                if (menuItem.Action.startsWith("Token")) return menuItem.Action;
                switch (menuItem.Action) {
                    case "SetRadians": trigSolver.setAngleMode("rad"); return this.leaveMenus();
                    case "SetDegrees": trigSolver.setAngleMode("deg"); return this.leaveMenus();
                    case "SetGradians": trigSolver.setAngleMode("gra"); return this.leaveMenus();

                    case "SetDPDot": settingsManager.setSetting("decimalPoint", "dot"); return this.leaveMenus();
                    case "SetDPComma": settingsManager.setSetting("decimalPoint", "comma"); return this.leaveMenus();
                }
            }
            return this.leaveMenus();
        }
    }

    handleMenuAction(menuAction) {
        if (menuAction === "Exit") return this.leaveMenus();

        // Handle direct menu calls
        if (["Modes", "Setup", "Degree", "Hyp"].includes(menuAction)) this.currentMenu = menuAction;

        // Handle number menu navigation
        let ret;
        if (menuAction) ret = this.executeMenuItem(menuAction);

        this.displayMenu()
        return ret;
    }

    leaveMenus() {
        display.clearDisplay();
        this.currentMenu = null;
        return "Exit";
    }
}

const MENUS = {
    Modes: {
        1: {Name: "COMP"},
        2: {Name: "STAT"},
        3: {Name: "VERIF"}
    },

    Setup: {
        1: {Name: "MthIO"},
        2: {Name: "LineIO"},
        3: {Name: "Deg", Action: "SetDegrees"},
        4: {Name: "Rad", Action: "SetRadians"},
        5: {Name: "Gra", Action: "SetGradians"},
        6: {Name: "Fix"},
        7: {Name: "Sci"},
        8: {Name: "Norm"},
        Down: {ToPage: "Setup2"}
    },

    Setup2: {
        1: {Name: "ab/c"},
        2: {Name: "d/c"},
        3: {Name: "STAT"},
        4: {Name: "Disp", ToPage: "Disp"},
        5: {Name: "⏴CONT⏵"},
        Up: {ToPage: "Setup"}
    },

    Disp: {
        Title: {Title: "Decimal Point?"},
        1: {Name: "Dot", Action: "SetDPDot"},
        2: {Name: "Comma", Action: "SetDPComma"}
    },

    Degree: {
        1: {Name: "°", Action: "Tokend"},
        2: {Name: "r", Action: "Tokenr"},
        3: {Name: "g", Action: "Tokeng"}
    },

    Hyp: {
        1: {Name: "sinh", Action: "TokenSinh"},
        2: {Name: "cosh", Action: "TokenCosh"},
        3: {Name: "tanh", Action: "TokenTanh"},
        4: {Name: "sinh⁻¹", Action: "TokenAsinh"},
        5: {Name: "cosh⁻¹", Action: "TokenAcosh"},
        6: {Name: "tanh⁻¹", Action: "TokenAtanh"}
    }
}

export const menuManager = new MenuManager;