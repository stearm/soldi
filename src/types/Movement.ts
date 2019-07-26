import { MovementType } from "./MovementType";

export interface Movement {
  id: string;
  amount: number;
  description?: string;
  type: MovementType;
  date: number;
}
