import { TestBed } from '@angular/core/testing';

import { ApiGenshinStatsService } from './api-genshin-stats.service';

describe('ApiGenshinStatsService', () => {
  let service: ApiGenshinStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGenshinStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
