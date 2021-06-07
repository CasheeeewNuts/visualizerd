type Platforms<T extends NodeJS.Platform> = readonly Extract<NodeJS.Platform, T>[]
type SupportingPlatforms = Platforms<'linux'>


export class Platform {
    // static fields
    public static readonly supporting: SupportingPlatforms = ['linux']


    // instance field
    public readonly platform: NodeJS.Platform;


    constructor(platform: NodeJS.Platform) {
        this.platform = platform
    }


    public isSupported(): boolean {
        return Platform.supporting.includes(this.platform as any)
    }
}