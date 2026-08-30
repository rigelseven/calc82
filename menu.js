import { display } from "./display.js";
import trigSolver from "./math/trigonometry.js";

class MenuManager {
    constructor() {
        this.currentMenu = null
    }

    displayMenu() {
        if (this.currentMenu === null) return;
        const currentMenuItems = MENUS[this.currentMenu];
        let showMenu = [];
        for (const item of Object.values(currentMenuItems)) if (item.Name) showMenu.push(item.Name);
        display.renderMenu(showMenu);
    }

    executeMenuItem(item) {
        if (this.currentMenu === null) return;
        const currentMenuItems = MENUS[this.currentMenu];
        const menuItem = currentMenuItems[item];
        if (!menuItem) return;
        console.log(menuItem);

        // Pagination
        if (menuItem.ToPage) {
            this.currentMenu = menuItem.ToPage;
            this.displayMenu();
        }
        else {
            if (menuItem.Action) {
                switch (menuItem.Action) {
                    case "SetRadians": trigSolver.setAngleMode("rad"); return this.leaveMenus();;
                    case "SetDegrees": trigSolver.setAngleMode("deg"); return this.leaveMenus();;
                    case "SetGradians": trigSolver.setAngleMode("gra"); return this.leaveMenus();;
                }
            }
        }
    }

    handleMenuAction(menuAction) {
        if (menuAction === "Exit") return this.leaveMenus();

        // Handle direct menu calls
        if (["Modes", "Setup"].includes(menuAction)) this.currentMenu = menuAction;

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
        4: {Name: "Disp"},
        5: {Name: "⏴CONT⏵"},
        Up: {ToPage: "Setup"}
    }
}

export const menuManager = new MenuManager;