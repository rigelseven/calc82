class HistoryManager {
    constructor(history) {
        this.history = history ? history : [];
        this.historyPosition = 0;
    }

    pushHistory(expression, fractionResult, decimalResult) {
        this.historyPosition = this.history.length;
        this.history.push({expression: [...expression], fractionResult, decimalResult});
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