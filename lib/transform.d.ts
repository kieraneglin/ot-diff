export declare class Transform {
    action: string;
    start?: number;
    remove?: number;
    payload?: string;
    raw?: object;
    nextTransform?: Transform;
    static toInt(transformObj: object): Transform;
}
