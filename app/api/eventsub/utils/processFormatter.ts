export function processFormatter(formatter: any, event: any, service: string): any {
    if (typeof formatter !== 'object' || formatter === null) return formatter;
    if (Array.isArray(formatter)) return formatter.map((f) => processFormatter(f, event, service));

    // Handle array format with 'items'
    if (formatter.format === 'array' && service in formatter && formatter.items) {
        const path = formatter[service];
        let arr = Array.isArray(path) ? path.reduce((val, key) => (val ? val[key] : undefined), event) : undefined;
        if (!Array.isArray(arr)) return [];
        return arr.map((item) => processFormatter(formatter.items, item, service));
    }

    // If this node has a 'format' and a service path, extract the value
    if ('format' in formatter && service in formatter) {
        const path = formatter[service];
        if (Array.isArray(path)) {
            return path.reduce((val, key) => (val ? val[key] : undefined), event);
        }
        return undefined;
    }

    // Otherwise, recursively process children
    const result: any = {};
    for (const key in formatter) {
        result[key] = processFormatter(formatter[key], event, service);
    }
    return result;
}
