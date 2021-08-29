import { ComponentsModule } from './components/components.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from './services/services.module';
import { ApiService } from './services/api/api.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    ServicesModule,
  ],
  exports: [
    ComponentsModule,
    ServicesModule,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [ApiService,],
    };
}
}
