export function Register(options = {}): ClassDecorator {
    return function (target) {
        const name = typeof options === 'string' ? options : target.name;
        Reflect.defineMetadata('discovery:register', name, target);
    }
}
