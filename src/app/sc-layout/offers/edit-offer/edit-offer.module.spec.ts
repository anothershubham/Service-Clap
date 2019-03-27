import { EditOfferModule } from './edit-offer.module';

describe('EditOfferModule', () => {
  let editOfferModule: EditOfferModule;

  beforeEach(() => {
    editOfferModule = new EditOfferModule();
  });

  it('should create an instance', () => {
    expect(editOfferModule).toBeTruthy();
  });
});
