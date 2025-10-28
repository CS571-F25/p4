import providers from '@/data/providers.json';
import subscriptionData from '@/data/subscriptionData.json';

function randomEl(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const dataTypes = {
    date: { default: () => new Date().toISOString() },
    number: { default: (limit?: number) => Math.floor(Math.random() * (limit || 1000)) },
    string: { default: () => Math.random().toString(36).substring(2, 15) },
    boolean: { default: () => Math.random() < 0.5 },
    color: {
        default: () => {
            const min = 180;
            const max = 255;
            const colorFactor = 50;

            const randomValue = () => Math.floor(Math.random() * (max - min) + min);

            let r, g, b;

            do {
                r = randomValue();
                g = randomValue();
                b = randomValue();
            } while (Math.abs(r - g) < colorFactor && Math.abs(r - b) < colorFactor && Math.abs(g - b) < colorFactor);

            return `rgb(${r}, ${g}, ${b})`;
        },
    },
    userId: { default: () => Math.floor(Math.random() * 90000000 + 10000000).toString() },
    username: { default: () => randomEl(subscriptionData.usernames).toLowerCase() },
    displayName: {
        default: () => randomEl(subscriptionData.usernames),
    },
};

// generate a single random data value for a certain service and format
export function generateData(service: keyof typeof providers, format: keyof typeof dataTypes): any {
    if (!format?.toString()?.includes('|') && !dataTypes[format]) return format;
    if (format.toString().includes('|')) return randomEl(format.split('|'));

    const generator = dataTypes[format];
    if (service in generator && generator[service as keyof typeof generator]) {
        return (generator[service as keyof typeof generator] as Function)();
    }
    return generator.default();
}

// take a formatter and generate data for all of the non-overridden fields
export function generateWithFormat(service: keyof typeof providers, formatter: any): any {
    if (!formatter) return null;

    const data: any = {};
    for (const key in formatter) {
        const field = formatter[key];
        if (field.format === undefined) {
            data[key] = generateWithFormat(service, field);
            continue;
        }
        const format = typeof field.format === 'string' ? field.format.split('-')[0] : field.format;
        data[key] = generateData(service, format as keyof typeof dataTypes);
    }
    return data;
}
