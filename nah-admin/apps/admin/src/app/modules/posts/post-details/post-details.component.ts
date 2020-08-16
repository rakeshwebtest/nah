import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppHttpClient } from '../../../utils/app-http-client.service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'theapp-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  providers: [ConfirmationService]
})
export class PostDetailsComponent implements OnInit {
  imgList = [];
  videoList = [];
  commentsList = [];
  postId = 0;
  post: any = {};
  constructor(private appHttp: AppHttpClient, 
    private activeRouter: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.postId = this.activeRouter.snapshot.params.id;
    this.imgList = [     
    ];
    this.videoList = [    
    ];
    this.commentsList = [
      
    ];
    this.getPostDetails();
  }

  getPostDetails() {
    const payload: any = { id: this.postId };
    this.appHttp.get('posts/'+this.postId).subscribe(res => {
      if(res.data) {
        this.post = res.data;
      }
      console.log('this.post --->', this.post);
    });
  }
  deleteImage(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.appHttp.delete('posts/photo/'+id).subscribe(res => {
          //if(res.data) {
            this.getPostDetails();
          // }
        });
      }
    })
  }
  deleteVideo(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.appHttp.delete('posts/video/'+id).subscribe(res => {
          //if(res.data) {
            this.getPostDetails();
          // }
        });
      }
    })
  }
  deleteComment(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.appHttp.delete('posts/comment/'+id).subscribe(res => {
          // if(res.data) {
            this.getPostDetails();
          // }
        });
      }
    })
  }
  // confirm(id) {
  //   this.confirmationService.confirm({
  //       message: 'Are you sure that you want to perform this action?',
  //       accept: () => {
  //           this.deleteComment(id);
  //       }
  //   });
  // }

}
