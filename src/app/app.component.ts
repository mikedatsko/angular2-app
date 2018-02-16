import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  ngOnInit() {
    const url: any = new URL(document.location.href);
    window.parent.postMessage('FRAME_LOADED', url.searchParams.get('host_url') || 'http://jsmeasure.surge.sh');
  }
}
