

class ServerSidePaging {
    public paging(queryParams: any, result: any[]): any {
        const { page = 1, pageSize = 100000, sortBy = 'id', sortOrder = 'asc', priceFrom, priceTo, ...filters } = queryParams;

        let filteredResult = this.applyFilters(result, filters);
        console.log(filteredResult)
        filteredResult = this.applyPriceRangeFilter(filteredResult, priceFrom, priceTo);

        if (sortBy) {
            filteredResult = this.sortResult(filteredResult, sortBy as string, sortOrder as string);
        }

        const { paginatedData, totalCount, totalPages } = this.paginate(filteredResult, page, pageSize);

        return { paginatedData, paginator: { totalCount, totalPages } };
    }

    private applyFilters(data: any[], filters: Record<string, any>): any[] {
        return data.filter(item => {
            return Object.entries(filters).every(([key, value]) => {
                if (typeof item[key] === 'string') {
                    return item[key].toLowerCase().includes((value as string).toLowerCase());
                } else {
                    return item[key] === value;
                }
            });
        });
    }

    private applyPriceRangeFilter(data: any[], priceFrom: any, priceTo: any): any[] {
        if (priceFrom !== undefined && priceTo !== undefined) {
            return data.filter(item => {
                const itemPrice = Number(item['price']);
                return itemPrice >= Number(priceFrom) && itemPrice <= Number(priceTo);
            });
        }
        return data;
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