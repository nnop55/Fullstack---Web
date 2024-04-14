import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { LoadingHelper } from '../functions/loading-helper';

export const LoadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn) => {
  const loadingService = inject(LoadingService)
  const mode = LoadingHelper.getMode(req.url)

  loadingService.showLoading(mode);

  return next(req).pipe(
    finalize(() => {
      loadingService.hideLoading(mode)
    })
  );
};
