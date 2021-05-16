type Platforms<T extends NodeJS.Platform> = readonly Extract<NodeJS.Platform, T>[]
type SupportingPlatforms = Platforms<'linux' | 'darwin'>

const PLAT_FORM: NodeJS.Platform = process.platform
const SUPPORTING_PLAT_FORM: SupportingPlatforms = ['linux', 'darwin'] as const

function isSupported(platform: any): platform is SupportingPlatforms {
    return SUPPORTING_PLAT_FORM.includes(platform)
}

export {PLAT_FORM, SUPPORTING_PLAT_FORM, isSupported}