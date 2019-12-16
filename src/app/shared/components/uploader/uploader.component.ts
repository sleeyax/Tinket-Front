import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from '@environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from '@app/core/services/upload.service';
import { ToastService } from '@app/core/services/toast.service';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  @Output() uploaded = new EventEmitter<String>();
  uploadForm : FormGroup;
  pending = false;
  complete = false;
  fileName : String;

  constructor(
    private toastService : ToastService,
    private formBuilder: FormBuilder,
    private uploadService : UploadService
  ) { }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = event.target.files[0].name;
      this.uploadForm.get('video').setValue(file);
      this.onSubmit();
    }
  }

  onSubmit() {
    this.pending = true;
    this.complete = false;
    const formData = new FormData();
    formData.append('video', this.uploadForm.get('video').value);

    this.uploadService.upload(formData)
      .subscribe((res) => {
        this.awaitUploadComplete(res._id);
      });
  }

  awaitUploadComplete(uploadId) {
    setTimeout(() => {
      this.uploadService.checkStatus(uploadId)
        .subscribe((status) => {
          if(status.pending) return this.awaitUploadComplete(uploadId);
          this.singalUploadComplete(status.publicId);
        });
    }, 500);
  }

  singalUploadComplete(publicId) {
    this.complete = true;
    this.pending = false;
    this.uploaded.emit(publicId);
    this.toastService.toast('Uploaden gelukt!');
  }

  browse() {
    document.getElementById("video").click();
  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      video: ['']
    });
  }

}
