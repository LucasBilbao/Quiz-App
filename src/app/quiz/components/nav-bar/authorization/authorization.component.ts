import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/quiz/services/user/user.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  username: string = '';

  isSignedIn: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isSignedIn = this.userService.isSignedIn;

    if (this.isSignedIn)
      this.userService.fetchUserByID().then((user) => {
        this.username = user.userCredentials.username;
      });
  }

  logOut(): void {
    this.userService.onLogOut();
  }
}
