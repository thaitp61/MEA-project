export interface IPagingDto {
    page: number;
    pageSize: number;
    orderBy: string[];
    filters: string[];
}

export interface ResponseList<T> {
    count: number;
    data: T[];
    totalPage: number;
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum FilterComparator {
    EQUAL = '=',
    NOT_EQUAL = '!=',
    LESS_THAN = '<',
    LESS_THAN_OR_EQUAL = '<=',
    GREATER_THAN = '>',
    GREATER_THAN_OR_EQUAL = '>=',
    IN = 'IN',
    NOT_IN = 'NOT IN',
    LIKE = 'LIKE',
}