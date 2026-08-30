import { display } from "./display.js";

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

        // todo actually execute functions
        //Object.values(currentMenuItems)[item];
    }

    handleMenuAction(menuAction) {
        if (menuAction === "Exit") return this.leaveMenus();

        // Handle direct menu calls
        if (["Modes", "Setup"].includes(menuAction)) this.currentMenu = menuAction;

        // Handle number menu navigation
        if (menuAction) this.executeMenuItem(menuAction);

        this.displayMenu()
        return;
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
        3: {Name: "Deg"},
        4: {Name: "Rad"},
        5: {Name: "Gra"},
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