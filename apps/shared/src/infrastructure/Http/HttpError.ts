export class HttpError extends Error
{
    public readonly status: number;
    public readonly data: any;

    constructor(status: number, message: string, data?: any) {
        super(message);
        this.status = status;
        this.data = data;
    }
}
