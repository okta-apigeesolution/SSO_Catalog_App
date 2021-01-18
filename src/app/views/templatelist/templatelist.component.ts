import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Template } from 'src/app/models/template';

@Component({
  selector: 'app-templatelist',
  templateUrl: './templatelist.component.html',
  styleUrls: ['./templatelist.component.scss']
})
export class TemplatelistComponent implements OnInit {

  public templates;
  infoMessage: string;
  errorMessage: string;
  info: boolean;
  error: boolean;
  template: any;
  templateForm : FormGroup;
  submitted = false;
  templateName: any;
  public searchTemplate : string;
  deleteTemplateName: string;
  deleteTemplateId: string;

  constructor(private router: Router, 
    private templateService: TemplateService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.templateForm = this.formBuilder.group({
      templateName: ['', Validators.required],
      templateDescription: ['', Validators.required],
      templateVisibility: [true, '']
    });
    
    this.templateService.loadTemplates()
    .subscribe((resp)=>{     
      console.log('response from post data is ', resp); 
      this.templates = resp;        
    },(error)=>{
      console.log('status code post is ', error.status)
      if(error.status == 200){
        
      } else {
         this.error = true;
         this.errorMessage = error.status + ': Server not found';
      }
    });
  }

  public viewTemplate(templateId) {
    this.router.navigateByUrl('/templateListView/'+templateId);
  }

  public editTemplate(templateId) {
    this.router.navigateByUrl('/templateEditView/'+templateId);
  }

  setTemplate(template){
    this.deleteTemplateId = template.templateId;
    this.deleteTemplateName = template.templateName;
  }

  deleteTemplate() {
    this.info = false;
    this.infoMessage = '';
    this.error = false;
    this.errorMessage = '';
    let deletedId = this.deleteTemplateId;
    console.log(deletedId);
    this.templateService.deleteTemplate(deletedId)
      .subscribe((resp)=>{     
        console.log('response from post data is ', resp);         
        this.info = true;
        this.infoMessage = 'Template deleted successfully.';
        this.reloadTemplates();
      },(error)=>{
        console.log('status code post is ', error.status)
        if(error.status == 200){
           this.info = true;
           this.infoMessage = 'Template deleted successfully.';
        } else {
           this.error = true;
           this.errorMessage = error.status + ': Server not found';
        }
      });
  }

  get f() { return this.templateForm.controls; }

  onReset() {
    this.submitted = false;
    this.info = false;
    this.error = false;
  }

  editTemplateRow(template) {
    this.info = false;
    this.infoMessage = '';
    this.error = false;
    this.errorMessage = '';
    this.template = template;
    this.templateName = this.template.templateName;

    this.templateForm = this.formBuilder.group({
      templateName: [this.template.templateName, Validators.required],
      templateDescription: [this.template.templateDescription, Validators.required],
      templateVisibility: [true, '']
    });
  }

  onSubmit() { 
    this.submitted = true;

    if (this.templateForm.invalid) {
        return;
    }
    
    let template = new Template(this.template.templateId, this.templateForm.value.templateName,
                                this.templateForm.value.templateDescription,
                                this.templateForm.value.templateVisibility);
    this.templateService.saveTemplate(template).subscribe((resp)=>{     
      console.log('response from post data is ', resp);         
      this.info = true;
      this.infoMessage = 'Template created successfully.';
    },(error)=>{
      console.log('status code post is ', error.status)
      if(error.status == 200){
         this.info = true;
         this.infoMessage = 'Template created successfully.';
      } else {
         this.error = true;
         this.errorMessage = error.status;
      }
    });
  }

  reloadTemplates() {
    this.info = false;
    this.infoMessage = '';
    this.error = false;
    this.errorMessage = '';
    this.templateService.loadTemplates()
    .subscribe((resp)=>{     
      console.log('response from post data is ', resp);      
      this.templates = resp;   
    },(error)=>{
      console.log('status code post is ', error.status)
      if(error.status == 200){

      } else {
         this.error = true;
         this.errorMessage = error.status + ': Server not found';
      }
    });
  }

}
