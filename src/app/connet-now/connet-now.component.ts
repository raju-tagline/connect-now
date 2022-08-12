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
  public filteredGames!: IResponse[];
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
      order: new FormControl('timeStamp'),
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
              ).format('DD/MM/YYYY'),
              timeStamp: res.first_release_date,
            };
          });
        }
      });
  }

  findValueName(event: any) {
    if (event?.target?.value && event?.target?.value.length) {
      const videoGames: IResponse[] = this.videoGameList;
      let listOfGame: IResponse[] = [];
      videoGames.find((ele: IResponse) => {
        if (ele && ele.name.toLowerCase().includes(event.target.value)) {
          listOfGame.push(ele);
        }
      });
      this.filteredGames = listOfGame;
    } else if (!this.filteredGames?.length) {
      this.filteredGames = [...this.videoGameList];
    } else if (!event?.target?.value?.length) {
      this.filteredGames = [...this.videoGameList];
    }
  }

  findValueScore(event: any) {
    if (
      this.filteredGames?.length &&
      event?.target?.value &&
      event?.target?.value.length
    ) {
      let listOfGame: IResponse[] = [];
      this.filteredGames.find((ele: IResponse) => {
        if (ele && ele.rating >= Number(event.target.value)) {
          listOfGame.push(ele);
        }
      });
      this.filteredGames = listOfGame;
    } else if (!this.filteredGames?.length) {
      this.filteredGames = [...this.videoGameList];
    } else if (!event?.target?.value?.length) {
      this.filteredGames = [...this.videoGameList];
    }
  }

  orderBy(event: any) {
    const value: any = event.target.value;
    if (this.filteredGames?.length) {
      if (
        event.target.value === 'timeStamp' ||
        event.target.value === 'rating'
      ) {
        this.filteredGames.sort((a: any, b: any): any => {
          return a[`${value}`] - b[`${value}`];
        });
      }
      if (event.target.value === 'name') {
        this.filteredGames.sort((a: any, b: any): any => {
          return a[`${value}`].localeCompare(b[`${value}`]);
        });
      }
    } else {
      this.filteredGames = [...this.videoGameList];
      if (
        event.target.value === 'timeStamp' ||
        event.target.value === 'rating'
      ) {
        this.filteredGames.sort((a: any, b: any): any => {
          return a[`${value}`] - b[`${value}`];
        });
      }
      if (event.target.value === 'name') {
        this.filteredGames.sort((a: any, b: any): any => {
          return a[`${value}`].localeCompare(b[`${value}`]);
        });
      }
    }
  }

  clearFilter() {
    this.filteredGames = [];
    this.videoGameFilterForm.reset();
    this.videoGameFilterForm.patchValue({
      order: 'timeStamp',
    });
  }
}
