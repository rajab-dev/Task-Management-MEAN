import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../components/form-dialog/form-dialog.component';
import { Store } from '@ngxs/store';
import { EditTask, SendMessage } from '../store/actions/tasks.actions';
import { TasksService } from '../services/tasks.service';
import { TaskEventService } from '../services/task-event.service';


@Directive({
  selector: '[appCustomDialogForm]',
  standalone:true,
})
export class CustomDialogFormDirective {

  @Input() fields!: Array<{ name: string, placeholder: string, value: any }>;
  @Input() dialogTitle!: string;
  @Input() dialogType!:string;
  @Input() dialogIcon!:string;
  @Input() dialogIconColor!:string;
  @Input() dialogId!:string;

  @Output() formSubmit = new EventEmitter<any>(); // Output event
  constructor(private dialog: MatDialog, private store:Store, private task: TasksService, private taskEventService:TaskEventService) { }

  @HostListener("click", ['$event']) onClick() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        fields: this.fields, 
        title: this.dialogTitle,
        type:this.dialogType,
        icon:this.dialogIcon,
        iconColor:this.dialogIconColor,
        id:this.dialogId,
      },
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.action === "submit") {
        console.log("Form submitted with data: ", res.data);

        if(this.dialogType==="SEND_MESSAGE_TO_ADMIN"){
            console.log("in contact admin => ", res.data)
            this.store.dispatch(new SendMessage(res.data))

        }else if(this.dialogType === "EDIT_USER_TASK"){
            console.log("in edit task => ", this.dialogId, res.data)
            //  this.store.dispatch(new EditTask(this.dialogId, res.data))
            this.task.editTask(this.dialogId, res.data).subscribe(
              (res:any) => {
                this.formSubmit.emit(res)
              },
              (error) => {
                console.log("error ", error);
              }
            )

        }else if(this.dialogType === "ADD_TASK"){
          this.task.addTask(res.data).subscribe(
            (res:any) => {
              this.taskEventService.emitTaskAdd(res)
            },
            (error) => {
              console.log("error ", error);
            }
          )
        }

      } else {
        console.log("Form submission canceled");
      }
    });
  }
}


