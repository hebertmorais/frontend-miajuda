import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Class } from '../_models/class';
import { User } from '../_models';
import { Post } from '../_models/post';

@Injectable({ providedIn: 'root' })
export class ClassesService {
    constructor(private http: HttpClient) { }

    createClass(classData: Class) {
        return this.http.post<any>(`${config.apiUrl}/classes`, classData)
            .pipe(map(createClassResponse => {
                return createClassResponse;
            }));
    }

    getClasses() {
        return this.http.get<any>(`${config.apiUrl}/classes`)
            .pipe(map(getClassesResponse => {
                return getClassesResponse;
            }));
    }

    getClassPosts(classId: string) {
        return this.http.get<any>(`${config.apiUrl}/classes/posts/` + classId)
            .pipe(map(getClassPostsResponse => {
                return getClassPostsResponse;
            }));
    }

    createClassPost(postData: Post) {

        return this.http.post<any>(`${config.apiUrl}/posts`, postData)
            .pipe(map(createPostResponse => {
                return createPostResponse;
            }));
    }

    editClass(classData: Class) {

        return this.http.put<any>(`${config.apiUrl}/classes/` , classData)
            .pipe(map(editClassResponse => {
                return editClassResponse;
            }));
    }

    deleteClass(classId: string) {

        return this.http.delete<any>(`${config.apiUrl}/classes/` + classId, {})
            .pipe(map(deleteClassResponse => {
                return deleteClassResponse;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getClassToken(classData: Class, teacher: User) {
        let teacherData = teacher;
        teacherData.role = "professor"; //gambiarra
        return this.http.post<any>(`${config.apiUrl}/users/generateToken`, { user: teacherData, class: classData })
            .pipe(map(tokenResponse => {
                return tokenResponse;
            }));
    }
}