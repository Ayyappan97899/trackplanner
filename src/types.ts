export type TaskStatus = "todo" | "inProgress" | "review" | "completed";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  startDate: Date;
  endDate: Date;
}
