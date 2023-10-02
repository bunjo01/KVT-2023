import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "src/app/service";

@Injectable({
  providedIn: "root",
})
export class GroupService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  groupUrl = "http://localhost:8080/api/groups";
  groupRequestUrl = "http://localhost:8080/api/group_requests";
  reportUrl = "http://localhost:8080/api/reports";

  user = this.userService.getMyInfo();

  constructor(private http: HttpClient, private userService: UserService) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.groupUrl + "/all");
  }

  add(newGroup) {
    return this.http.post(this.groupUrl + "/create", JSON.stringify(newGroup), {
      headers: this.headers,
      responseType: "text",
    });
  }

  addGroupPost(newPost, groupId) {
    newPost.userUsername = this.userName();
    return this.http.post(
      this.groupUrl + `/${groupId}/posts`,
      JSON.stringify(newPost),
      {
        headers: this.headers,
        responseType: "text",
      }
    );
  }

  suspendGroup(suspend, groupId) {
    return this.http.post(
      this.groupUrl + `/${groupId}/suspend`,
      JSON.stringify(suspend),
      {
        headers: this.headers,
        responseType: "text",
      }
    );
  }

  promoteMember(groupId: number, memberId: number): Observable<any> {
    return this.http.post(
      this.groupUrl + `/${groupId}/admins/${memberId}`,
      memberId
    );
  }

  edit(group) {
    return this.http.put(this.groupUrl + "/edit", JSON.stringify(group), {
      headers: this.headers,
      responseType: "text",
    });
  }

  delete(groupId: number): Observable<number> {
    return this.http.delete<number>(this.groupUrl + "/" + groupId);
  }

  getGroup(groupId: number): Observable<any> {
    return this.http.get<any>(this.groupUrl + `/${groupId}`);
  }

  getGroupRequests(groupId: number): Observable<any> {
    return this.http.get<any>(this.groupUrl + `/${groupId}/requests`);
  }

  sendGroupRequest(groupId: number): Observable<any> {
    return this.http.post(this.groupRequestUrl + `/${groupId}/send`, groupId);
  }

  approveRequest(requestId: number): Observable<any> {
    return this.http.post(
      this.groupRequestUrl + `/${requestId}/approve`,
      requestId
    );
  }

  declineRequest(requestId: number): Observable<any> {
    return this.http.post(
      this.groupRequestUrl + `/${requestId}/decline`,
      requestId
    );
  }

  getGroupAdmins(groupId: number): Observable<any> {
    return this.http.get<any>(this.groupUrl + `/${groupId}/admins`);
  }

  getGroupsMembers(groupId: number): Observable<any> {
    return this.http.get<any>(this.groupUrl + `/${groupId}/members`);
  }

  getGroupsPosts(groupId: number): Observable<any> {
    return this.http.get<any>(this.groupUrl + `/${groupId}/posts`);
  }

  userName() {
    const user = this.userService.currentUser;
    return user.username;
  }

  removeGroupAdmin(userId, groupId): Observable<any> {
    return this.http.delete(this.groupUrl + `/${groupId}/admins/${userId}`);
  }

  blockMember(userId, groupId): Observable<any> {
    return this.http.post(this.groupUrl + `/${groupId}/remove/${userId}`, groupId);
  }

  unblockMember(userId, groupId): Observable<any> {
    return this.http.post(this.groupUrl + `/${groupId}/unblock/${userId}`, groupId);
  }

  getBlockedMembers(groupId): Observable<any[]>{
    return this.http.get<any[]>(this.groupUrl + `/${groupId}/blockedMembers`)
  }

  getReportedGroupPosts(groupId): Observable<any> {
    return this.http.get<any>(this.reportUrl + `/${groupId}/groupPosts`)
  }

  getReportedGroupComments(groupId): Observable<any> {
    return this.http.get<any>(this.reportUrl + `/${groupId}/groupComments`)
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
}
