export function resolveNested(path: string, obj: any = self, separator='.') {
    const properties = Array.isArray(path) ? path : path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
}