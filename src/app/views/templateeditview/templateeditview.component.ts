import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tab } from 'src/app/models/tab';
import { TabsService } from 'src/app/services/tabs.service';
import { ApplicationsService } from 'src/app/services/applications.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-templateeditview',
  templateUrl: './templateeditview.component.html',
  styleUrls: ['./templateeditview.component.scss']
})
export class TemplateeditviewComponent implements OnInit {

  templateId: any;
  template: any;
  isTemplateDataLoaded: boolean = false;
  isApplicationDataLoaded: boolean = false;

  //Tab related properties
  tabForm : FormGroup;
  submitted = false;
  infoMessage: string;
  errorMessage: string;
  info: boolean;
  error: boolean;
  tabEditName: any;
  editTabTrue: boolean = false;
  editDataTab: any;
  tabId: any;
  enableApplicationIcon: boolean = false;

  //applicaions properties
  applications: any;
  applicationCategoryItems: any;
  applicationIdsArray = [];
  applicationAdded: boolean = false;
  deleteApplicationIdsArray = [];
  isApplicationAlreadyAdded: boolean = false;

  deletedApplicationID: string;
  deletedApplicationName: string;
  enableOKButton: boolean = false;
  disableYESNOButton: boolean = false;
  applicationNAMEFIlter: string;

  public appCategories = [];

  constructor(private route: ActivatedRoute, 
    private location: Location, 
    private templateService: TemplateService,
    private formBuilder: FormBuilder,
    private tabsService: TabsService,
    private applicationService: ApplicationsService,
    private tabset: NgbTabset) { }

  ngOnInit() {
    this.info = false;
    this.infoMessage = '';
    this.error = false;
    this.errorMessage = '';
    this.submitted = false;
    this.applicationAdded = false;
    this.isApplicationAlreadyAdded = false;
    this.tabEditName = '';
    this.tabForm = this.formBuilder.group({
      tabName: ['', Validators.required],
      tabDescription: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.templateId = +params['templateId']; 
    });

    this.templateService.getTemplate(this.templateId)
    .subscribe((resp)=>{     
      console.log('response from post data is ', resp);         
      this.template = resp;
      this.isTemplateDataLoaded = true;
    });
   
    this.applicationCategoryItems = this.applicationService.applicationCategories();
    this.applicationService.loadApplications()
    .subscribe((resp)=>{     
      this.applications = resp; 
      this.isApplicationDataLoaded = true;      
    });

    if(this.isApplicationDataLoaded) {
      for (var k=0; k < this.applications.length; k++) {
        let application = this.applications[k];
        this.appCategories.push(application.applicationCategory);
      }
      console.log('appCategories-->'+this.appCategories);
    }
  }

  goBack(): void {
    this.location.back();
  }

  get f() { return this.tabForm.controls; }

  onSubmit() { 
    this.submitted = true;

    if (this.tabForm.invalid) {
        return;
    }
    
    let tabId = Math.floor(Math.random() * Math.floor(10000));
    if(this.editDataTab) {
      tabId = this.editDataTab.tabId;
      console.log(this.applicationIdsArray);
    }
    let tab = new Tab(tabId, this.tabForm.value.tabName,
                                this.tabForm.value.tabDescription, this.templateId);
    this.tabsService.saveTab(tab).subscribe((resp)=>{     
      console.log('response from post data is ', resp);         
      this.info = true;
      this.enableApplicationIcon = true;
      if(this.editTabTrue) {
        this.infoMessage = 'Tab updated successfully.';
        this.editTabTrue = false;
        this.saveTemplateData(this.templateId, this.tabId, this.applicationIdsArray);
      }
      else {
        this.infoMessage = 'Tab created successfully.'; 
      }
    },(error)=>{
      console.log('status code post is ', error.status)
      if(error.status == 200){
        this.enableApplicationIcon = true;
         this.info = true;
         if(this.editTabTrue) {
          this.infoMessage = 'Tab updated successfully.';
          this.editTabTrue = false;
          this.saveTemplateData(this.templateId, this.tabId, this.applicationIdsArray);
         }
         else {
          this.infoMessage = 'Tab created successfully.'; 
         } 
      } else {
         this.error = true;
         this.errorMessage = error.status + ': Server not found';
      }
    });
  }

