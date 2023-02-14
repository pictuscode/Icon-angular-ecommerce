import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(public http: HttpClient) { }

    Savedata(dataToSend) {
        var url = "192.168.0.121:5003/api/logincheck";
        return this.http.post
            (
                url,
                dataToSend,
                {
                    headers: new HttpHeaders(
                        { "content-Type": "application/json" }
                    )
                }
            );
    }
}