export declare class Transform {
    action: string;
    start?: number | string;
    remove?: number | string;
    payload?: string;
    raw?: object;
    nexTransform?: Transform;
    toInt(): Transform;
}
