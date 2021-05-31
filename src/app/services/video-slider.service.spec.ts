import { TestBed } from '@angular/core/testing';

import { VideoSliderService } from './video-slider.service';

describe('VideoSliderService', () => {
  let service: VideoSliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoSliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
