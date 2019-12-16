import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Plyr from 'plyr';
import Hammer from 'hammerjs';
import { Assignment } from '@app/shared/models/assignment';
import { AssignmentService } from '@app/core/services/assignment.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { User } from '@app/shared/models/user';
import { ToastService } from '@app/core/services/toast.service';
import { ApplicationService } from '@app/core/services/application.service';
import { Application } from '@app/shared/models/application';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscoverComponent implements OnInit {
  applying = false;
  applicationSuccessful = false;
  player : Plyr;
  hammerContent : Hammer;
  hammerDetail : Hammer;
  infoShown = false;
  currentUser : User;
  assignments : Assignment[];
  currentIndex = 0;
  flagged = false;
  applications : Application[];

  constructor(
    private applicationService : ApplicationService,
    private assignmentService : AssignmentService,
    private authenticationService : AuthenticationService,
    private toastService: ToastService
  ) {
    authenticationService.currentUser
      .subscribe((user) => this.currentUser = user );

    assignmentService.getUserRecommended(this.currentUser._id)
      .subscribe((recommended) => this.assignments = recommended);

    this.applicationService.getMyApplications()
      .subscribe((applications) => this.applications = applications);
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

  get hasApplied() : Boolean {
    if(!this.applications || !this.currentAssignment) return false;
    const application = this.applications.find((application) => {
      return application.assignment._id === this.currentAssignment._id;
    });
    return application ? true : false;
  }

  next() {
    this.flagged = false;
    if(this.hasNextSlide) this.currentIndex++;
    this.resetVideoSource();
    this.player.play();
  }

  prev() {
    this.flagged = false;
    if(this.hasPrevSlide) this.currentIndex--;
    this.resetVideoSource();
    this.player.play();
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
    this.assignmentService.flagAssignment(this.currentAssignment._id).subscribe(() => this.toastService.toast("Opdracht gerapporteerd!"))
  }

  apply() {
    this.applying = true;
    this.applicationService.applyForAssignment(this.currentAssignment._id)
      .subscribe(() => {
        this.applying = false;
        this.applicationSuccessful = true;
      })
  }

  resetVideoSource() {
    if(!this.currentAssignment) return;
    this.player.source = {
      type: 'video',
      title: 'Example title',
      sources: [
          {
              src: this.currentAssignment.videoUrl || '',
              type: 'video/mp4',
              size: 720,
          },
      ],
      poster: '../../../../assets/poster.png',
    };
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
