import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Post } from '../../app/interfaces/post';
import { UserService } from '../../app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'post',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatFormFieldModule, FormsModule, MatListModule, MatInputModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  providers: [UserService]
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() postData: Post | undefined;
  public userName: string = "";
  public avatarURL: string = "";
  private subscription: Subscription | undefined;

  constructor(private userService: UserService) {
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async ngOnInit() {
    if (this.postData !== undefined) {
      const userID = this.postData.user_id;
      const userNameResponse = await this.userService.getUserName(userID);

      this.subscription = userNameResponse.subscribe((response) => {
        const data = response.data;
        this.userName = data.name;
        this.avatarURL = data.avatar_url;
      });
    }
  }
}
