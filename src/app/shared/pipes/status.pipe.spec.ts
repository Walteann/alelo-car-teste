import { StatusPipe } from './status.pipe';

describe('StatusPipe', () => {

  const pipe = new StatusPipe();

  it('Should pipe transform with TRUE and return Active', () => {
    expect(pipe.transform(true)).toEqual('Active');
  });

  it('Should pipe transform with FALSE and return Inactive', () => {
    expect(pipe.transform(false)).toEqual('Inactive');
  });

});
