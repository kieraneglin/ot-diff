import { Transform } from './transform';
export declare class Cursor {
    private selection;
    preserve(element: HTMLInputElement): void;
    restore(transform: Transform): void;
    private insert(transform);
    private delete(transform);
    private replace(transform);
    private noop(transform);
}
