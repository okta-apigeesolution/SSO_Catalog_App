import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { ApplicationsService } from 'src/app/services/applications.service';
declare var $ : any;

@Component({
  selector: 'app-applicationviews',
  templateUrl: './applicationviews.component.html',
  styleUrls: ['./applicationviews.component.scss']
})
export class ApplicationviewsComponent implements OnInit {

  public searchTemplate : string;
  public templates: any;
  public tabs: any;
  public applications: any;
  id: number;
  error: boolean = false;
  errorMessage: any;
  
  constructor(
    private route: ActivatedRoute,
    private templateService: TemplateService,
    private applicationService: ApplicationsService) { }

  ngOnInit() {
   
    $('.closeall').click(function(){
      $('.panel-collapse.show').collapse('hide');
    });
    $('.openall').click(function(){
      $('.panel-collapse:not(".in")').collapse('show');
    });
    
    this.templateService.loadTemplates()
    .subscribe((resp)=>{     
      console.log('template response from post data is ', resp);         
      this.templates = resp;
    },(error)=>{
      console.log('template status code post data is ', error.status);
      this.error = true;
      this.errorMessage = error.status +' Server not found. Failed to load the templates.';
    });

    console.log('templates' + this.templates);
    
    // this.applicationService.loadApplications()
    // .subscribe((resp)=>{     
    //   console.log('template response from post data is ', resp);         
    //   this.applications = resp;
    // },(error)=>{
    //   console.log('template status code post data is ', error.status)
    //   this.error = true;
    //   this.errorMessage = error.status +' Server not found. Failed to load the applications.';
    // });

    // console.log('applications' + this.applications);
  }

}
