import { Joke } from './../modules/Joke';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JokeService } from '../services/joke.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  currentJoke: Joke | null = null;
  history: Joke[] = [];
  newJokeText: string = '';

  constructor(private jokeService: JokeService, private router: Router) {}

  ngOnInit(): void {
    this.jokeService.currentJoke$.subscribe(joke => {
      this.currentJoke = joke;
      this.history = this.jokeService.getHistory();
    });
  }

  loadJoke(): void {
    this.jokeService.getJoke().subscribe();
  }

  viewDetail(joke: Joke): void {
    this.jokeService.setCurrentJoke(joke);
    this.router.navigate(['/detail']);
  }

  addNewJoke(): void {
    if (this.newJokeText.trim()) {
      this.jokeService.createJoke({ joke: this.newJokeText });
      this.newJokeText = '';
    }
  }
}
