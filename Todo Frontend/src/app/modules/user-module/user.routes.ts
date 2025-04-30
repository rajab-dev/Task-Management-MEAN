import { Routes } from "@angular/router";
import { UserContainerComponent } from "./components/user-container/user-container.component";
import { AddTaskComponent } from "./components/add-task/add-task.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";



export const userRoutes: Routes = [
  {path:"", component:UserContainerComponent, children:[
    {path:"home", component:AddTaskComponent},
    {path:"profile", component:ProfileComponent},
    {path:"", redirectTo:"/user/home", pathMatch:"full"},
  ]},
  {path:"edit-profile", component: EditProfileComponent},
  {path:"change-password", component: ChangePasswordComponent},
    {path:"**", redirectTo:"/user/home", pathMatch:"full"},

];