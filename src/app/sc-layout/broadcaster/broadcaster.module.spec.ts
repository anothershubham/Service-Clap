import { BroadcasterModule } from './broadcaster.module';

describe('BroadcasterModule', () => {
  let broadcasterModule: BroadcasterModule;

  beforeEach(() => {
    broadcasterModule = new BroadcasterModule();
  });

  it('should create an instance', () => {
    expect(broadcasterModule).toBeTruthy();
  });
});
