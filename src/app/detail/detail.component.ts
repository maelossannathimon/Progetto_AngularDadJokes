import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JokeService } from '../services/joke.service';
import { Joke } from '../modules/Joke';

@Component({
  standalone: true,
  selector: 'app-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './detail.component.html'
})
export class DetailComponent {
  joke: Joke | null = null;
  updatedText: string = '';

  constructor(private jokeService: JokeService, private router: Router) {
    this.jokeService.currentJoke$.subscribe(joke => {
      this.joke = joke;
      if (joke) {
        this.updatedText = joke.joke;
      }
    });
  }

  updateJoke(): void {
    if (this.joke) {
      const updatedJoke: Joke = { ...this.joke, joke: this.updatedText };
      this.jokeService.updateJoke(updatedJoke);
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
