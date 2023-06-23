export class UIDError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UID no válido.";
    }
}