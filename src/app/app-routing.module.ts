import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoadPageComponent} from './load-page/load-page.component';
import {TablePageComponent} from './table-page/table-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {UnloadPageComponent} from './unload-page/unload-page.component';


const routes: Routes = [
  {path: '', component: LoadPageComponent, pathMatch: 'full'},
  {path: 'table', component: TablePageComponent},
  {path: 'edit/:id', component: EditPageComponent},
  {path: 'unload', component: UnloadPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
