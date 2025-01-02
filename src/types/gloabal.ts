export type MenuItem = {
    title: string,
    icon?: string,
    data?: unknown,
    color?: string;
    action: (args: MenuItem) => void,
}

export enum SORT_ORDER {
    ASC = "asc",
    DESC = "desc",
}

export type TableOption = { name: string; action: (item: unknown) => void; icon?: string };



export enum FormItemType {
    TEXT = "TEXT",
    DATE = "DATE",
    DATE_RANGE = "DATE_RANGE",
    SELECT = "SELECT",
}