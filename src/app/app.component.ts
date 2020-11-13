import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  SERVER_URL = "http://localhost:3000/upload";
  
  uploadForm: FormGroup;

  multipleUploadForm: FormGroup;

  json = {
    title: 'The Ring',
  }

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
    this.multipleUploadForm = this.formBuilder.group({
      files: this.formBuilder.array([])
    })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
    }
  }

  onFileMultipleSelect(event) {
    const files = event.target.files
    if(files.length > 0) {
      for(var i = 0; i < files.length; i++) {
        console.log(files[i])
        this.files.push(this.formBuilder.control(files[i]))
      }
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('single', this.uploadForm.value.file);
    formData.append('metadata', JSON.stringify(this.json))
    this.json['file'] = this.uploadForm.value.file
    this.httpClient.post<any>(`${this.SERVER_URL}/single`, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  onSubmitMultiple() {
    const formData = new FormData();
    this.files.value.forEach(file => {
      formData.append('multiple', file) 
    });
    this.httpClient.post<any>(`${this.SERVER_URL}/multiple`, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  get files() {
    return this.multipleUploadForm.get('files') as FormArray
  }
}
