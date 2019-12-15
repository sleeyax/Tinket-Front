import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Plyr from 'plyr';
import Hammer from 'hammerjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscoverComponent implements OnInit {
  player : Plyr;
  hammer : Hammer;
  infoShown = false;

  restart() {
    this.player.restart();
  }

  mute() {
    this.player.muted = true;
  }

  unmute() {
    this.player.muted = false;
  }

  revealContent() {
    this.infoShown = true;
    this.mute();
  }

  constructor() { }

  ngOnInit() {
    this.player = new Plyr('#player', {
      controls: [],
      autoplay: true,
      muted: true,
      volume: 1000,
      loop: {
        active: true
      },
    });

    this.hammer = new Hammer(
      document.querySelector('.content'),
      { }
    );

    this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    this.hammer.on('swipeup', (e) => {
      this.revealContent();
    });

  }

}
