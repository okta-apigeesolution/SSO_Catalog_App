import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatetemplateComponent } from './views/createtemplate/createtemplate.component';
import { CreatessoapplicationComponent } from './views/createssoapplication/createssoapplication.component';
import { TemplatelistComponent } from './views/templatelist/templatelist.component';
import { ApplicationslistComponent } from './views/applicationslist/applicationslist.component';
import { ApplicationviewsComponent } from './views/applicationviews/applicationviews.component';
import { TemplatelistviewComponent } from './views/templatelistview/templatelistview.component';
import { TemplateeditviewComponent } from './views/templateeditview/templateeditview.component';

const routes: Routes = [
  {path: 'createtemplate', component: CreatetemplateComponent},
  {path: 'createssoapplication', component: CreatessoapplicationComponent},
  {path: 'templatelist', component: TemplatelistComponent},
  {path: 'applicationslist', component: ApplicationslistComponent},
  {path: 'applicationviews', component: ApplicationviewsComponent},
  {path: 'templateListView/:templateId', component: TemplatelistviewComponent},
  {path: 'templateEditView/:templateId', component: TemplateeditviewComponent}
  //{path : '', redirectTo: '/applicationviews', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
