import { Component, OnInit, Inject } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../_models/user';
import { Post } from '../_models/post';
import { UserService } from '../_services';
import { ClassesService } from '../_services/classes.service';
import { Router } from '@angular/router';

@Component({ templateUrl: 'detail.component.html' })
export class DetailComponent implements OnInit {
    posts: Post[] = [];
    currentUser: User;
    newPostTitle: string;
    newPostDescription: string;
    classId: string;

    constructor(private router: Router, private classesService: ClassesService, private userService: UserService, public dialog: MatDialog) { }

    ngOnInit() {

        this.currentUser = this.userService.getCurrentUser();
        this.classId = this.router.url.split("/").pop();
        this.getPosts();

    }

    getPosts() {

        this.classesService.getClassPosts(this.classId).pipe(first()).subscribe(posts => {
            this.posts = posts;
        });
    }

    createPost() {
        let newPost: Post = {
            title: this.newPostTitle,
            classId: this.classId,
            text_body: this.newPostDescription
        }

        this.classesService.createClassPost(newPost).subscribe(createPostResult => {
            console.log('The server responder create post with', createPostResult);
            this.posts.push(createPostResult);
        });
    }

}

