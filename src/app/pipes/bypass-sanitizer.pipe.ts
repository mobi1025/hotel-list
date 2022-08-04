import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'bypassSanitizer',
})
export class BypassSanitizerPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(innerHtml: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(innerHtml);
  }
}
