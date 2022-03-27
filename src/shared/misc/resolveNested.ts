export default function resolveNested(path: string | string[], obj: any = self, separator = '.'): any {
    const properties = Array.isArray(path) ? path : path.split(separator);
    return properties.reduce((prev: any, curr: any) => prev && prev[curr], obj)
}