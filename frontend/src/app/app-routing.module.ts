import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AceEditorComponent } from './pages/ace-editor/ace-editor.component';
const routes: Routes = [{
  path: "",
  component: AceEditorComponent,
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
