import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IResponse {
  first_release_date: number;
  id: number;
  name: string;
  rating: number;
  summary: string;
}

@Component({
  selector: 'app-connet-now',
  templateUrl: './connet-now.component.html',
  styleUrls: ['./connet-now.component.scss'],
})
export class ConnetNowComponent implements OnInit {
  private endPoint: string = environment.URL;
  public videoGameList!: IResponse[];

  constructor(private http: HttpClient) {
    this.getListOfGames();
  }

  ngOnInit(): void {}

  getListOfGames() {
    this.http
      .get<IResponse[]>(`${this.endPoint}`)
      .subscribe((resp: IResponse[]) => {
        if (resp?.length) {
          this.videoGameList = resp;
        }
      });
  }
}
