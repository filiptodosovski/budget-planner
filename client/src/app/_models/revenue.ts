export interface IRevenue {
  id?: number
  amount: number;
  month: string;
  category: string;
  year: number;
  type: string;
}

export interface IGroupedRevenue {
  year: number
  month: string
  revenues: IRevenueInGrouped[]
}

export interface IRevenueInGrouped {
  id: number
  amount: number
  category: string
  type: string
}
