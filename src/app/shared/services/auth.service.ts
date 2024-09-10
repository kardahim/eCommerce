import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly LOGGED_IN_USER_KEY = 'loggedInUser';

  private isLoggedSubject = new Subject<boolean>();
  public isLoggedStatus$ = this.isLoggedSubject.asObservable();

  constructor() {
    this.isLoggedSubject.next(this.isLoggedIn());
  }

  // Base64 isnt safe. This is a simple mockup
  private encodePassword(password: string): string {
    return btoa(password);
  }

  register(user: IUser): boolean {
    let users: IUser[] = JSON.parse(
      localStorage.getItem(this.USERS_KEY) || '[]'
    );

    if (!this.verifyUser(user)) {
      console.error('User already exists');
      return false;
    }

    // Encode the user's password before saving
    user.password = this.encodePassword(user.password);
    user.repeatPassword = this.encodePassword(user.repeatPassword!);

    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

  verifyUser(user: IUser): boolean {
    let users: IUser[] = JSON.parse(
      localStorage.getItem(this.USERS_KEY) || '[]'
    );

    const existingUser = users.find((u) => u.email === user.email);
    return !existingUser;
  }

  login(email: string, password: string): boolean {
    const users: IUser[] = JSON.parse(
      localStorage.getItem(this.USERS_KEY) || '[]'
    );

    // Encode the input password to match the stored encoded password
    const encodedPassword = this.encodePassword(password);

    const user = users.find(
      (u) => u.email === email && u.password === encodedPassword
    );
    if (user) {
      localStorage.setItem(this.LOGGED_IN_USER_KEY, JSON.stringify(user));
      this.isLoggedSubject.next(true);
      return true;
    }

    console.error('Invalid credentials');
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.LOGGED_IN_USER_KEY);
    this.isLoggedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.LOGGED_IN_USER_KEY);
  }

  getLoggedInUser(): IUser | null {
    const user = localStorage.getItem(this.LOGGED_IN_USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
