export class UserLoginResponse {
    id: number;
    fullName: string;
    userName: string;
    token: string;
    role: string;
    
    constructor(data: Partial<UserLoginResponse> = {}) {
        this.id = data.id || 0;
        this.userName = data.userName || '';
        this.fullName = data.fullName || '';
        this.token = data.token || '';
        this.role = data.role || '';
      }
}