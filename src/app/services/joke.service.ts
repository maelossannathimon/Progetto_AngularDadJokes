import { Joke } from './../modules/Joke';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JokeService {
  private apiUrl = 'https://icanhazdadjoke.com/';
  private currentJokeSubject = new BehaviorSubject<Joke | null>(null);
  currentJoke$ = this.currentJokeSubject.asObservable();
  private jokesHistory: Joke[] = [];

  constructor(private http: HttpClient) {}

  // GET a joke from the API
  getJoke(): Observable<Joke> {
    return this.http.get<Joke>(this.apiUrl, {
      headers: { Accept: 'application/json' }
    }).pipe(
      tap(joke => {
        this.addToHistory(joke);
        this.currentJokeSubject.next(joke);
      })
    );
  }

  // Simulate POST: create a new joke locally
  createJoke(newJoke: Partial<Joke>): void {
    const joke: Joke = {
      id: this.generateId(),
      joke: newJoke.joke || 'No joke provided'
    };
    this.addToHistory(joke);
    this.currentJokeSubject.next(joke);
  }

  // Simulate PUT: update a joke locally
  updateJoke(updatedJoke: Joke): void {
    const index = this.jokesHistory.findIndex(j => j.id === updatedJoke.id);
    if (index > -1) {
      this.jokesHistory[index] = updatedJoke;
    }
    this.currentJokeSubject.next(updatedJoke);
  }

  // Return all jokes saved in history
  getHistory(): Joke[] {
    return this.jokesHistory;
  }

  // Set a specific joke as the current joke
  setCurrentJoke(joke: Joke): void {
    this.currentJokeSubject.next(joke);
  }

  private addToHistory(joke: Joke): void {
    // Avoid duplicate entries
    const exists = this.jokesHistory.find(j => j.id === joke.id);
    if (!exists) {
      this.jokesHistory.push(joke);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
