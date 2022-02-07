import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  minutes: number = 0;
  seconds: number = 0;
  interval: any;
  days: number = 0;
  hours: number = 0;
  visibility: any = "hidden"
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {


    var n = new Date(Date.now());

    // ------------minutes 10 ------------

    var countdownMinutes = new Date(n.getFullYear(), n.getMonth(), n.getDate(),
      n.getHours(), n.getMinutes() + 10 , n.getSeconds(), n.getMilliseconds());

    // ------------hours 3 -------------

    // var countdowngetHours = new Date(n.getFullYear(), n.getMonth(), n.getSeconds(),
    //n.getHours() + 3, n.getMinutes(), n.getSeconds(), n.getMilliseconds());


    var cookie = this.cookieService.get('name')

    if (cookie) {
      countdownMinutes = new Date(cookie)
    } else {
      this.cookieService.set('name', countdownMinutes.toString())
    }
    this.startTimer(countdownMinutes)
  }

  startTimer(countdownMinutes: Date) {

    this.interval = setInterval(() => {

      var distance = countdownMinutes.getTime() - Date.now();
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance <= -1) {
        this.minutes = 0
        this.seconds = 0
        this.hours = 0
        clearInterval(this.interval);
        this.cookieService.delete('name')
      }
    }, 1000)
  }
}
