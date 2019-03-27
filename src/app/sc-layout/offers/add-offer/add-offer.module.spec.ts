import { AddOfferModule } from './add-offer.module';

describe('AddOfferModule', () => {
  let addOfferModule: AddOfferModule;

  beforeEach(() => {
    addOfferModule = new AddOfferModule();
  });

  it('should create an instance', () => {
    expect(addOfferModule).toBeTruthy();
  });
});
