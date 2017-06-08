export class Transform {
  public action: string
  public start?: number
  public remove?: number
  public payload?: string
  public raw?: object
  public nextTransform?: Transform

  public static toInt(transformObj: object): Transform {
    let transform: Transform = new Transform();

    for(let attribute of ['start', 'remove']){
      if(transformObj[attribute]) {
        transform[attribute] = Number(transformObj[attribute]);
      }
    }

    return transform;
  }
}
