export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum Status {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface Item {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  createdAt: Date;
  dueDate?: Date;
  category?: string;
  tags: string[];
  isActive: boolean;
}
