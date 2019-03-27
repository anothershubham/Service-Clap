import { ODetailModule } from './o-detail.module';

describe('ODetailModule', () => {
  let oDetailModule: ODetailModule;

  beforeEach(() => {
    oDetailModule = new ODetailModule();
  });

  it('should create an instance', () => {
    expect(oDetailModule).toBeTruthy();
  });
});
