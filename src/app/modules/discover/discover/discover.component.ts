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
  hammer : Hammer;
  infoShown = false;
  currentUser : User;
  assignments : Assignment[];
  currentIndex = 0;

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
    if(this.hasNextSlide) this.currentIndex++;
  }

  prev() {
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
