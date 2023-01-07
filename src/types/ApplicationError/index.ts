import { HTTPStatuses } from "types/HttpStatuses";

class ApplicationError extends Error {
    public status: number = HTTPStatuses.INTERNAL;

    constructor(message: string, status = HTTPStatuses.INTERNAL) {
        super(message);
        this.status = status;
    }
}

export { ApplicationError };