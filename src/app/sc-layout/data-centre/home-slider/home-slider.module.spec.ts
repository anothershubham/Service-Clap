import { HomeSliderModule } from './home-slider.module';

describe('HomeSliderModule', () => {
  let homeSliderModule: HomeSliderModule;

  beforeEach(() => {
    homeSliderModule = new HomeSliderModule();
  });

  it('should create an instance', () => {
    expect(homeSliderModule).toBeTruthy();
  });
});
