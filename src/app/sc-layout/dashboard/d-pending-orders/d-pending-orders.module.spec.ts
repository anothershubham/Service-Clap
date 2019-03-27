import { DPendingOrdersModule } from './d-pending-orders.module';

describe('DPendingOrdersModule', () => {
  let dPendingOrdersModule: DPendingOrdersModule;

  beforeEach(() => {
    dPendingOrdersModule = new DPendingOrdersModule();
  });

  it('should create an instance', () => {
    expect(dPendingOrdersModule).toBeTruthy();
  });
});
