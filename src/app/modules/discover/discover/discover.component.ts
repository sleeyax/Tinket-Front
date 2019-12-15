import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Plyr from 'plyr';
import Hammer from 'hammerjs';
import { Assignment } from '@app/shared/models/assignment';
import { AssignmentService } from '@app/core/services/assignment.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { User } from '@app/shared/models/user';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscoverComponent implements OnInit {
  player : Plyr;
  hammerContent : Hammer;
  hammerDetail : Hammer;
  infoShown = false;
  currentUser : User;
  assignments : Assignment[];
  currentIndex = 0;
  flagged = false;

  constructor(
    private assignmentService : AssignmentService,
    private authenticationService : AuthenticationService
  ) {
    authenticationService.currentUser
      .subscribe((user) => this.currentUser = user );

    assignmentService.getUserRecommended(this.currentUser._id)
      .subscribe((recommended) => this.assignments = recommended);
  }

  get currentAssignment() : Assignment {
    if(!this.assignments || this.assignments.length <= 0) return null;
    return this.assignments[this.currentIndex];
  }

  get hasNextSlide() : Boolean {
    if(!this.assignments) return false;
    return (this.currentIndex + 1) < this.assignments.length;
  }

  get hasPrevSlide() : Boolean {
    return this.currentIndex > 0;
  }

  next() {
    this.flagged = false;
    if(this.hasNextSlide) this.currentIndex++;
  }

  prev() {
    this.flagged = false;
    if(this.hasPrevSlide) this.currentIndex--;
  }

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

  hideContent() {
    this.infoShown = false;
    this.unmute();
  }

  flag() {
    this.flagged = true;
  }

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

    this.hammerContent = new Hammer(
      document.querySelector('.content'),
      { }
    );

    this.hammerContent.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    this.hammerContent.on('swipeup', (e) => { this.revealContent(); });

    this.hammerDetail = new Hammer(
      document.querySelector('.detail'),
      { }
    );

    this.hammerDetail.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    this.hammerDetail.on('swipedown', (e) => { console.log("down"); this.hideContent(); });

  }

}
