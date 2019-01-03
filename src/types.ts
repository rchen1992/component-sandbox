export interface IChangeHandlerWithData<T> {
    (e: React.ChangeEvent, data: T): void;
}

export interface IClickHandlerWithData<T> {
    (e: React.MouseEvent, data: T): void;
}

export interface IFocusHandlerWithData<T> {
    (e: React.FocusEvent, data: T): void;
}
