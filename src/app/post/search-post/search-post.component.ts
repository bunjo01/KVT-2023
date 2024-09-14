import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Post {
  id: string;
  databaseId: number;
  title: string;
  content: string;
  pdfDescriptionUrl: string;
  pdfText: string;
}

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css']
})
export class SearchPostComponent implements OnInit {
  keywords: string = '';
  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const body = { keywords: this.keywords.split(' ') };
    this.http.post<{ content: Post[] }>('http://localhost:8080/api/search/posts/simple', body)
      .subscribe(response => {
        this.posts = response.content;
      });
  }
}
