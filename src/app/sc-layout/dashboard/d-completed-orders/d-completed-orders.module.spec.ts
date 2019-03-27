import { DCompletedOrdersModule } from './d-completed-orders.module';

describe('DCompletedOrdersModule', () => {
  let dCompletedOrdersModule: DCompletedOrdersModule;

  beforeEach(() => {
    dCompletedOrdersModule = new DCompletedOrdersModule();
  });

  it('should create an instance', () => {
    expect(dCompletedOrdersModule).toBeTruthy();
  });
});
