import { Routes } from "@angular/router";
import { MessagesComponent } from "./components/messages/messages.component";
import { ChartsComponent } from "./components/charts/charts.component";
import { CompletedTasksComponent } from "./components/completed-tasks/completed-tasks.component";
import { MyTasksComponent } from "./components/my-tasks/my-tasks.component";
import { HomeComponent } from "./components/home/home.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";




export const adminRoutes : Routes =[
  {path:"", component:AdminDashboardComponent, children:[
    {
       path:"home", component:HomeComponent
    },
   
    {
       path:"", redirectTo:"/admin/home", pathMatch:"full" 
    },
  
    {
      path:"my-tasks", component:MyTasksComponent
    },
  
    {
       path:"completed-tasks",  component:CompletedTasksComponent,
    },
    {
     path:"analytics",  component:ChartsComponent,
  },
    {
      path:"messages",  component:MessagesComponent,
   },
  {
      path:"**", redirectTo:"/admin/home", pathMatch:"full" 
  },
  
  ]
  
  },
]