  saveTemplateData(templateId, tabId, applicationIdsArray) {
    let data = {'templateId': templateId, 'tabId': tabId, 'applicationsArray': applicationIdsArray};
    console.log(data);
    this.templateService.saveTemplateViewData(data).subscribe((resp)=>{     
      console.log('response from post data is ', resp);        
    },(error)=>{
      console.log('status code post is ', error.status)
    }); 
  }

  resetTabForm() {
    this.info = false;
    this.infoMessage = '';
    this.error = false;
    this.errorMessage = '';
    this.submitted = false;
    this.editDataTab = false;
    this.tabForm = this.formBuilder.group({
      tabName: ['', Validators.required],
      tabDescription: ['', Validators.required]
    });

  }

  onReset() {
    this.submitted = false;
    this.info = false;
    this.error = false;
  }

  reloadTab(){
    console.log(this.tabId);
    console.log('reload tab called...');
    this.applicationIdsArray = [];
    this.templateService.getTemplate(this.templateId)
    .subscribe((resp)=>{     
      console.log('response from post data is ', resp);         
      this.template = resp;
    });
    this.tabset.select(this.tabId);
    
    console.log(this.template);
  }

  editTab(tab){
    this.info = false;
    this.infoMessage = '';
    this.error = false;
    this.errorMessage = '';
    this.editTabTrue = true;
    this.editDataTab = tab;
    this.applicationIdsArray = [];
    console.log('edit clicked:::' + JSON.stringify(tab));
    this.tabEditName = tab.tabName;
    this.tabForm = this.formBuilder.group({
      tabName: [tab.tabName, Validators.required],
      tabDescription: [tab.tabDescription, Validators.required]
    });
    this.addApplicaions(tab);
  }

  addApplicaions(tab){
    this.applicationIdsArray = [];
    this.applicationAdded = false;
    this.tabId = tab.tabId;   
    let applicationId:any;
    let applications = tab.applications;
    for (var j=0; j < JSON.stringify(applications).length; j++) {
      let application = applications[j];
      applicationId = application.applicationId; 
      this.applicationIdsArray.push(applicationId);
    }
    console.log(this.applicationIdsArray);
  }

  pushArray(applicationId) {
    this.info = false;
    this.infoMessage = '';
    this.error = false;
    this.errorMessage = '';
    this.applicationAdded = false;
    if(!this.applicationIdsArray.includes(applicationId)) {
        this.applicationIdsArray.push(applicationId);
        this.applicationAdded = true;
        this.isApplicationAlreadyAdded = false;
    } else {
      this.applicationIdsArray.splice(this.applicationIdsArray.indexOf(applicationId), 1);
      this.applicationAdded = false;
      this.isApplicationAlreadyAdded = true;
    }
    console.log(this.applicationIdsArray);
    console.log('add '+  this.applicationAdded) 
    console.log(this.isApplicationAlreadyAdded)   
  }

