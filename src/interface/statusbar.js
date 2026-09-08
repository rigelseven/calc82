class StatusBar {
    constructor() {
    }

    toggle(indicator, onoff) {
        document.querySelector(`#${indicator}-indicator`).classList.toggle("status-visible", onoff);
    }
}

export const statusBar = new StatusBar;