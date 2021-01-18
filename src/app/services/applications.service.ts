import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Application } from '../models/application';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  apiUrl : '/sennovate/rest/api'
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  private applications;
  constructor(private http: HttpClient) { }

  public saveApplication(application: Application) {
    let body = JSON.stringify(application);
    console.log(body);
    return this.http.post<Application>(httpOptions.apiUrl+'/saveApplication', body, httpOptions);
  }

  public loadApplications() {
    return this.http.get<Application>(httpOptions.apiUrl+'/applications', httpOptions);
  }

  public applicationCategories(){
    let applicationCategoryItems = [
      {'itemId': 0, 'itemName':'-- Select Category --'},
      {'itemId': 1, 'itemName':'Finance Legal'},
      {'itemId': 2, 'itemName':'Marketting Sales'},
      {'itemId': 3, 'itemName':'Corporate IT HR'},
      {'itemId': 4, 'itemName':'Public Relations'},
      {'itemId': 5, 'itemName':'Collaboration'},
      {'itemId': 6, 'itemName':'Enterprise Apps'}
    ];
    return applicationCategoryItems;
  }

  public getApplication(applicationId) {
    let body = JSON.stringify(applicationId);
    return this.http.get<Application>(httpOptions.apiUrl+'/getApplication/'+body, httpOptions);
  }

  public deleteTemplate(applicationId) {
    let body = JSON.stringify(applicationId);
    return this.http.delete<Application>(httpOptions.apiUrl+'/deleteApplication/'+body, httpOptions);
  }

}
