export interface IAdvertisment {
    /* Уникальный идентификатор. */
    id: string;
    /* Название. */
    name: string;
    /* Описание. */
    description?: string;
    /* Цена. */
    price: number;
    /* Дата и время создания. */
    createdAt: string;
    /* Количество просмотров. */
    views: number;
    /* Количество лайков. */
    likes: number;
    /* Ссылка на изображение. */
    imageUrl?: string;
}

export type TPostAdvertisement = Pick<
    IAdvertisment,
    "name" | "description" | "imageUrl" | "price"
>;

export const OrderStatus = {
    Created: 0,
    Paid: 1,
    Transport: 2,
    DeliveredToThePoint: 3,
    Received: 4,
    Archived: 5,
    Refund: 6,
} as const;

interface IOrderItem extends IAdvertisment {
    count: number;
}

export interface IOrder {
    /* Уникальный идентификатор. */
    id: string;
    /* Статус. */
    status: (typeof OrderStatus)[keyof typeof OrderStatus];
    /* Дата и время создания. */
    createdAt: string;
    /* Дата и время завершения. */
    finishedAt?: string;
    /* Товары в заказе. */
    items: IOrderItem[];
    /* Способ доставки(Почта, СДЭК...) */
    deliveryWay: string;
    /* Сумма заказа */
    total: number;
}

export interface IImage {
    /* Уникальный идентификатор. */
    id: number;
    /* Ссылка. */
    url: string;
    /* Название. */
    name: string;
}

export type TFilterConfig = [string, (item: any) => boolean][];
