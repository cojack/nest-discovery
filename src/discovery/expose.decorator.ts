import { DISCOVERY_EXPOSE, DISCOVERY_EXPOSE_OPTIONS } from './discovery.constants';
import { AdapterOptions } from './discovery-adapter.interface';

export function Expose<T>(options: AdapterOptions<T>): ClassDecorator {
    return function (target) {
        const name = typeof options === 'string' ? options : target.name;
        Reflect.defineMetadata(DISCOVERY_EXPOSE, name, target);
        if (options) {
            Reflect.defineMetadata(DISCOVERY_EXPOSE_OPTIONS, options, target);
        }
    }
}
