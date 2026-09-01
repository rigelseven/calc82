import { statusBar } from "./statusbar.js";

class HistoryManager {
    constructor(history) {
        this.history = history ? history : [];
        this.historyPosition = 0;
        this.maxHistory = 100;  // TODO make it user configurable?
    }

    pushHistory(expression, fractionResult, decimalResult, specialResult) {
        this.historyPosition = this.history.length;
        this.history.push({expression: [...expression], fractionResult, decimalResult, specialResult});

        if (this.history.length > this.maxHistory) {
            this.history.splice(0, this.history.length - this.maxHistory);
        }

        this.historyPosition = this.history.length - 1;
        this.checkHistoryArrows()
    }

    getHistory() {
        return this.history[this.historyPosition];
    }

    oldestHistory() {
        this.historyPosition = 0;
        this.checkHistoryArrows()
        return this.history[this.historyPosition];
    }

    latestHistory() {
        this.historyPosition = this.history.length - 1;
        this.checkHistoryArrows()
        return this.history[this.historyPosition];
    }

    getHistory() {
        return this.history[this.historyPosition];
    }

    prevHistory() {
        this.historyPosition = Math.max(0, this.historyPosition - 1);
        this.checkHistoryArrows()
        return this.getHistory();
    }

    nextHistory() {
        this.historyPosition = Math.min(
            this.history.length - 1,
            this.historyPosition + 1
        );
        this.checkHistoryArrows()
        return this.getHistory();
    }

    clearHistory() {
        this.historyPosition = 0;
        this.history = [];
        this.checkHistoryArrows();
    }

    checkHistoryArrows() {
        if (this.historyPosition == 0 || this.history.length == 0) statusBar.toggle('up', false);
        else statusBar.toggle('up', true);
        if (this.historyPosition === this.history.length - 1 || this.history.length == 0) statusBar.toggle('down', false);
        else statusBar.toggle('down', true);
    }
}

export const historyManager = new HistoryManager;