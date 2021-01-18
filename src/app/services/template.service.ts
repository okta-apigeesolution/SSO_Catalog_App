import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Template } from '../models/template';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  apiUrl : '/sennovate/rest/api'
};

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  public templates;
  constructor(private http: HttpClient) { }

  public saveTemplate(template: Template) {
    let body = JSON.stringify(template);
    console.log(body);
    return this.http.post<Template>(httpOptions.apiUrl+'/saveTemplate', body, httpOptions);
  }

  saveTemplateViewData(data) {
    let body = JSON.stringify(data);
    console.log(body);
    return this.http.post<Template>(httpOptions.apiUrl+'/saveTemplateTab', body, httpOptions);
  }

  public loadTemplates() {
    return this.http.get<Template>(httpOptions.apiUrl+'/templateTabs', httpOptions);
  }

  public getTemplate(templateId) {
    let body = JSON.stringify(templateId);
    return this.http.get<Template>(httpOptions.apiUrl+'/templateTab/'+body, httpOptions);
  }

  public updateTemplate(template: Template): Observable<Template> {
    let body = JSON.stringify(template);
    return this.http.put<Template>(httpOptions.apiUrl+'/updateTemplate', body, httpOptions);
  }

  public deleteTemplate(templateId) {
    let body = JSON.stringify(templateId);
    return this.http.delete<Template>(httpOptions.apiUrl+'/deleteTemplate/'+body, httpOptions);
  }
}
