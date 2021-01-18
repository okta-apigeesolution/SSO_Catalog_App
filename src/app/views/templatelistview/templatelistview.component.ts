import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-templatelistview',
  templateUrl: './templatelistview.component.html',
  styleUrls: ['./templatelistview.component.scss']
})
export class TemplatelistviewComponent implements OnInit {

  id: any;
  template: any;
  isDataLoaded: boolean = false;

  constructor(private route: ActivatedRoute, 
    private location: Location, 
    private templateService: TemplateService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['templateId']; 
    });

    this.templateService.getTemplate(this.id).subscribe((resp)=>{     
      console.log('response from post data is ', resp);         
      this.template = resp;
      this.isDataLoaded = true;
    });
  }

  goBack(): void {
    this.location.back();
  }

}
