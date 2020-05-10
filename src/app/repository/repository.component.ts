import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { repositoriesInfo } from './IreposInfo';
import { repoInfo } from './IRepoInfo';
import { HttpService } from '../http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent implements OnInit {
  repo: repoInfo = {
    language: '',
    description: '',
    wiki: false,
  };
  id: number;
  routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.httpService.getInfoRepo(params.id).subscribe((data: any) => {
        this.repo = data;
      });
    });
  }
}
