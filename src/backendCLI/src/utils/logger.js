class Logger {
    constructor(verbose = false) {
        this.verbose = verbose;
    }

    log(message) {
        console.log(message);
    }

    debug(message) {
        if (this.verbose) {
            console.log(`DEBUG: ${message}`);
        }
    }
}

module.exports = Logger;
