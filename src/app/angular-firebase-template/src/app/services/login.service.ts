import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signOut, user, User, UserCredential } from '@angular/fire/auth';
import { DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  auth: Auth = inject(Auth);
  router: Router = inject(Router);

  // observable that is updated when the auth state changes
  user$ = user(this.auth);
  currentUser: User | null = this.auth.currentUser;
  userSubscription: Subscription;
  
  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
        this.currentUser = aUser;
    });
  }

  // Login Friendly Chat.
  async login(email:string ,password: string) : Promise<void | UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password).then((result) => {
      this.currentUser = result.user;
      this.router.navigate(['/'])
      return result;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  // Logout of Friendly Chat.
  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/', 'login'])
      console.log('signed out');
    }).catch((error) => {
        console.log('sign out error: ' + error);
    })
  }
}
