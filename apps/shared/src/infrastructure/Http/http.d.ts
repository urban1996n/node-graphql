export declare interface Response<T> {
    status: number;
    data: T;
    headers: Record<string, string>;
}

export declare interface Request {
    url: string;
    headers?: Record<string, string>;
}

export declare interface PostRequest<Body extends TBody> extends Request {
    body?: Body;
}

export declare interface GetRequest extends Request {
}

export declare type TBody = Record<string, any> | string | null;
