import { KitchenPipe } from './kitchen.pipe';

describe('KitchenPipe', () => {
  it('create an instance', () => {
    const pipe = new KitchenPipe();
    expect(pipe).toBeTruthy();
  });
});
