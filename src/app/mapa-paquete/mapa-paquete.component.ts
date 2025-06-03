import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-mapa-paquete',
  templateUrl: './mapa-paquete.component.html',
  styleUrls: ['./mapa-paquete.component.css']
})
export class MapaPaqueteComponent implements OnChanges {
  @Input() mapsUrl: string = '';
  safeUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mapsUrl'] && this.mapsUrl) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapsUrl);
    }
  }
  }

  