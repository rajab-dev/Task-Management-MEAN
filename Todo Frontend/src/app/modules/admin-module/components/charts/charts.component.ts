import { ChangeDetectorRef, Component } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';
import { AdminService } from '../../../../services/admin.service';
import { ChartData, ChartOptions, Chart, registerables, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective, MatFormFieldModule, MatInputModule, MatOptionModule,MatSelectModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {
     
  response:any;
  constructor(private taskService:TasksService, private admin:AdminService, private cdr:ChangeDetectorRef){}

  totalTasks=0;
  completedTasks:any;
  inCompletedTasks=0;
  allUsers:any
  selectedUser = "khan"
  chartType:ChartType = "doughnut"

  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Total Tasks',
        data: [],
        backgroundColor: '#42A5F5'
      },
      {
        label: 'Completed Tasks',
        data: [],
        backgroundColor: '#66BB6A'
      },
      {
        label: 'Incomplete Tasks',
        data: [],
        backgroundColor: '#EF5350'
      }
    ]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Users'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Tasks'
        }
      }
    }
  };


  chartDataTotal: ChartData<"doughnut"> = {
    labels: ['Total Tasks', 'Total Completed Tasks', 'Total Incomplete Tasks'],
    datasets: [
      {
        label: 'Tasks',
        data: [0, 0, 0],
        backgroundColor: ['#4caf50', '#f44336', '#ffeb3b']
      }
    ]
  };

  chartOptionsTotal: ChartOptions = {
    responsive: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        anchor: 'center',
        align: 'center',
        // formatter: (value:any, context:any) => {
        //   const total = context.chart.data.datasets[0].data.reduce((a:any, b:any) => a + b, 0);
        //   const percentage = ((value / total) * 100).toFixed(2) + '%';
        //   return `${value} (${percentage}) (${total})`;
        // },
      },
    }
  }


  chartDataSpecific: ChartData<"bar"> = {
    labels: ['Total Tasks', 'Total Completed Tasks', 'Total Incomplete Tasks'],
    datasets: [
      {
        label: 'Tasks',
        data: [0, 0, 0],
        backgroundColor: ['#4caf50', '#f44336', '#ffeb3b']
      }
    ]
  };

  chartOptionsSpecific: ChartOptions = {
    responsive: true,
    // aspectRatio: 2,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }



  ngOnInit(){

  this.loadChartData();
  this.loadSpecificUser(this.selectedUser)

  }


  loadChartData(){
    let users:any
    this.admin.getAllUsers().subscribe((res) => {
      this.response = res;
        users = this.response.users;

        let totalTasks = 0;
        let totalCompletedTasksArray :any[] = [];
        let totalCompletedTasks = 0;

        this.allUsers = users.map((user:any) => user.username)

        console.log("all usernames =>", this.allUsers)

       users.forEach((user:any) => {
             totalTasks = totalTasks + user.tasks.length;
       })

        users.forEach((user:any) => {
              let completedTasksOfSingleUser = user.tasks.filter((task:any) => {
                       return task.isCompleted === true
                })
                totalCompletedTasksArray.push(completedTasksOfSingleUser)
       })


       totalCompletedTasksArray.forEach((array:any) => {
             totalCompletedTasks = totalCompletedTasks + array.length
       })
       console.log("Total Completed =>", totalCompletedTasks )

       let totalInCompletedTasks = totalTasks - totalCompletedTasks;

        const userChartData = users.map((user:any) => {
          const totalTasks = user.tasks.length;
          const completedTasks = user.tasks.filter((task:any) => task.isCompleted).length;
          const incompleteTasks = totalTasks - completedTasks;
    
          return {
            name: user.username,
            totalTasks,
            completedTasks,
            incompleteTasks
          };
        });


        // userChartData.map((user:any)=> console.log("user chart data =>", user))

        this.chartData.labels = userChartData.map((user:any) => user.name);
        this.chartData.datasets[0].data = userChartData.map((user:any) => user.totalTasks);
        this.chartData.datasets[1].data = userChartData.map((user:any) => user.completedTasks);
        this.chartData.datasets[2].data = userChartData.map((user:any) => user.incompleteTasks);
        

        this.chartDataTotal.datasets[0].data = [totalTasks, totalCompletedTasks, totalInCompletedTasks]

        this.chartDataTotal = {
          labels: ['Total Tasks', 'Total Completed Tasks', 'Total Incomplete Tasks'],
          datasets: [
            {
              label: 'Tasks',
              data: [totalTasks, totalCompletedTasks, totalInCompletedTasks],
              backgroundColor: ['#4caf50', '#f44336', '#ffeb3b']
            }
          ]
        };
      

  })

  }

  loadSpecificUser(userToFind:any){
      this.admin.getAllUsers().subscribe((res) => {
           this.response = res
          let specificUser = this.response.users.filter((user:any) => {
                return user.username === userToFind
           })

           let totalTasksOfSpecificUser = 0;
           console.log("data of specific user =>", specificUser)

           specificUser.forEach((user:any) => {
                 totalTasksOfSpecificUser = user.tasks.length
           })
             let completedTasksOfSpecificUserArray = []
            specificUser.forEach((user:any)=>{
              completedTasksOfSpecificUserArray =  user.tasks.filter((task:any) => {
                        return task.isCompleted === true
                  })
            })

            let completedTasksOfSpecificUser = completedTasksOfSpecificUserArray.length
            let inCompleteTasksOfSpecificUser = totalTasksOfSpecificUser - completedTasksOfSpecificUser



            this.chartDataSpecific = {
              labels: ['Total Tasks', 'Completed Tasks', 'Incomplete Tasks'],
              datasets: [
                {
                  label: 'Tasks',
                  data: [totalTasksOfSpecificUser, completedTasksOfSpecificUser, inCompleteTasksOfSpecificUser],
                  backgroundColor: ['#4caf50', '#f44336', '#ffeb3b']
                }
              ]
            };

          this.chartDataSpecific.datasets[0].data = [totalTasksOfSpecificUser, completedTasksOfSpecificUser, inCompleteTasksOfSpecificUser]
      })
  }

  onUserChange(){
      console.log("selected user =>",this.selectedUser)  
      if(this.selectedUser){
          this.loadSpecificUser(this.selectedUser)
      }
  }


}
