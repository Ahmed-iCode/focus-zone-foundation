// Core FocusZone types (Step 1 foundation only).

export type TaskStatus = "todo" | "doing" | "done";

export interface Profile {
  id: string;
  full_name: string | null;
  created_at: string;
}

export interface Area {
  id: string;
  user_id: string;
  name: string;
  color: string | null;
  created_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  area_id: string | null;
  title: string;
  status: TaskStatus;
  due_date: string | null;
  created_at: string;
}
