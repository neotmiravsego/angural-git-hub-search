import { repositoriesInfo } from './repository/IreposInfo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService {
  users: repositoriesInfo[] = [];
  constructor(private http: HttpClient) {}
  getInfo(id: number) {
    return this.http.get(`https://api.github.com/repositories/${id}`);
  }
  getUsers(framework: string) {
    return this.http
      .get(`https://api.github.com/search/repositories?q=${framework}`)
      .pipe(
        map((data: { items: any }) => {
          let usersList = data.items;
          return usersList.map(function (items: any) {
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
