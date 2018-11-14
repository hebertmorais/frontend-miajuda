import { Component, OnInit, Inject } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../_models/user';
import { Class } from '../_models/class';
import { UserService } from '../_services';
import { ClassesService } from '../_services/classes.service';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    users: User[] = [];
    classes: Class[] = [];
    name: string;
    students: string;
    monitors: string;
    currentUser: User;

    constructor(private router: Router, private classesService: ClassesService, private userService: UserService, public dialog: MatDialog) { }

    ngOnInit() {

        this.currentUser = this.userService.getCurrentUser();


        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
            for (let user of users) { //gambiarra pra pegar id
                console.log(user.email, this.currentUser.email);

                if (user.email == this.currentUser.email) {
                    this.currentUser = user;
                }
            }
            console.log("usuarios do sistema", users, this.users);
        });

        this.classesService.getClasses().pipe(first()).subscribe(classes => {
            this.classes = classes;
            console.log("classes do sistema", classes, this.classes);
        });
        console.log("current user", this.currentUser);

    }

    getClassToken(classData: Class) {
        this.dialog.open(ShowTokenDialog, {
            width: '350px',
            data: { class: classData, user: this.currentUser }
        });
    }

    openDetails(classData: Class) {
        console.log("class clicked", classData);
        this.router.navigate(['classDetails/' + classData._id]);
    }

    deleteClass(classData: Class) {
        console.log("delete class", classData);
        this.classesService.deleteClass(classData._id).subscribe(deleteClassResult => {
            console.log('The server responder delete class with', deleteClassResult);
            for (let i = 0; i < this.classes.length; i++) {
                if (this.classes[i]._id == classData._id) {
                    this.classes.splice(i, 1);
                }
            }
            //this.classes.push(deleteClassResult.class);
        });
    }

    editClass(classData: Class) {
        this.openDialog(classData);
    }


    openDialog(classData?: Class): void {
        let dialogData: any = { name: "", students: "", monitors: "", action: "Criar" }; 

        if (classData){
            dialogData = Object.assign({}, classData);
            dialogData.action = "Editar";

        }

        const dialogRef = this.dialog.open(CreateClassDialogComponent, {
            width: '550px',
            data: dialogData
        });

        dialogRef.afterClosed().subscribe(createClassDialogData => {
            console.log('The dialog was closed with data', createClassDialogData);
            let monitors_email;
            console.log("monitors email", createClassDialogData.monitors);

            if (createClassDialogData.monitors) {
                if (createClassDialogData.monitors instanceof Array)
                    monitors_email = createClassDialogData.monitors;
                else
                    monitors_email = createClassDialogData.monitors.split(",");
            }


            let postData: Class = {
                _id: classData._id || "",
                teacherId: this.currentUser._id,
                name: createClassDialogData.name,
                students: [],
                monitors: monitors_email,
                office_hours: createClassDialogData.office_hours,
                info: createClassDialogData.info,
                number: createClassDialogData.number,
                schedule: createClassDialogData.schedule,
                semester: createClassDialogData.semester

            }

            if (classData) {
                console.log('outgoing edit class with', postData);

                this.classesService.editClass(postData).subscribe(editClassResult => {
                    console.log('The server responder edit class with', editClassResult);
                    for (let i = 0; i < this.classes.length; i++) {
                        if (this.classes[i]._id == classData._id) {
                            this.classes[i] = editClassResult;
                        }
                    }
                });
            }
            else {
                this.classesService.createClass(postData).subscribe(createClassResult => {
                    console.log('The server responder create class with', createClassResult);
                    this.classes.push(createClassResult.class);
                });
            }
        });
    }

}

@Component({
    selector: 'create-class-popup',
    templateUrl: 'create-class-popup.html',
    styleUrls: ['create-class-popup.css'],

})
export class CreateClassDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<CreateClassDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Class) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    createClass(): void {
        console.log("data", this.data);
        this.dialogRef.close(this.data);
    }

}
@Component({
    selector: 'class-token-popup',
    templateUrl: 'class-token-popup.html',
    styleUrls: ['class-token-popup.css'],

})
export class ShowTokenDialog implements OnInit {

    token: string;
    loading = true;

    constructor(
        public dialogRef: MatDialogRef<ShowTokenDialog>,
        private classesService: ClassesService,
        @Inject(MAT_DIALOG_DATA) public data: any

    ) { }

    ngOnInit() {
        this.token = this.data.class.code;
        this.loading = false;
        /*
        this.classesService.getClassToken(this.data.class, this.data.user).pipe(first()).subscribe(tokenResponse => {
            this.token = tokenResponse.token;
            this.loading = false;
        });*/
    }


}
