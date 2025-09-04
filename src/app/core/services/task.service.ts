import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task';

function uid() { return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2); }

const MOCK: Task[] = [
  { id: uid(), title: 'Set up routing', done: true,  createdAt: Date.now()-86400000 },
  { id: uid(), title: 'Create task service', done: false, createdAt: Date.now()-3600000 },
  { id: uid(), title: 'Style board', done: false, createdAt: Date.now() }
];

@Injectable({ providedIn: 'root' })
export class TaskService {
  readonly tasks = signal<Task[]>(MOCK);

  readonly openTasks  = computed(() => this.tasks().filter(t => !t.done));
  readonly doneTasks  = computed(() => this.tasks().filter(t =>  t.done));
  readonly stats      = computed(() => ({
    total: this.tasks().length,
    open:  this.openTasks().length,
    done:  this.doneTasks().length,
  }));

  add(title: string) {
    const task: Task = { id: uid(), title: title.trim(), done: false, createdAt: Date.now() };
    if (!task.title) return;
    this.tasks.update(list => [task, ...list]);
  }

  toggle(id: string) {
    this.tasks.update(list => list.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  remove(id: string) {
    this.tasks.update(list => list.filter(t => t.id !== id));
  }

  clearDone() {
    this.tasks.update(list => list.filter(t => !t.done));
  }
}
