export class NotSupportingOSError extends Error{
    constructor() {
        super()

        this.name = 'NotSupportingOSError'
        this.message = 'this device is not supporting OS'
    }
}