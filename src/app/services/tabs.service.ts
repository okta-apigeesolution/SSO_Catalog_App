import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tab } from '../models/tab';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  apiUrl : '/sennovate/rest/api'
};

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  public tabs;
  constructor(private http: HttpClient) { }

  public saveTab(tab: Tab) {
    let body = JSON.stringify(tab);
    console.log(body);
    return this.http.post<Tab>(httpOptions.apiUrl+'/saveTab', body, httpOptions);
  }
}
