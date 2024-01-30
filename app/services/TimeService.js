class TimeService {
    constructor() {
        this.start = null;
        return this
    }

    startTimer = () => {
        this.start = new Date();
    }

    getTimePassed = () => {
        const now = new Date();
        return now - this.start;
    }

    stopTimer = () => this.start = null;

 }

 module.exports = TimeService;