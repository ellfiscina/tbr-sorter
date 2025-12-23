export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Book {
    id: string;
    title: string;
    author: string;
    order: number;
    isbn?: string;
    cover?: string;
}

export interface UserId {
    id: string;
}
