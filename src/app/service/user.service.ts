import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { ConfigService } from "./config.service";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  currentUser;

  userUrl = "http://localhost:8080/api/users";
  userRequestsUrl = "http://localhost:8080/api/friend_requests";
  reportUrl = "http://localhost:8080/api/reports";

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    private http: HttpClient
  ) {}

  getMyInfo() {
    return this.apiService.get(this.config.whoami_url).pipe(
      map((user) => {
        this.currentUser = user;
        return user;
      })
    );
  }

  getAll() {
    return this.apiService.get(this.config.users_url);
  }

  changePassword(user) {
    return this.apiService.put(
      this.userUrl + "/changePassword",
      JSON.stringify(user)
    );
  }

  changeProfile(user) {
    return this.apiService.post(
      this.userUrl + "/changeProfile",
      JSON.stringify(user)
    );
  }

  findUserProfile(username: string) {
    return this.apiService
      .get(this.userUrl + username + "/profile")
      .subscribe();
  }

  findUserById(userId: number): Observable<any> {
    return this.http.get<any>(this.userUrl + `/${userId}`);
  }

  findUserFriends(userId: number): Observable<any> {
    return this.http.get<any>(this.userUrl + `/${userId}/friends`);
  }

  findUserFriendRequests(userId: number): Observable<any> {
    return this.http.get<any>(this.userUrl + `/${userId}/requests`);
  }

  findUserGroups(userId: number): Observable<any> {
    return this.http.get<any>(this.userUrl + `/${userId}/groups`);
  }

  sendFriendRequest(userId: number): Observable<any> {
    return this.http.post(this.userRequestsUrl + `/${userId}/send`, userId);
  }

  approveFriendRequest(requestId: number): Observable<any> {
    return this.http.post(
      this.userRequestsUrl + `/${requestId}/approve`,
      requestId
    );
  }

  declineFriendRequest(requestId: number): Observable<any> {
    return this.http.post(
      this.userRequestsUrl + `/${requestId}/decline`,
      requestId
    );
  }

  searchUser(term: string): Observable<any[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<any[]>(`${this.userUrl}/?name=${term}`);
  }

  findUserPosts(userId: number): Observable<any> {
    return this.http.get<any>(this.userUrl + `/${userId}/posts`);
  }

  report(reportType, userId) {
    return this.http
      .post(this.reportUrl + `/${userId}/user`, JSON.stringify(reportType), {
        headers: this.headers,
        responseType: "text",
      })
      
  }

  getReportedUsers(): Observable<any> {
    return this.http.get<any>(this.reportUrl + "/userReports")
  }

  getAcceptedReportedUsers(): Observable<any> {
    return this.http.get<any>(this.reportUrl + "/bannedUsers")
  }

  getReportedNonGroupPosts(): Observable<any> {
    return this.http.get<any>(this.reportUrl + "/nonGroupPosts")
  }

  getReportedNonGroupComments(): Observable<any> {
    return this.http.get<any>(this.reportUrl + "/nonGroupComments")
  }

  acceptReport(requestId: number) {
    return this.http.put(
      this.reportUrl + `/${requestId}/accept`,
      requestId
    );
  }

  declineReport(requestId: number) {
    return this.http.put(
      this.reportUrl + `/${requestId}/decline`,
      requestId
    );
  }

  changePicture(filePath : string){
    this.http.put(this.userUrl + '/changeImage', { filePath }).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  unban(username) {
    return this.http.put(
      this.reportUrl + `/${username}/unblock`,
      username
    );
  }
  


}