  addApps() {  
    this.info = false;
    this.infoMessage = '';
    this.error = false;
    this.errorMessage = '';
    let addApplication = true;
    console.log(this.applicationIdsArray.length == 0);
    console.log(this.applicationAdded)
    console.log(this.isApplicationAlreadyAdded)
    if(this.applicationIdsArray.length == 0){
      alert('Please select the application that you want to add.');
      this.applicationAdded = false;
      addApplication = false;
      return;
    } else if(this.applicationIdsArray.length != 0 && this.applicationAdded){
      this.applicationAdded = false;
      addApplication = true;
    } else if(this.applicationIdsArray.length != 0 && !this.applicationAdded && !this.isApplicationAlreadyAdded){
      alert('Please select the application that you want to add.');
      return;
    } 

    if(this.isApplicationAlreadyAdded) {
      this.info = true;
      this.infoMessage = 'Application are already added to tab.';
      this.applicationAdded = false;
    } else if(addApplication) {
      console.log('selected applications: ' + this.applicationIdsArray);
      let data = {'templateId': this.templateId, 'tabId': this.tabId, 'applicationsArray': this.applicationIdsArray};
      console.log(data);
      this.templateService.saveTemplateViewData(data).subscribe((resp)=>{     
        console.log('response from post data is ', resp);         
        this.info = true;
        this.enableApplicationIcon = true;
        this.infoMessage = 'Applications added successfully.';
      },(error)=>{
        console.log('status code post is ', error.status)
        if(error.status == 200){
          this.enableApplicationIcon = true;
          this.info = true;
          this.infoMessage = 'Applications added successfully.';
        } else {
          this.error = true;
          this.errorMessage = error.status + ': Server not found';
        }
      }); 
    }
    
  }

  loadApplications() {
    this.info = false;
    this.infoMessage = '';
    this.error = false;
    this.errorMessage = '';
    this.applicationIdsArray = [];
    this.applicationCategoryItems = this.applicationService.applicationCategories();
    console.log('loadApplications called....');
    this.applicationService.loadApplications()
    .subscribe((resp)=>{     
      console.log('response from post data is ', resp);         
      this.applications = resp;
    });
  }

  refreshApplications(value) {
    if(value == 0) {
      this.applicationService.loadApplications()
      .subscribe((resp)=>{     
        this.applications = resp;      
      });
    } else {
      this.applicationService.loadApplications()
      .subscribe((resp)=>{     
        this.applications = resp;      
        this.applications = this.applications.filter(d =>  {
          return d.applicationCategory == value;
        });
      });
    }

    this.applications = this.applications.filter(d =>  {
      return d.applicationCategory == value;
    });

  }

  pushAppDeleteArray(applicationId, tab) {
    if(!this.deleteApplicationIdsArray.includes(applicationId)) {
      this.deleteApplicationIdsArray.push(applicationId);
    } else {
      this.deleteApplicationIdsArray.splice(this.deleteApplicationIdsArray.indexOf(applicationId), 1);
    }
    this.applicationIdsArray = [];
    this.tabId = tab.tabId;  
    var applications = tab.applications;
    for (var j=0; j < JSON.stringify(applications).length; j++) {
      var application = applications[j];
      var applicationId = application.applicationId;
      this.applicationIdsArray.push(applicationId);
    }
  }

  setApplicationsAndMessage() {
    if(this.deleteApplicationIdsArray.length == 0){
      this.deletedApplicationName = 'Please select the applications to delete.';
      this.enableOKButton = true;
      this.disableYESNOButton = false;
      return;
    }

    if(this.deleteApplicationIdsArray.length > 0) {
      this.deletedApplicationName = 'Are you sure to remove application ?';
      this.enableOKButton = false;
      this.disableYESNOButton = true;
    }
    
  }

  removeApplicaions() {
    for(var i=0; i< this.deleteApplicationIdsArray.length; i++){
      this.applicationIdsArray.splice(this.applicationIdsArray.indexOf(this.deleteApplicationIdsArray[i]), 1);
    }
    let data = {'templateId': this.templateId, 'tabId': this.tabId, 'applicationsArray': this.applicationIdsArray};
    console.log(data); 
    this.templateService.saveTemplateViewData(data).subscribe((resp)=>{     
      console.log('response from post data is ', resp);         
      this.info = true;
      this.enableApplicationIcon = true;
      this.infoMessage = 'Applications removed successfully.';
      this.deleteApplicationIdsArray = [];
      this.reloadTab();
    },(error)=>{
      console.log('status code post is ', error.status)
      if(error.status == 200){
        this.enableApplicationIcon = true;
        this.info = true;
        this.infoMessage = 'Applications removed successfully.';
        this.deleteApplicationIdsArray = [];
        this.reloadTab();
      } else {
        this.error = true;
        this.errorMessage = error.status + ': Server not found';
      }
    });
  }

}
