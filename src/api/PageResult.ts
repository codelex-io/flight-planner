export interface PageResult<T> {
  page: number;
  totalItems: number;
  items: Array<T>;
}
