import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AceEditorComponent } from './ace-editor/ace-editor.component';

import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AceEditorComponent
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    NbSpinnerModule,
    FormsModule
  ]
})
export class PagesModule { }
