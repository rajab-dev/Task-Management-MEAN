


export class GetAllTasks{
  static readonly type = '[Tasks] Get'
}

export class AddTask{
    static readonly type = '[Tasks] Add'
    constructor(public payload:any){}
}

export class UpdateTask{
   static readonly type = '[Tasks] Update'
   constructor(public id:string){}
}

export class DeleteTask{
  static readonly type = '[Tasks] Delete'
  constructor(public id:string){}
}

export class EditTask{
  static readonly type = '[Tasks] Edit'
  constructor(public id:string, public payload:any){}
}


export class GetProfile {
    static readonly type = '[tasks] Get Profile'
}

export class GetAdminDashboard {
    static readonly type = '[tasks] Get Admin Dashboard'
}

export class HandleUserRole {
  static readonly type = '[tasks] Handle User Role'
  constructor(public role:any, public id:any){}
}

export class HandleDeleteUser {
  static readonly type = '[tasks] Handle User Role'
  constructor(public id:any){}
}

export class LogoutUser {
    static readonly type = '[tasks] Logout User'
}

export class SendMessage {
  static readonly type = '[tasks] Send Message'
  constructor(public payload:any){}
}