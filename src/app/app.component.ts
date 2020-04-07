import {Component} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly ROOT_URL = 'https://app-be-sk.herokuapp.com';
  posts: any;
  onPost: boolean;
  progress: { loaded: number, total: number };
  obj: any;

  constructor(private http: HttpClient) {
    this.onPost = false;
    this.progress = {loaded: 0, total: 0};
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

  callApi(postId: number) {
    // const url = this.ROOT_URL + '/get/' + postId.toString();
    const url = this.ROOT_URL + '/b';
    const request = new HttpRequest('GET', url, {reportProgress: true});
    this.http.request(request).subscribe(event => {
      // console.log('Event type: ', event.type);
      if (event.type === HttpEventType.DownloadProgress) {
        // console.log('Loaded: ', event.loaded, ' Total: ', event.total);
        this.progress.loaded = Number(((event.loaded / event.total) * 100).toFixed(2));
        this.progress.total = 100;
      }
    }, error => {
      console.log('Error: ', error);
    });
  }
}
