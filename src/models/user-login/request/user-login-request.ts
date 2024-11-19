export class UserLoginRequest {

    userName: string;
  
    password: string;
  
    constructor(data: Partial<UserLoginRequest> = {}) {
      this.userName = data.userName || '';
      this.password = data.password || '';
    }
  }
  