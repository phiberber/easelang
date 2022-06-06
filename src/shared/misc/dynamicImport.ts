export const isBrowser = typeof window !== 'undefined'

export function serverImport(module) {
    if(!isBrowser) return require(module)
    else return {}
}

export function clientImport(module) {
    if(isBrowser) return require(module)
    else return {}
}