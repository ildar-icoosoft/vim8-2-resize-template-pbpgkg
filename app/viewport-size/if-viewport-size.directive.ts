import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {ViewportSize, ViewportSizeService} from './viewport-size.service';
import {combineLatest, Subject} from 'rxjs';

@Directive({
  selector: '[ifViewportSize]'
})
export class IfViewportSizeDirective {

  private sizeCondition$: Subject<ViewportSize> = new Subject<ViewportSize>();

  @Input() set ifViewportSize(size: ViewportSize) {
    this.sizeCondition$.next(size);
  }

  constructor(
    template: TemplateRef<any>,
    viewContainer: ViewContainerRef,
    viewportSizeService: ViewportSizeService) {

    combineLatest([this.sizeCondition$, viewportSizeService.size$])
      .subscribe(([sizeCondition, viewportSize]) => {
        if (sizeCondition === viewportSize) {
          viewContainer.createEmbeddedView(template);
        } else {
          viewContainer.clear();
        }
      });
  }

}
