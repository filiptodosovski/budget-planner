export interface IExpense {
  id?: number
  amount: number;
  month: string;
  category: string;
  year: number;
  type: string;
}

export interface IGroupedExpense {
  year: number
  month: string
  expenses: IExpenseInGrouped[]
}

export interface IExpenseInGrouped {
  id: number
  amount: number
  category: string
  type: string
}
