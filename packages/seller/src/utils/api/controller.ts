import { IOrder, TPostAdvertisement } from "@/types";
import { service } from "./service";

class Controller {
    async getAdvertisements() {
        const response = await service.getAdvertisements();

        if (response.success == false)
            throw Error("не удалось получить объявления");

        return response;
    }

    async getOrders() {
        const response = await service.getOrders();

        if (response.success == false)
            throw Error("не удалось получить заказы");

        return response;
    }

    async postAdvertisement(advertisementData: TPostAdvertisement) {
        const requestString = JSON.stringify({
            ...advertisementData,
            createdAt: new Date().toISOString(),
            views: 0,
            likes: 0,
        });

        return service.postAdertisement(requestString);
    }

    async updateAdvertisement(
        id: string,
        advertisementData: TPostAdvertisement,
    ) {
        const requestString = JSON.stringify(advertisementData);

        return service.updateAdertisement(id, requestString);
    }

    async closeOrder(orderData: Partial<IOrder> & Pick<IOrder, "id">) {
        const orderDataString = JSON.stringify({ ...orderData, status: 5 });

        return service.updateOrder(orderData.id, orderDataString);
    }
}

export const controller = new Controller();
