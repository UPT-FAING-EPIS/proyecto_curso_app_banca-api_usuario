export interface IRepository<T> {
  getById(id: number): Promise<T | null>
  getAll(): Promise<T[]>
  create(entity: T): Promise<T>
  update(id: number, entity: T): Promise<T | null>
}
