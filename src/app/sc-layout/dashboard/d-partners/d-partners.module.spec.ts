import { DPartnersModule } from './d-partners.module';

describe('DPartnersModule', () => {
  let dPartnersModule: DPartnersModule;

  beforeEach(() => {
    dPartnersModule = new DPartnersModule();
  });

  it('should create an instance', () => {
    expect(dPartnersModule).toBeTruthy();
  });
});
