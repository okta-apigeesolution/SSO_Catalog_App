import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from 'src/app/services/applications.service';
import { Application } from 'src/app/models/application';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicationslist',
  templateUrl: './applicationslist.component.html',
  styleUrls: ['./applicationslist.component.scss']
})
export class ApplicationslistComponent implements OnInit {

  applications: any;
  vApplication: any;
  applicationCategoryItems: any;
  applicationCategory: any;
  applicationRating: any;

  //application edit properties
  submitted = false;
  infoMessage: string;
  errorMessage: string;
  info: boolean;
  error: boolean;
  applicationEditName: any;
  applicationForm: FormGroup;
  imageIcon: any;
  applicationUrl: any;
  eApplication: any;

  searchApplication: string;
  isApplicationEdited: boolean = false;
  isEditApplicationIcon: any;
  deleteApplicationName: string;
  deleteApplicationId: string;

  constructor(private formBuilder: FormBuilder, 
    private applicationService: ApplicationsService) { }

  ngOnInit() {
    this.vApplication = new Application(12, '', '', true, '', '', '', '');
    this.applicationForm = this.formBuilder.group({
      applicationName: ['', Validators.required],
      applicationDescription: ['', Validators.required],
      applicationVisibility: [true, ''],
      applicationIcon: [null, Validators.required],
      applicationUrl: ['', Validators.required],
      applicationCategory: ['', Validators.required],
      applicationRating: ['', Validators.required]
    });
    this.applicationCategoryItems = this.applicationService.applicationCategories();

    this.applicationService.loadApplications()
    .subscribe((resp)=>{     
      console.log('template response from post data is ', resp);         
      this.applications = resp;
    },(error)=>{
      console.log('template status code post data is ', error.status)
    });

  }

  viewApplication(application){
    this.applicationCategory = this.applicationCategoryItems[application.applicationCategory].itemName;
    this.vApplication = new Application(application.applicationId, 
                                        application.applicationName, 
                                        application.applicationDescription,
                                        application.applicationVisibility,
                                        application.applicationIcon,
                                        application.applicationUrl,
                                        this.applicationCategory,
                                        application.applicationRating
      );
  }

  editApplication(application) {
    this.eApplication = application;
    this.info = false;
    this.infoMessage = '';
    this.error = false;
    this.errorMessage = '';
    this.isApplicationEdited = true;
    this.isEditApplicationIcon = application.applicationIcon;
    console.log('edit clicked:::' + JSON.stringify(application));

    this.applicationEditName = application.applicationName;
 
    this.applicationForm = this.formBuilder.group({
      applicationName: [application.applicationName, Validators.required],
      applicationDescription: [application.applicationDescription, Validators.required],
      applicationVisibility: [application.applicationVisibility, ''],
      applicationIcon: [null, ''],
      applicationUrl: [application.applicationUrl, Validators.required],
      applicationCategory: [this.applicationCategoryItems[application.applicationCategory].itemId, Validators.required],
      applicationRating: [application.applicationRating, Validators.required]
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

    let fileExtension;
    if(this.isApplicationEdited) {
      if(this.applicationForm.get('applicationIcon').value != null){
        fileExtension = "."+this.applicationForm.get('applicationIcon').value.substring(this.applicationForm.get('applicationIcon').value.lastIndexOf('.') + 1);
        console.log(fileExtension);
        if (!fileExtension.toLowerCase().match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/)){ 
          this.error = true;
          this.errorMessage = 'Please upload the valid image Icon';
          return;
        } else {
          this.error = false;
          this.errorMessage = '';
        }
      }
    }
    
    if (this.applicationForm.invalid) {
        return;
    }

    console.log(this.imageIcon);
    if(this.isApplicationEdited && this.imageIcon == null) {
      this.imageIcon = this.isEditApplicationIcon;
    }

    let application = new Application(this.eApplication.applicationId,
                      this.applicationForm.value.applicationName,
                      this.applicationForm.value.applicationDescription,
                      this.applicationForm.value.applicationVisibility,
                      this.imageIcon,
                      this.applicationForm.value.applicationUrl,
                      this.applicationForm.value.applicationCategory,
                      this.applicationForm.value.applicationRating);
    this.applicationService.saveApplication(application).subscribe((resp)=>{     
      console.log('response from post data is ', resp);         
      this.info = true;
      this.infoMessage = 'Application updated successfully.';
    },(error)=>{
      console.log('status code post is ', error.status)
      if(error.status == 200){
         this.info = true;
         this.infoMessage = 'Application updated successfully.';
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

  reloadApplications(){
    this.info = false;
    this.infoMessage = '';
    this.error = false;
    this.errorMessage = '';
    this.applicationService.loadApplications()
    .subscribe((resp)=>{     
      console.log('template response from post data is ', resp);         
      this.applications = resp;
    },(error)=>{
      console.log('template status code post data is ', error.status)
    });
    console.log(this.applications);
  }


  setApplication(application) {
    this.deleteApplicationId = application.applicationId;
    this.deleteApplicationName = application.applicationName;
  }

  deleteApplication() {
      this.applicationService.deleteTemplate(this.deleteApplicationId)
      .subscribe((resp)=>{     
        console.log('response from post data is ', resp);         
        this.info = true;
        this.infoMessage = 'Application deleted successfully.';
        this.reloadApplications();
      },(error)=>{
        console.log('status code post is ', error.status)
        if(error.status == 200){
           this.info = true;
           this.infoMessage = 'Application deleted successfully.';
        } else {
           this.error = true;
           this.errorMessage = error.status + ': Server not found';
        }
      });
  }

}
