import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly LOGGED_IN_USER_KEY = 'loggedInUser';

  constructor() {}

  register(user: IUser): boolean {
    let users: IUser[] = JSON.parse(
      localStorage.getItem(this.USERS_KEY) || '[]'
    );

    if (!this.verifyUser(user)) {
      console.error('User already exists');
      return false;
    }

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

    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem(this.LOGGED_IN_USER_KEY, JSON.stringify(user));
      return true;
    }

    console.error('Invalid credentials');
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.LOGGED_IN_USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.LOGGED_IN_USER_KEY);
  }

  getLoggedInUser(): IUser | null {
    const user = localStorage.getItem(this.LOGGED_IN_USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
