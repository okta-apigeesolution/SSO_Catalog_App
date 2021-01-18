import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TemplateService } from 'src/app/services/template.service';
import { Template } from 'src/app/models/template';

@Component({
  selector: 'app-createtemplate',
  templateUrl: './createtemplate.component.html',
  styleUrls: ['./createtemplate.component.scss']
})
export class CreatetemplateComponent implements OnInit {

  templateForm : FormGroup;
  submitted = false;
  infoMessage: string;
  errorMessage: string;
  info: boolean;
  error: boolean;
  
  constructor(private formBuilder: FormBuilder, 
    private templateService: TemplateService) { }

  onSubmit() { 
    this.submitted = true;

    if (this.templateForm.invalid) {
        return;
    }
    
    let template = new Template(Math.floor(Math.random() * Math.floor(10000)), 
                                this.templateForm.value.templateName,
                                this.templateForm.value.templateDescription,
                                true);
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

  ngOnInit() { 
    this.templateForm = this.formBuilder.group({
      templateName: ['', Validators.required],
      templateDescription: ['', Validators.required],
      templateVisibility: [true, '']
    });
  }

  get f() { return this.templateForm.controls; }

  onReset() {
    this.submitted = false;
    this.info = false;
    this.error = false;
  }


}
