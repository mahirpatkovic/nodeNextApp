export interface OrderFilter {
    orderNumber?: string;
    customer?: string;
    minTotalAmount?: string;
    maxTotalAmount?: string;
    from?: string;
    to?: string;
    retrieveAll?: string;
    page?: string;
    pageSize?: string;
}
