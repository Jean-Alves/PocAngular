export class LocalStorageShared {

  public getUser() {
    var user = localStorage.getItem('threeo.user');
    if(user===null){
      return "";
    }
      return JSON.parse(user);
  }

  public saveLocalUser(response: any) {
      this.saveTokenUser(response.accessToken);
      this.saveUser(response.userToken);
  }

  public clearUser() {
      localStorage.removeItem('threeo.token');
      localStorage.removeItem('threeo.user');
  }

  public getTokenUser(): string {

    var token = localStorage.getItem('threeo.token');
    if(token===null){
      return "";
    }

    return token;
  }

  public saveTokenUser(token: string) {
      localStorage.setItem('threeo.token', token);
  }

  public saveUser(user: string) {
      localStorage.setItem('threeo.user', JSON.stringify(user));
  }

}
