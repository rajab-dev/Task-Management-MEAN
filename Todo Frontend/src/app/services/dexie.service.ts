import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Dexie from "dexie";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DexieService {

  tasksDb:Dexie;
  logsDb:Dexie;

  constructor(private http:HttpClient){

    this.tasksDb = new Dexie("tasksDB");
    this.tasksDb.version(1).stores({
      tasks: '&_id, title, description, user, isCompleted'
    })

    this.logsDb = new Dexie('LogsDB');
    this.logsDb.version(1).stores({
      logs: '++id, action, timestamp'
    })

  }

  getTasksFromBackend(): Observable<any> {
    return this.http.get("http://localhost:5000/task/all-tasks");
  }


  private logAction(action: string): void {
    const logEntry = { action, timestamp: new Date().toISOString() };
    this.logsDb.table('logs').add(logEntry).then(() => {
      console.log('Action logged:', logEntry);
    }).catch((error) => {
      console.error('Error logging action:', error);
    });
  }


addTasks(tasks: any[]) {
  this.logAction(`Adding tasks: ${JSON.stringify(tasks)}`);
  return this.tasksDb.table('tasks').bulkPut(tasks).then(() => {
    console.log('Tasks added successfully');
  }).catch((error) => {
    console.error('Error adding tasks:', error);
    throw error;
  });
}


getTasks() {
  this.logAction('Fetching tasks from IndexedDB'); 
  return this.tasksDb.table('tasks').toArray().then((tasks) => {
    console.log('Tasks retrieved:', tasks);
    return tasks;
  }).catch((error) => {
    console.error('Error retrieving tasks:', error);
    throw error;
  });
}



getTaskById(id: any) {
  this.logAction(`Fetching task with id: ${id}`);
  return this.tasksDb.table('tasks').get(id).then((task) => {
    if (task) {
      console.log('Task retrieved:', task);
      return task;
    } else {
      console.error('Task not found');
      return null;
    }
  }).catch((error) => {
    console.error('Error retrieving task:', error);
    throw error;
  });
}


addTask(task: any) {
  this.logAction(`Adding task: ${JSON.stringify(task)}`);
  return this.tasksDb.table('tasks').add(task).then(() => {
    console.log('Task added successfully');
  }).catch((error) => {
    console.error('Error adding task:', error);
    throw error;
  });
}




deleteTask(id: any) {
    this.logAction(`Deleting task with id: ${id}`);
    return this.tasksDb.table('tasks').delete(id).then(() => {
      console.log('Task deleted successfully');
    }).catch((error) => {
      console.error('Error deleting task:', error);
      throw error;
    });
  }


  updateTask(id: any, updatedTask: any) {
    this.logAction(`Updating task with id: ${id}`);
    return this.tasksDb.table('tasks').update(id, updatedTask).then((updated) => {
      if (updated) {
        console.log('Task updated successfully');
      } else {
        console.error('Task not found');
      }
    }).catch((error) => {
      console.error('Error updating task:', error);
      throw error;
    });
  }

  getPreviousAction(){
     return this.logsDb.table("logs").orderBy("id").reverse().toArray()
      .then((allActions) => {
          console.log("all actions previous =>", allActions)
          return allActions
      })
  }
    
  
}

