import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TestComponent } from './test.component';
import {ViewportSizeModule} from './viewport-size/viewport-size.module';
import {VIEWPORT_SIZE_CONFIG} from './viewport-size/viewport-size.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ViewportSizeModule ],
  declarations: [ AppComponent, HelloComponent, TestComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
    {
      provide: VIEWPORT_SIZE_CONFIG,
      useValue: {
        medium: 600,
        large: 900
      }
    }
  ],
})
export class AppModule { }
