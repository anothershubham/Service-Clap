import { DataCentreModule } from './data-centre.module';

describe('DataCentreModule', () => {
  let dataCentreModule: DataCentreModule;

  beforeEach(() => {
    dataCentreModule = new DataCentreModule();
  });

  it('should create an instance', () => {
    expect(dataCentreModule).toBeTruthy();
  });
});
