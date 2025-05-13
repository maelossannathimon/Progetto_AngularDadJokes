/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JokeService } from './joke.service';

describe('Service: Joke', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JokeService]
    });
  });

  it('should ...', inject([JokeService], (service: JokeService) => {
    expect(service).toBeTruthy();
  }));
});
