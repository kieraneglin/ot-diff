export interface TransformInterface {
    action: string;
    start?: number;
    remove?: number;
    payload?: string;
    raw?: object;
    nexTransform?: TransformInterface;
}
