import { IAdvertisment, IOrder } from "@/types";

const endpoint = "http://localhost:3000";

type TFetchMethods = "GET" | "POST" | "PUT";

class DBService {
    async fetch<T>(
        url: string,
        method: TFetchMethods = "GET",
        options: Omit<RequestInit, "method"> = {},
    ) {
        try {
            const request = await fetch(endpoint + url, {
                ...options,
                headers: {
                    "Content-Type": "application/json;cahrset=utf-8",
                    ...options?.headers,
                },
                method,
            });

            if (request.ok) {
                const data = (await request.json()) as T;
                return { success: true, data };
            } else {
                return { success: false };
            }
        } catch (_) {
            return { success: false };
        }
    }

    async getAdvertisements() {
        return await this.fetch<IAdvertisment[]>("/advertisements");
    }

    async getOrders() {
        return await this.fetch<IOrder[]>("/orders");
    }

    async postAdertisement(advertisementData: string) {
        return await this.fetch("/advertisements", "POST", {
            body: advertisementData,
        });
    }

    async updateAdertisement(
        advertisementId: string,
        advertisementData: string,
    ) {
        return await this.fetch(`/advertisements/${advertisementId}`, "PUT", {
            body: advertisementData,
        });
    }

    async updateOrder(orderId: string, orderData: string) {
        return await this.fetch(`/orders/${orderId}`, "PUT", {
            body: orderData,
        });
    }
}

export const service = new DBService();
