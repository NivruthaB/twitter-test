import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimelineService } from '../../app/services/timeline.service';
import { Post } from '../../app/interfaces/post';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import FuzzySearch from 'fuzzy-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PostComponent } from '../Post/post.component';
import { MatButtonModule } from '@angular/material/button';
import { ValidationHelper } from '../../app/common/ValidationHelper';
import POSTS_DATA from '../../assets/post-mock.json';
import { Subscription } from 'rxjs';

@Component({
  selector: 'timeline',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatFormFieldModule, FormsModule, MatListModule, MatInputModule, PostComponent, MatButtonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
  providers: [TimelineService]
})
export class TimelineComponent implements OnInit, OnDestroy {

  public posts: Post[] = [];
  public searchText: string = "";
  public newPostText: string = "";
  public filteredPosts: Post[] = [];
  public postType: string = 'text';
  private subscription: Subscription | undefined;

  constructor(private timeLineService: TimelineService) {

    this.createPost = this.createPost.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.onSearchText = this.onSearchText.bind(this);

  }

  ngOnInit(): void {
    this.fetchPosts();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  /**
  * This method is to call the back-end and fetch latest posts.
  * If there is no data, we set the default mock data. 
  * TODO: Investigate why data array is always empty.
  */
  public fetchPosts() {
    this.subscription = this.timeLineService.getPosts().subscribe({
      next: (response) => {
        const data = response.data;
        if (ValidationHelper.isNotUndefinedOrNull(data) && data.length > 1) {
          this.posts = data;
        } else if (data.length < 1) {
          this.posts = POSTS_DATA;
        }
      },
      error: () => {
        throw new Error('Something went wrong while fetching posts. Please try again!')
      }
    });
  }

  /**
   * This is called when user types in something in the search input. 
   * We make use fuzzy-search library to do the filtering. 
   * Filtering is now only based on post content text. 
   */
  public onSearchText() {
    if (ValidationHelper.isEmptyString(this.searchText)) {
      this.filteredPosts = [];
      return;
    }
    const searcher = new FuzzySearch(this.posts, ["content.text"], {
      caseSensitive: false
    });
    this.filteredPosts = searcher.search(this.searchText);
  }

  /**
   * This is called when the user creates a new post. Post type is by default set to 'text'.
   * Once a post is created, we fetch all posts again.
   * TODO: Changing type of posts has not been implemented yet.
   */
  public async createPost() {
    const createPostResponse = await this.timeLineService.createPost(this.postType, this.newPostText);
    createPostResponse.subscribe(response => {
      this.fetchPosts();
    });
  }

}
