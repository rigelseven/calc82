import { statusBar } from "./interface/statusbar.js";

class SettingsManager {
    constructor(settings) {
        this.settings = settings;
        this.updateDisplayStatus();
    }

    setSetting(setting, value) {
        this.settings[setting] = value;
        localStorage.setItem(
            "settings",
            JSON.stringify(this.settings)
        );
        if (setting == "displayMode") this.updateDisplayStatus();
    }

    getSetting(setting) {
        return this.settings[setting];
    }

    clearSettings() {
        this.settings = defaultSettings;
        localStorage.setItem(
            "settings",
            JSON.stringify(this.settings)
        );
        console.log("Settings cleared!"); // do not remove
        this.updateDisplayStatus();
    }

    updateDisplayStatus() {
        statusBar.toggle('fix', this.settings.displayMode[0] == "fix");
        statusBar.toggle('sci', this.settings.displayMode[0] == "sci");
    }
}

const defaultSettings = {
    fractionMode: "fraction",
    displayMode: ["norm", 1],
    ioMode: "math",
    decimalPoint: "dot"
}

let savedSettings = null;
try {
    savedSettings = JSON.parse(localStorage.getItem("settings"));
} catch {;};

let settings = {};
for (const i of Object.keys(defaultSettings)) {
    if (savedSettings && savedSettings[i]) {
        settings[i] = savedSettings[i];
    } else {
        settings[i] = defaultSettings[i];
    }
}

export const settingsManager = new SettingsManager(settings);
