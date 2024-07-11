export class ApiError extends Error {
    protected errorCode: number;
    protected meta: object;
    protected status: string = 'error';

    constructor(message: string, errorCode: number, meta: object = null) {
        super();

        this.message = message || 'Something went wrong. Please try again.';
        this.errorCode = errorCode;
        this.meta = meta;
        this.name = this.constructor.name;
    }

    public getCode(): number {
        return this.errorCode;
    }

    public getMeta(): object {
        return this.meta;
    }

    public getName(): string {
        return this.name;
    }

    public getStatus(): string {
        return this.status;
    }
}
