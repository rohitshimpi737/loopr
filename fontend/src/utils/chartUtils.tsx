export const processChartData = (
  data: any[], 
  period: 'month' | 'quarter' | 'year'
): { month: string; Revenue: number; Expenses: number }[] => {
  if (!data || data.length === 0) return [];

  switch (period) {
    case 'quarter':
      const quarterData = data.reduce((acc: any, item: any) => {
        const date = new Date(item.month + '-01');
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        const year = date.getFullYear();
        const key = `Q${quarter} ${year}`;
        
        if (!acc[key]) {
          acc[key] = { month: key, Revenue: 0, Expenses: 0 };
        }
        acc[key].Revenue += item.revenue;
        acc[key].Expenses += item.expenses;
        return acc;
      }, {});
      return Object.values(quarterData);

    case 'year':
      const yearData = data.reduce((acc: any, item: any) => {
        const year = item.month.substring(0, 4);
        
        if (!acc[year]) {
          acc[year] = { month: year, Revenue: 0, Expenses: 0 };
        }
        acc[year].Revenue += item.revenue;
        acc[year].Expenses += item.expenses;
        return acc;
      }, {});
      return Object.values(yearData);

    default:
      return data.map(item => ({
        month: new Date(item.month + '-01').toLocaleDateString('en-US', { 
          month: 'short', 
          year: '2-digit' 
        }),
        Revenue: item.revenue,
        Expenses: item.expenses,
      }));
  }
};