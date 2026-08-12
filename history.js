class HistoryManager {
    constructor(history) {
        this.history = history ? history : [];
        this.historyPosition = 0;
        this.maxHistory = 100;  // TODO make it user configurable?
    }

    pushHistory(expression, fractionResult, decimalResult) {
        this.historyPosition = this.history.length;
        this.history.push({expression: [...expression], fractionResult, decimalResult});

        if (this.history.length > this.maxHistory) {
            this.history.splice(0, this.history.length - this.maxHistory);
        }

        this.historyPosition = this.history.length - 1;
    }

    getHistory() {
        return this.history[this.historyPosition];
    }

    oldestHistory() {
        this.historyPosition = 0;
        return this.history[this.historyPosition];
    }

    latestHistory() {
        this.historyPosition = this.history.length - 1;
        return this.history[this.historyPosition];
    }

    getHistory() {
        return this.history[this.historyPosition];
    }

    prevHistory() {
        this.historyPosition = Math.max(0, this.historyPosition - 1);
        return this.getHistory();
    }

    nextHistory() {
        this.historyPosition = Math.min(
            this.history.length - 1,
            this.historyPosition + 1
        );
        return this.getHistory();
    }
}

export const historyManager = new HistoryManager;