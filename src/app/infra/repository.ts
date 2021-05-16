interface Repository<T> {
    connect(): Promise<this>
    store(result: T): Promise<boolean>
    close(): Promise<void>
}

export {Repository}