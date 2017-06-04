export class Transform {
  public action: string
  public start?: number | string
  public remove?: number | string
  public payload?: string
  public raw?: object
  public nexTransform?: Transform

  public toInt(): Transform {
    let transform: Transform = new Transform();

    for(let attribute of ['start', 'remove']){
      if(this[attribute]) {
        transform[attribute] = Number(this[attribute]);
      }
    }

    return transform;
  }
}
