import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponent } from './basic/basic.component';
import { ColumnGroupsComponent } from './column-groups/column-groups.component';
import { ColumnOrderingComponent } from './column-ordering/column-ordering.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    ColumnGroupsComponent,
    ColumnOrderingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
