
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}
  getInfoRepo(id: number) {
    return this.http.get(`https://api.github.com/repositories/${id}`);
  }
  getRepositories(framework: string) {
    return this.http
      .get(`https://api.github.com/search/repositories?q=${framework}`)
      .pipe(
        map((data: { items: any }) => {
          let repositoriesList = data.items;
          return repositoriesList.map(function (items: any) {
            return {
              name: items.full_name,
              url: items.html_url,
              watchers: items.watchers,
              size: items.size,
              img: items.owner.avatar_url,
              id: items.id,
            };
          });
        })
      );
  }
}
