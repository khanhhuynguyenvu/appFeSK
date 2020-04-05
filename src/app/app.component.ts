import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly ROOT_URL = 'https://app-be-sk.herokuapp.com';
  posts: any;
  onPost: boolean;
  obj: any;

  constructor(private http: HttpClient) {
    this.onPost = false;
  }

  title = 'appFeSK';

  getPost(postId: number) {
    this.posts = null;
    this.http.get(this.ROOT_URL + '/get/' + postId.toString(), {responseType: 'json'}).subscribe(data => {
      this.posts = data;
      console.log('Data: ', data);
    });
    this.onPost = true;
    // console.log('log:', this.posts);
  }
}
