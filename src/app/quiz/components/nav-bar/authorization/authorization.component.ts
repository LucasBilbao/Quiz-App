import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/quiz/services/user/user.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  username: string = '';

  localIsSignedIn: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isSignedIn().subscribe((isSignedIn) => {
      this.localIsSignedIn = isSignedIn;

      if (isSignedIn)
        this.userService.fetchUserByID().then((user) => {
          this.username = user.credentials.username;
        });
    });
  }

  onLogOut(): void {
    this.userService.logOut();
  }
}
