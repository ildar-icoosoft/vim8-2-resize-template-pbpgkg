import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {distinctUntilChanged, map, startWith} from 'rxjs/operators';

export interface IViewportSizeConfig {
  medium: number;
  large: number;
}

export const VIEWPORT_SIZE_CONFIG = new InjectionToken<IViewportSizeConfig>('VIEWPORT_SIZE_CONFIG');

export type ViewportSize = 'small' | 'medium' | 'large';

@Injectable({
  providedIn: 'root'
})
export class ViewportSizeService {

  size$: Observable<ViewportSize>;

  constructor(@Optional() @Inject(VIEWPORT_SIZE_CONFIG) private config: IViewportSizeConfig) {
    this.size$ = fromEvent(window, 'resize').pipe(
      map(event => (event.currentTarget as Window).innerWidth),
      startWith(window.innerWidth),
      map(width => this.getSize(width)),
      distinctUntilChanged()
    );
  }

  private getSize(viewportWidth: number): ViewportSize {
    if (viewportWidth < this.config.medium) {
      return 'small';
    }
    if (this.config.medium <= viewportWidth && viewportWidth < this.config.large) {
      return 'medium';
    }
    return 'large';
  }
}
