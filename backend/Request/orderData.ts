
import { ProductOrderData } from './productOrderData';

export interface OrderData {
  id: number;
  userId?: number;
  totalPrice?: number;
  status?: string;
  products?: ProductOrderData[];
}


