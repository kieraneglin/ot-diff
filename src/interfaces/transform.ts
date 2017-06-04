export interface TransformInterface {
  action: string,
  start?: number | string,
  remove?: number | string,
  payload?: string,
  raw?: object,
  nexTransform?: TransformInterface
}
