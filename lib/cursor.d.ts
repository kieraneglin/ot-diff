import { Transform } from './interfaces/transform';
export declare class Cursor {
    private selection;
    preserve(element: HTMLInputElement): void;
    restore(transform: Transform): void;
    insert(transform: Transform): void;
}
