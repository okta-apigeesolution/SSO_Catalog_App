import { Component, OnInit } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
//import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute,Router } from '@angular/router';
import { authConfig } from './sso-config';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SoftlogueApp';
  loginUserName: any;
  roleVisibility: boolean;
  logoutUrl: any;
  loggedInFlag: boolean = true;
  constructor(private cookieService: CookieService, private oauthService: OAuthService, private router: Router){

    this.configureSingleSignon();
   
    

   
  }

  ngOnInit() {
    //this.logoutUrl = 'http://localhost:8080/app-profile-saml/userinfo?GLO=true'; 
	//  http://ec2-34-239-125-209.compute-1.amazonaws.com:8080/app-profile-saml/userinfo?GLO=true

   /* let userName = this.cookieService.get('loginUserName');
    userName = userName.replace(/"/g, "");
    console.log(userName);
    if(userName == '' 
        || userName == null
        || userName == undefined){
      this.cookieService.set('loginUserName', 'John Doe');
    } else {
      this.cookieService.set('loginUserName', userName);
    }
    this.loginUserName = this.cookieService.get('loginUserName');
*/
    // If false user role, If true admin login
   /* var sessionData = JSON.parse(sessionStorage.getItem('id_token_claims_obj'));
    //let role = this.cookieService.get('roleVisibility'); 
    let role = "";
    //role = role.replace(/"/g, "");
    alert(sessionData.email);
    if(sessionData.userType === "Admin"){
      role = "Admin";
    }else{
      role = null;
    }
   
    if(role == '' 
    || role == null
    || role == undefined || role == 'false'){
      this.roleVisibility = false;
      this.cookieService.set('roleVisibility', 'false'); 
    } else {
      this.roleVisibility = true;
      this.cookieService.set('roleVisibility', 'true'); 
    }*/
   //this.oauthService.initImplicitFlow();
  // this.gettoken();
   //this.oauthService.logOut();
   


  }
  
  deleteCookies() {
   // this.cookieService.deleteAll(); 
    this.oauthService.logOut();
  }

configureSingleSignon()
{
  

this.oauthService.configure(authConfig);
this.oauthService.tokenValidationHandler = new JwksValidationHandler();
//ssionStorage ses = new SessionStorage();
//alert(sessionStorage.getItem('id_token_claims_obj'))
//console.log("doc", this.oauthService.tokenValidationHandler);
this.oauthService.loadDiscoveryDocument().then(( doc) => { 
 // console.log(doc);
  
  this.oauthService.tryLogin().catch(err => { console.error(err)}).then(() => {

if(sessionStorage.getItem('id_token_claims_obj') === null){
  this.oauthService.initImplicitFlow();
 
 // this.loggedInFlag = false;
}
var sessionData = JSON.parse(sessionStorage.getItem('id_token_claims_obj'));
    //let role = this.cookieService.get('roleVisibility'); 
    let role = "";
    //role = role.replace(/"/g, "");
    //alert(sessionData.email);
    this.router.navigateByUrl('/applicationviews');
    if(sessionData.userType === "Admin"){
      role = "Admin";
    }else{
      role = null;
    }
   
    if(role == '' 
    || role == null
    || role == undefined || role == 'false'){
      this.roleVisibility = false;
      this.cookieService.set('roleVisibility', 'false'); 
    } else {
      this.roleVisibility = true;
      this.cookieService.set('roleVisibility', 'true'); 
    }

})
  
  
  
  
});


}

get givenName() {
  const claims = this.oauthService.getIdentityClaims();
  if (!claims) {
    return null;
  }
  return claims['name'];
}
}
