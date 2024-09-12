import { OrderStatus } from "@/types";

type TOrderStatusStrings = keyof typeof OrderStatus;

type TOrderStatusTranslation = Record<TOrderStatusStrings, string>;

export const translateOrderStatus = (
    status: (typeof OrderStatus)[keyof typeof OrderStatus],
) => {
    const statusValue = Object.entries(OrderStatus).find(
        ([, value]) => value === status,
    )![0] as TOrderStatusStrings;

    const translation: TOrderStatusTranslation = {
        Archived: "В архиве",
        Created: "Создан",
        DeliveredToThePoint: "Дотсавлен в пункт выдачи",
        Paid: "Оплачен",
        Received: "Получен",
        Refund: "К возврату",
        Transport: "В доставке",
    };

    return translation[statusValue];
};
