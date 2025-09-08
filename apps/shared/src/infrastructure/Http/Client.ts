import {ClientInterface} from "./ClientInterface";
import {TBody, Response} from "./http";
import {HttpError} from "./HttpError";

export class Client implements ClientInterface
{
    post<Body extends TBody, R>(url: string, body?: Body, params?: Record<string, any>): Promise<Response<R>> {
        throw new Error("Method not implemented.");
    }

    async get<R>(url: string, params?: Record<string, any>): Promise<Response<R>> {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data: R = await response.json();
        if (!response.ok) {
            throw new HttpError(response.status, `HTTP error! status: ${response.status}`, data);
        }

        const headers: Record<string, string> = {};
        response.headers.forEach((value, key) => {
            headers[key] = value;
        });

        return {
            status: response.status,
            data,
            headers,
        }
    }

    private request<T>(method: string, url: string, body?: any, params?: Record<string, any>): Promise<Response<T>> {
        throw new Error("Method not implemented.");

    }
}
