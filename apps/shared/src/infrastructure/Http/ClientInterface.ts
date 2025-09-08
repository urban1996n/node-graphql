import {TBody, Response} from "./http";

export interface ClientInterface
{
    get<R>(url: string, params?: Record<string, any>): Promise<Response<R>>;

    post<Body extends TBody, R>(url: string, body?: Body, params?: Record<string, any>): Promise<Response<R>>;
}
