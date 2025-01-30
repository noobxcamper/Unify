enum OrderStatus {
    "OPEN" = 0,
    "COMPLETED" = 1,
    "IN PROGRESS" = 2,
    "CLOSED" = 3,
    "UNKNOWN" = 4
}

const getOrderStatusText = (status: number) => {
    return OrderStatus[status];
};

export {
    getOrderStatusText
}