// Core FocusZone types (Step 1 foundation only).
// These are thin aliases over the generated database types so they can never
// drift from the actual schema.

import type { Tables, Enums } from "@/integrations/supabase/types";

export type AppRole = Enums<"app_role">; // "user" | "admin"
export type TaskPriority = Enums<"task_priority">; // "low" | "medium" | "high"
export type TaskStatus = Enums<"task_status">; // "todo" | "in_progress" | "done"

export type Profile = Tables<"profiles">;
export type Area = Tables<"areas">;
export type Task = Tables<"tasks">;
