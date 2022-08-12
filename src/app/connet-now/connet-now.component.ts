import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

export interface IResponse {
  first_release_date: Date;
  id: number;
  name: string;
  rating: number;
  summary: any;
}

@Component({
  selector: 'app-connet-now',
  templateUrl: './connet-now.component.html',
  styleUrls: ['./connet-now.component.scss'],
})
export class ConnetNowComponent implements OnInit {
  private endPoint: string = environment.URL;
  public videoGameList!: IResponse[];
  public isDropDownShow: boolean = false;
  public videoGameFilterForm!: FormGroup;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getListOfGames();
    this.createForm();
  }

  createForm() {
    this.videoGameFilterForm = new FormGroup({
      name: new FormControl(''),
      score: new FormControl(''),
      order: new FormControl(''),
    });
  }

  getListOfGames() {
    this.http
      .get<IResponse[]>(`${this.endPoint}`)
      .subscribe((resp: IResponse[]) => {
        if (resp?.length) {
          this.videoGameList = resp.map((res: any) => {
            return {
              ...res,
              first_release_date: moment(
                new Date(res.first_release_date)
              ).format('MM/DD/YYYY'),
            };
          });
        }
      });
  }

  findValue(event: any) {
    if (event?.target?.value && event?.target?.value.length) {
      const videoGames: IResponse[] = this.videoGameList;
      const listOfGame: IResponse[] = [];
      videoGames.find((ele: IResponse) => {
        if (ele && ele.name.toLowerCase().includes(event.target.value)) {
          listOfGame.push(ele);
        }
      });
      this.videoGameList = listOfGame;
    }
  }
}
