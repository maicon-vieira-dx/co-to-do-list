import { Priority, Status } from "@app/model/item.model";

export const STATUS_LIST = [
  { name: 'Pendente', value: Status.PENDING },
  { name: 'Em andamento', value: Status.IN_PROGRESS },
  { name: 'Concluído', value: Status.COMPLETED },
  { name: 'Cancelado', value: Status.CANCELLED },
] as const;

export const PRIORITY_LIST = [
  { name: 'Baixa', value: Priority.LOW },
  { name: 'Média', value: Priority.MEDIUM },
  { name: 'Alta', value: Priority.HIGH },
  { name: 'Urgente', value: Priority.URGENT }
] as const;