import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    instgrm?: any;
  }
}

@Component({
  selector: 'app-instagram-view',
  standalone: true,
  imports: [],
  templateUrl: './instagram-view.component.html',
  styleUrls: ['./instagram-view.component.css']
})
export class InstagramViewComponent implements AfterViewInit {
  private readonly INSTAGRAM_SCRIPT_ID = 'instagram-embed-script';
  private readonly INSTAGRAM_SCRIPT_URL = 'https://www.instagram.com/embed.js';
  
  //Injections 
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadInstagramScript();
    }
  }

  private loadInstagramScript(): void {
    const existingScript = document.getElementById(this.INSTAGRAM_SCRIPT_ID);
    
    if (existingScript) {
      this.processInstagramEmbeds();
      return;
    }

    this.createAndLoadScript();
  }

  private createAndLoadScript(): void {
    const script = document.createElement('script');
    script.id = this.INSTAGRAM_SCRIPT_ID;
    script.src = this.INSTAGRAM_SCRIPT_URL;
    script.async = true;
    script.onload = () => this.processInstagramEmbeds();
    document.body.appendChild(script);
  }

  private processInstagramEmbeds(): void {
    if (window.instgrm?.Embeds) {
      window.instgrm.Embeds.process();
    }
  }
}
