import { Injectable } from "@angular/core";
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
export class CommentService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  commentUrl = "http://localhost:8080/api/comments";
  postUrl = "http://localhost:8080/api/posts";
  reportUrl = "http://localhost:8080/api/reports";

  constructor(private http: HttpClient, private router: Router) {}

  create(newComment, postId) {
    return this.http.post(
      this.commentUrl + `/${postId}/create`,
      JSON.stringify(newComment),
      {
        headers: this.headers,
        responseType: "text",
      }
    );
  }

  report(reportType, commentId) {
    return this.http
      .post(this.reportUrl + `/${commentId}/comment`, JSON.stringify(reportType), {
        headers: this.headers,
        responseType: "text",
      })
  }

  edit(comment) {
    console.log("value",comment);
    return this.http
      .put(this.commentUrl + "/" + comment.id, JSON.stringify(comment), {
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

  delete(commentId: number): Observable<number> {
    return this.http.delete<number>(this.commentUrl + "/" + commentId);
  }

  reply(newComment, commentId) {
    return this.http.post(
      this.commentUrl + `/${commentId}/reply`,
      JSON.stringify(newComment),
      {
        headers: this.headers,
        responseType: "text",
      }
    );
  }

  getCommentReplies(commentId): Observable<any[]> {
    return this.http.get<any[]>(this.commentUrl + `/${commentId}/replies`);
  }

  getPostComments(postId): Observable<any[]> {
    return this.http.get<any[]>(this.postUrl + `/${postId}/comments`);
  }

  likeComment(commentId): Observable<any>{
    return this.http.post<any>(this.commentUrl + `/${commentId}/like`, commentId);
  }

  dislikeComment(commentId): Observable<any>{
    return this.http.post<any>(this.commentUrl + `/${commentId}/dislike`, commentId);
  }

  hearthComment(commentId): Observable<any>{
    return this.http.post<any>(this.commentUrl + `/${commentId}/hearth`, commentId);
  }

  deleteReaction(commentId): Observable<any>{
    return this.http.delete<any>(this.commentUrl + `/${commentId}/deleteReaction`, commentId);
  }

  getCommentReaction(commentId): Observable<any[]> {
    return this.http.get<any[]>(this.commentUrl + `/${commentId}/reactions`)
  }

  getMostLikedComments(postId): Observable<any[]> {
    return this.http.get<any[]>(this.commentUrl + `/${postId}/mostLiked`)
  }

  getLeastLikedComments(postId): Observable<any[]> {
    return this.http.get<any[]>(this.commentUrl + `/${postId}/leastLiked`)
  }

  getMostDislikedComments(postId): Observable<any[]> {
    return this.http.get<any[]>(this.commentUrl + `/${postId}/mostDisliked`)
  }

  getLeastDislikedComments(postId): Observable<any[]> {
    return this.http.get<any[]>(this.commentUrl + `/${postId}/leastDisliked`)
  }

  getMostHearthedComments(postId): Observable<any[]> {
    return this.http.get<any[]>(this.commentUrl + `/${postId}/mostHearthed`)
  }

  getLeastHearthedComments(postId): Observable<any[]> {
    return this.http.get<any[]>(this.commentUrl + `/${postId}/leastHearthed`)
  }

  getNewestComments(postId): Observable<any[]> {
    return this.http.get<any[]>(this.commentUrl + `/${postId}/newest`)
  }

  getOldestComments(postId): Observable<any[]> {
    return this.http.get<any[]>(this.commentUrl + `/${postId}/oldest`)
  }
}
