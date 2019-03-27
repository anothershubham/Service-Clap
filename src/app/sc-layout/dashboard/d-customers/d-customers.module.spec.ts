import { DCustomersModule } from './d-customers.module';

describe('DCustomersModule', () => {
  let dCustomersModule: DCustomersModule;

  beforeEach(() => {
    dCustomersModule = new DCustomersModule();
  });

  it('should create an instance', () => {
    expect(dCustomersModule).toBeTruthy();
  });
});
