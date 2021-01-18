import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApplicationsService } from 'src/app/services/applications.service';
import { Application } from 'src/app/models/application';


@Component({
  selector: 'app-createssoapplication',
  templateUrl: './createssoapplication.component.html',
  styleUrls: ['./createssoapplication.component.scss']
})
export class CreatessoapplicationComponent implements OnInit {

  submitted = false;
  applicationForm: FormGroup;
  infoMessage: string;
  errorMessage: string;
  info: boolean;
  error: boolean;
  imageIcon: any;
  applicationUrl: any;
  applicationCategoryItems: any;

  constructor(private formBuilder: FormBuilder, 
              private applicationService: ApplicationsService) { }

  ngOnInit() {
    this.applicationCategoryItems = this.applicationService.applicationCategories();

    this.applicationForm = this.formBuilder.group({
      applicationName: ['', Validators.required],
      applicationDescription: ['', Validators.required],
      applicationVisibility: [true, ''],
      applicationIcon: [null, Validators.required],
      applicationUrl: ['', Validators.required],
      applicationCategory: [this.applicationCategoryItems[0].itemId, Validators.required],
      applicationRating: ['', Validators.required]
    });

  }

  get f() { return this.applicationForm.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.applicationForm.get('applicationIcon').value=="" ||
                this.applicationForm.get('applicationIcon').value==null){
      this.error = true;
      this.errorMessage = 'Application Icon is Required';
    }

    if(this.applicationForm.get('applicationCategory').value=="" ||
                this.applicationForm.get('applicationCategory').value==null){
      this.error = true;
      this.errorMessage = 'Application Category is Required';
    }

    if(this.applicationForm.get('applicationRating').value=="" ||
                this.applicationForm.get('applicationRating').value==null){
      this.error = true;
      this.errorMessage = 'Application Rating is Required';
    }

    let fileExtension = "."+this.applicationForm.get('applicationIcon').value.substring(this.applicationForm.get('applicationIcon').value.lastIndexOf('.') + 1);
    console.log(fileExtension);

    if (!fileExtension.toLowerCase().match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/)){ 
      this.error = true;
      this.errorMessage = 'Please upload the valid image Icon';
      return;
    } else {
      this.error = false;
      this.errorMessage = '';
    }

    if (this.applicationForm.invalid) {
        return;
    }

    let application = new Application(Math.floor(Math.random() * Math.floor(10000)),
                      this.applicationForm.value.applicationName,
                      this.applicationForm.value.applicationDescription,
                      true,
                      this.imageIcon,
                      this.applicationForm.value.applicationUrl,
                      this.applicationForm.value.applicationCategory,
                      this.applicationForm.value.applicationRating);
    this.applicationService.saveApplication(application).subscribe((resp)=>{     
      console.log('response from post data is ', resp);         
      this.info = true;
      this.infoMessage = 'Application created successfully.';
    },(error)=>{
      console.log('status code post is ', error.status)
      if(error.status == 200){
         this.info = true;
         this.infoMessage = 'Application created successfully.';
      } else {
         this.error = true;
         this.errorMessage = error.status;
      }
    });

  }

  onReset() {
    this.submitted = false;
    this.info = false;
    this.error = false;
  }

  imageUpload(event) {
    let file:File = event.target.files[0];
    console.log(file);

    var checkimg = file.name.toLowerCase();
    if (!checkimg.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/)){ 
      this.error = true;
      this.errorMessage = 'Please upload the valid image Icon';
      return;
    } else {
      this.error = false;
      this.errorMessage = '';
    }

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event) => {
      this.imageIcon = reader.result;
    }
  }
}
