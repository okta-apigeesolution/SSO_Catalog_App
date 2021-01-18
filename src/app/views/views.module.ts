import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import { NgbTabsetModule, NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreatetemplateComponent } from './createtemplate/createtemplate.component';
import { AppRoutingModule } from '../app-routing.module';
import { CreatessoapplicationComponent } from './createssoapplication/createssoapplication.component';
import { TemplatelistComponent } from './templatelist/templatelist.component';
import { ApplicationslistComponent } from './applicationslist/applicationslist.component';
import { ApplicationviewsComponent } from './applicationviews/applicationviews.component';
import { TemplatelistviewComponent } from './templatelistview/templatelistview.component';
import { TemplateeditviewComponent } from './templateeditview/templateeditview.component';
import { TemplateGrdFilter } from '../services/template-grd-filter.pipe';
import { ApplicationGrdFilter } from '../services/application-grd-filter.pipe';

@NgModule({
  declarations: [
    CreatetemplateComponent,
    CreatessoapplicationComponent,
    TemplatelistComponent,
    ApplicationslistComponent,
    ApplicationviewsComponent,
    TemplatelistviewComponent,
    TemplateeditviewComponent,
    TemplateGrdFilter,
    ApplicationGrdFilter
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgbTabsetModule
  ],
  exports :[TemplateGrdFilter,ApplicationGrdFilter],
  providers:[NgbTabset]
})
export class ViewsModule { }
