import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { repoInfo } from '../repository/IRepoInfo';
import { repositoriesInfo } from '../repository/IreposInfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HttpService],
})
export class HomeComponent implements OnInit {
  repositories: repositoriesInfo[] = [];
  repo: repoInfo;
  isSorted: boolean = false;
  isSortedWatch: boolean=false;
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}

  searchRepositories(c: string) {
    this.httpService.getRepositories(c).subscribe((data) => {
      this.repositories = data;
    });
  }
  sortSize() {
    if (!this.isSorted) {
      this.repositories = this.repositories.sort((a: any, b: any) => {
        return a.size - b.size;
      });
      this.isSorted = true;
    } else {
      this.repositories = this.repositories.reverse();
    }
  }
  sortWatchers() {
    if (!this.isSortedWatch) {
      this.repositories = this.repositories.sort((a: any, b: any) => {
        return a.watchers - b.watchers;
      });
      this.isSortedWatch = true;
    } else {
      this.repositories = this.repositories.reverse();
    }
  }
}
