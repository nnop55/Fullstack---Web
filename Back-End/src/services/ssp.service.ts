

class ServerSidePaging {
    public paging(queryParams: any, result: any[]): any {
        const { page = 1, pageSize = 100000, sortBy = 'id', sortOrder = 'asc', ...filters } = queryParams;

        let filteredResult = this.applyFilters(result, filters);

        if (sortBy) {
            filteredResult = this.sortResult(filteredResult, sortBy as string, sortOrder as string);
        }

        const { paginatedData, totalCount, totalPages } = this.paginate(filteredResult, page, pageSize);
        const paginatorInfo = this.paginatorInfo(parseInt(pageSize), parseInt(page), totalCount, totalPages)

        return { paginatedData, paginator: { totalCount, totalPages, ...paginatorInfo } };
    }

    private paginatorInfo(pageSize: number, page: number, totalCount: number, totalPages: number) {
        const from = (pageSize * (page - 1)) + 1;
        const to = page !== totalPages ? (from + pageSize - 1) : totalCount
        return { from, to }
    }

    private applyFilters(data: any[], filters: Record<string, any>): any[] {
        return data.filter(item => {
            return Object.entries(filters).every(([key, value]) => {
                if (key.includes('From') || key.includes('To')) {
                    return this.applyPriceRangeFilter(
                        item,
                        filters['priceFrom'],
                        filters['priceTo']
                    ) ?? data
                }
                if (typeof item[key] === 'string') {
                    return item[key].toLowerCase().includes((value as string).toLowerCase());
                } else {
                    const keyStr = item[key]?.toString()
                    return keyStr === value || keyStr?.includes(value);
                }

            });
        });
    }

    private applyPriceRangeFilter(item: any, priceFrom: any, priceTo: any) {
        const itemPrice = Number(item['price']);
        const validPriceFrom = priceFrom !== undefined && priceFrom !== '';
        const validPriceTo = priceTo !== undefined && priceTo !== '';

        if (validPriceFrom && validPriceTo) {
            return itemPrice >= Number(priceFrom) && itemPrice <= Number(priceTo);
        } else if (validPriceFrom) {
            return itemPrice >= Number(priceFrom);
        } else if (validPriceTo) {
            return itemPrice <= Number(priceTo);
        }
    }

    private sortResult(data: any[], sortBy: string, sortOrder: string): any[] {
        return data.sort((a: any, b: any) => {
            let comparison = 0;
            if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
                comparison = a[sortBy].localeCompare(b[sortBy]);
            } else {
                comparison = a[sortBy] - b[sortBy];
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    }

    private paginate(data: any[], page: any, pageSize: any): { paginatedData: any[], totalCount: number, totalPages: number } {
        const totalCount = data.length;
        const totalPages = Math.ceil(totalCount / Number(pageSize));
        const startIndex = (Number(page) - 1) * Number(pageSize);
        const endIndex = startIndex + Number(pageSize);
        const paginatedData = data.slice(startIndex, endIndex);
        return { paginatedData, totalCount, totalPages };
    }
}

export default new ServerSidePaging()