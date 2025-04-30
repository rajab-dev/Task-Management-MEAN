import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../components/custom-dialog/custom-dialog.component';
import { Store } from '@ngxs/store';
import { DeleteTask, HandleDeleteUser, LogoutUser, UpdateTask } from '../store/actions/tasks.actions';


@Directive({
  selector: '[appDialog]',
  standalone:true
})
export class DialogDirective {

  @Input() dialogType!:string;
  @Input() dialogTitle!:String;
  @Input() dialogDescription!:String;
  @Input() dialogIcon?:String;
  @Input() dialogIconColor?:String;
  @Input() dialogTitleColor?:string;
  @Input() dialogId?:any;
  @Input() dialogBtnColor!:string;
  constructor(private dialog:MatDialog, private store:Store, private el:ElementRef) { 
    
  }

  @HostListener("click", ['$event']) onClick (event:MouseEvent){

    // console.log("event target: ", event.target)
    // console.log("element ref: ", this.el.nativeElement)
      if( event.target === this.el.nativeElement || this.el.nativeElement.contains(event.target) ){
     event.preventDefault()
      event.stopPropagation()
      const dialogRef = this.dialog.open(CustomDialogComponent,{
        data:{
          title:this.dialogTitle,
          description:this.dialogDescription,
          icon:this.dialogIcon,
          color:this.dialogIconColor,
          titleColor:this.dialogTitleColor,
          type:this.dialogType,
          id:this.dialogId,
          btnColor:this.dialogBtnColor,
        }
      })
    
      dialogRef.afterClosed().subscribe(res =>{
         if(res === "ok"){
          console.log("ok clicked => type => ", this.dialogType)
          if(this.dialogType === "ADMIN_DELETE_USER"){
              console.log("here is the id::", this.dialogId)
              this.store.dispatch(new HandleDeleteUser(this.dialogId))
          }else if(this.dialogType === "USER_DELETE_TASK"){
               console.log("from user delete task!!!", this.dialogId)
               this.store.dispatch(new DeleteTask(this.dialogId))
          }else if(this.dialogType === 'LOGOUT_USER'){
              console.log("user logout called!!!", this.dialogId)
              this.store.dispatch(new LogoutUser())
          }else if(this.dialogType === "USER_TASK_DONE"){
            console.log("user update task id::", this.dialogId)
            this.store.dispatch(new UpdateTask(this.dialogId))
          }
         }else{
             console.log("canceled!!!")
         }  
      })
  }

}

}
