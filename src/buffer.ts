import { Transform } from './transform';

export class Buffer {
  public queue: Transform[] = []

  public push(transform: Transform): Transform[]  {
    this.queue.push(transform);

    return this.queue;
  }

  public merge(): void {
    let previousTransform: Transform;

    for(let transform of this.queue.reverse()) {
      if(previousTransform) {
        transform.nextTransform = previousTransform;
        this.queue = [transform];
      }
      previousTransform = transform;
    }
  }
}
