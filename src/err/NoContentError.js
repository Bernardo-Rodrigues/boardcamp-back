export default class NoContent extends Error {
    constructor(message) {
        super();
        this.status = 204;
    }
}