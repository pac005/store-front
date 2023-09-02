import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { fromEvent, Subject } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

remail: string = "";
email: string = "";
rpassword: string = "";
repassword: string = "";
password: string = "";
name: string = "";
data: any = "";
uemail: any = "";
oldpassword: any = "";
newpassword: any = "";

constructor(private http: HttpClient, private storage:SessionStorageService )
  {
    // this.getAllPatients();
  }

  private unsubscriber : Subject<void> = new Subject<void>();

checkUserExists()
{
  
  if(!this.remail.trim() || !this.name.trim() || !this.rpassword.trim() || !this.repassword.trim())
  {
    document.getElementById('registerspan')!.innerHTML = "Please fill out all Fields"
    return;
  }
  let url = "http://localhost:8084/api/v1/storeUser/getUser/" + this.remail
  this.http.get(url).subscribe((resultData: any)=>
  {
      this.data = resultData;
      if(!resultData){
      this.register();}
      else
      {
        document.getElementById('registerspan')!.innerHTML = "User Already Exists"
      }
  });
}
 
register()
  {
    document.getElementById('registerspan')!.innerHTML = ""
    if(this.rpassword != this.repassword){
      document.getElementById('registerspan')!.innerHTML = "Passwords do not Match"
      return;
    }

    var temp: String = this.name.trim()
    const firstLetter = temp.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = temp.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters

    let bodyData = {
      "emailid" : this.remail.trim(),
      "password" : this.rpassword.trim(),
      "fullname" : capitalizedWord
    };
 
    this.http.post("http://localhost:8084/api/v1/storeUser/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
      document.getElementById('registerspan')!.innerHTML = "User Registered!"
        this.remail = '';
        this.rpassword = '';
        this.repassword = '';
        this.name = '';

    });

  }
 
  save()
  {
        this.register(); 
  }

  getUserInfo()
  {
    let url = "http://localhost:8084/api/v1/storeUser/getUser/" + this.email

    if(this.email && this.password){
    this.http.get(url).subscribe((resultData: any)=>
    {
      if(resultData!=null)
      {
          if(resultData.emailid === this.email && resultData.password === this.password)
          {
            this.email = '';
            this.password = '';
            this.storage.store("username",resultData.fullname)
            window.location.href = "/storepage"
            document.getElementById('loginspan')!.innerHTML = "Login Successful"
          }
          else
          {
            document.getElementById('loginspan')!.innerHTML = "Incorrect Password"
          }
      }
      else
      {
        document.getElementById('loginspan')!.innerHTML = "Check Email and Password"
      }
        

    });}

    else
    {
      document.getElementById('loginspan')!.innerHTML = "Please fill out all Fields"
    }

  }

  updatePassword()
  {
    if(this.newpassword===this.oldpassword)
    {
      document.getElementById('updatespan')!.innerHTML = "New Password cannot be the same as Old"
      return
    }
    if(this.uemail && this.oldpassword && this.newpassword){
    let url = "http://localhost:8084/api/v1/storeUser/updatePassword/" + this.uemail +"/"+this.oldpassword+"/"+this.newpassword

    this.http.get(url).subscribe((resultData: any)=>{     
      if(resultData==true)
      {
        document.getElementById('updatespan')!.innerHTML = "Password Updated"
        this.uemail = "";
        this.oldpassword = "";
        this.newpassword = "";
      }
      else{
        document.getElementById('updatespan')!.innerHTML = "Check Email/Old Password"
      }
    }

    );
  }
  else{
    document.getElementById('updatespan')!.innerHTML = "Please fill out all Fields"
  }
}


}
