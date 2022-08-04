import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'bypassSanitizer',
})
export class BypassSanitizerPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(innerHtml: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(innerHtml);
  }
}
