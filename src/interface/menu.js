import { display } from "./display.js";
import { variableManager } from "../evaluator/variables.js";
import { historyManager } from "../history.js";
import trigSolver from "../math/trigonometry.js";
import { settingsManager } from "../settingsManager.js";
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
            if (item.Confirm) {
                display.renderConfirmation(item.Confirm);
                return;
            } 
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
        let menuItem;
        // Digit
        if (MENUS[this.currentMenu].Digit) {
            menuItem = MENUS[this.currentMenu].Digit;
            if (!(/^\d$/.test(item) && item >= menuItem.Digit[0] && item <= menuItem.Digit[1])) return;
        } else {
            const currentMenuItems = MENUS[this.currentMenu];
            menuItem = currentMenuItems[item];
            if (!menuItem) return;
        }
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

                    case "SetDefaultMixed": settingsManager.setSetting("fractionMode", "mixed"); return this.leaveMenus();
                    case "SetDefaultImproper": settingsManager.setSetting("fractionMode", "fraction"); return this.leaveMenus();

                    case "SetDPDot": settingsManager.setSetting("decimalPoint", "dot"); return this.leaveMenus();
                    case "SetDPComma": settingsManager.setSetting("decimalPoint", "comma"); return this.leaveMenus();

                    case "SetFix": settingsManager.setSetting("displayMode", ["fix", item]); return this.leaveMenus();
                    case "SetSci": settingsManager.setSetting("displayMode", ["sci", item]); return this.leaveMenus();
                    case "SetNorm": settingsManager.setSetting("displayMode", ["norm", item]); return this.leaveMenus();

                    case "ClearMemory":
                        variableManager.clearVariables();
                        historyManager.clearHistory();
                        return "ClearIO";
                    case "ClearSetup":
                        settingsManager.clearSettings();
                        trigSolver.setAngleMode("deg");
                        return this.leaveMenus();
                    case "ClearAll":                     
                        variableManager.clearVariables();
                        historyManager.clearHistory();
                        settingsManager.clearSettings();
                        trigSolver.setAngleMode("deg");
                        return "ClearIO";
                }
            }
            return this.leaveMenus();
        }
    }

    handleMenuAction(menuAction) {
        if (menuAction === "Exit") return this.leaveMenus();

        // Handle direct menu calls
        if (["Modes", "Setup", "Degree", "Hyp", "Clr"].includes(menuAction)) this.currentMenu = menuAction;

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
        2: {Name: "STAT§"},
        3: {Name: "VERIF§"}
    },

    Setup: {
        1: {Name: "MthIO"},
        2: {Name: "LineIO§"},
        3: {Name: "Deg", Action: "SetDegrees"},
        4: {Name: "Rad", Action: "SetRadians"},
        5: {Name: "Gra", Action: "SetGradians"},
        6: {Name: "Fix", ToPage: "Fix"},
        7: {Name: "Sci", ToPage: "Sci"},
        8: {Name: "Norm", ToPage: "Norm"},
        Down: {ToPage: "Setup2"}
    },

    Setup2: {
        1: {Name: "ab/c", Action: "SetDefaultMixed"},
        2: {Name: "d/c", Action: "SetDefaultImproper"},
        3: {Name: "STAT§"},
        4: {Name: "Disp", ToPage: "Disp"},
        5: {Name: "⏴CONT⏵§"},
        Up: {ToPage: "Setup"}
    },

    Disp: {
        Title: {Title: "Decimal Point?"},
        1: {Name: "Dot", Action: "SetDPDot"},
        2: {Name: "Comma", Action: "SetDPComma"}
    },

    Fix: {
        Title: {Title: "Fix 0~9?"},
        Digit: {Action: "SetFix", Digit: [0, 9]}
    },

    Sci: {
        Title: {Title: "Sci 0~9?"},
        Digit: {Action: "SetSci", Digit: [0, 9]}
    },

    Norm: {
        Title: {Title: "Norm 1~2?"},
        Digit: {Action: "SetNorm", Digit: [1, 2]}
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
    },

    Clr: {
        Title: {Title: "Clear?"},
        1: {Name: "Setup", ToPage: "ClearSetupConfirm"},
        2: {Name: "Memory", ToPage: "ClearMemoryConfirm"},
        3: {Name: "All", ToPage: "ClearAllConfirm"},
    },

    ClearSetupConfirm: {
        Confirm: {Confirm: "Clear Setup?"},
        Yes: {Action: "ClearSetup"}
    },

    ClearMemoryConfirm: {
        Confirm: {Confirm: "Clear Memory?"},
        Yes: {Action: "ClearMemory"}
    },

    ClearAllConfirm: {
        Confirm: {Confirm: "Clear All?"},
        Yes: {Action: "ClearAll"}
    }
}

export const menuManager = new MenuManager;