class SettingsManager {
    constructor(settings) {
        this.settings = settings;
        console.log(this.settings);
    }

    setSetting(setting, value) {
        this.settings[setting] = value;
        localStorage.setItem(
            "settings",
            JSON.stringify(this.settings)
        );
    }

    getSetting(setting) {
        return this.settings[setting];
    }
}

const defaultSettings = {
    fractionMode: "mixed",
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