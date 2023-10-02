import { Injectable } from "@angular/core";
import { Post } from "../model/post.model";
import {
  HttpClientModule,
  HttpParams,
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ApiService, ConfigService, UserService } from "src/app/service";
import { HeaderComponent } from "src/app/header/header.component";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  postUrl = "http://localhost:8080/api/posts";
  userUrl = "http://localhost:8080/api/users";
  reportUrl = "http://localhost:8080/api/reports";

  user = this.userService.getMyInfo();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.postUrl + "/all");
  }

  add(newPost) {
    newPost.userUsername = this.userName();
    return this.http.post(this.postUrl + "/create", JSON.stringify(newPost), {
      headers: this.headers,
      responseType: "text",
    });
  }

  delete(postId: number): Observable<number> {
    console.log(this.postUrl + "/?id=" + postId);
    return this.http.delete<number>(this.postUrl + "/?id=" + postId);
  }

  edit(post) {
    return this.http
      .put(this.postUrl + "/edit", JSON.stringify(post), {
        headers: this.headers,
        responseType: "text",
      })
      .pipe(
        map(() => {
          console.log("Edit success");
          this.router
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => {
              this.router.navigate([""]);
            });
        })
      );
  }

  report(reportType, postId) {
    return this.http
      .post(this.reportUrl + `/${postId}/post`, JSON.stringify(reportType), {
        headers: this.headers,
        responseType: "text",
      })
    
  }

  userName() {
    const user = this.userService.currentUser;
    return user.username;
  }

  getPostsForUser(): Observable<any[]> {
    return this.http.get<any[]>(this.postUrl + "/postsForUser");
  }

  getPostsFromUserGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.postUrl + "/postsFromUserGroups");
  }

  likePost(postId): Observable<any>{
    return this.http.post<any>(this.postUrl + `/${postId}/like`, postId);
  }

  dislikePost(postId): Observable<any>{
    return this.http.post<any>(this.postUrl + `/${postId}/dislike`, postId);
  }

  hearthPost(postId): Observable<any>{
    return this.http.post<any>(this.postUrl + `/${postId}/hearth`, postId);
  }

  deleteReaction(postId): Observable<any>{
    return this.http.delete<any>(this.postUrl + `/${postId}/deleteReaction`, postId);
  }

  getPostReaction(postId): Observable<any[]> {
    return this.http.get<any[]>(this.postUrl + `/${postId}/reactions`)
  }

  getNewestPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.postUrl + `/newest`)
  }

  getOldestPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.postUrl + `/oldest`)
  }

  isGroupPost(postId): boolean {
    let itIs;
    this.http.get<boolean>(this.postUrl + `/${postId}/isGroupPost`).subscribe((result) => {
      itIs = result
    })
    return itIs;
  }

  getGroupByPostId(postId) {
    return this.http.get<any>(this.postUrl + `/${postId}/getGroup`)
  }

  getPost(postId: number) {
    return this.http.get<any>(this.postUrl + `/${postId}`)
  }

}
