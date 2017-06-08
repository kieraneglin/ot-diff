import { Transform } from './transform';
export declare class Buffer {
    queue: Transform[];
    push(transform: Transform): Transform[];
    merge(): void;
}
