import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../app/services/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [UserService]
})
export class HomeComponent implements OnDestroy {

  private _email: string = "";
  private _password: string = "";
  private _newUserEmail: string = "";
  private _newUserPassword: string = "";
  private _newUsername: string = "";
  private _loginSubscription: Subscription | undefined;
  private _registrationSubscription: Subscription | undefined;

  public loginSuccessful: boolean = true;
  public isNewUser: boolean = false;
  public registrationSuccessful: boolean = false;
  public headerText: string = 'Login';

  public get email() {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get password() {
    return this._password;
  }

  public set password(value: string) {
    this._password = value;
  }

  public get newUserEmail() {
    return this._newUserEmail;
  }

  public set newUserEmail(value: string) {
    this._newUserEmail = value;
  }
  public get newUserPassword() {
    return this._newUserPassword;
  }

  public set newUserPassword(value: string) {
    this._newUserPassword = value;
  }
  public get newUsername() {
    return this._newUsername;
  }

  public set newUsername(value: string) {
    this._newUsername = value;
  }

  constructor(private userService: UserService, private router: Router) {

    this.login = this.login.bind(this);
    this.showRegistrationPage = this.showRegistrationPage.bind(this);
  }

  ngOnDestroy() {
    this._loginSubscription?.unsubscribe();
    this._registrationSubscription?.unsubscribe();
  }

  /**
   * When the user clicks on the Login button, a call is made to the 
   * backend to login the user. If login is successful, we set the bearer token in the 
   * local storage. TODO: Remove bearer token from localStorage on log out.
   * If login is not successful, an error is shown.
   */
  public async login(): Promise<void> {
    const loginResponse = await this.userService.login(this.email, this.password);

    this._loginSubscription = loginResponse.subscribe(response => {
      const bearerToken = response.data.token;
      localStorage.setItem('bearerToken', bearerToken);
      this.loginSuccessful = true;
      this.router.navigate(["/timeline"])
    }, error => {
      this.loginSuccessful = false;
    });

  }

  /**
   * When the user clicks on the Register button, a call is made to the 
   * backend to register the user. If registration is not successful, 
   * an error is shown.
   */
  public async register(): Promise<void> {
    const registrationResponse = await this.userService.login(this.email, this.password);

    this._registrationSubscription = registrationResponse.subscribe(response => {
      const bearerToken = response.data.token;
      localStorage.setItem('bearerToken', bearerToken);
      this.registrationSuccessful = true;
      this.router.navigate(["/timeline"])
    }, error => {
      this.registrationSuccessful = false;
    });

  }

  /**
   * New user flag is set to true and hence, registration page is 
   * shown. 
   */
  public showRegistrationPage() {
    this.isNewUser = true;
    this.headerText = 'Register';
  }
}
