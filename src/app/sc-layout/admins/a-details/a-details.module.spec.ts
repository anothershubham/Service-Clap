import { ADetailsModule } from './a-details.module';

describe('ADetailsModule', () => {
  let aDetailsModule: ADetailsModule;

  beforeEach(() => {
    aDetailsModule = new ADetailsModule();
  });

  it('should create an instance', () => {
    expect(aDetailsModule).toBeTruthy();
  });
});
