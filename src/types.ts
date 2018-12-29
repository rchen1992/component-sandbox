export interface IChangeHandlerWithData<T> {
    (e: React.ChangeEvent, data: T): void;
}
