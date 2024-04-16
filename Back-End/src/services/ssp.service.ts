import { Request, Response } from 'express';


class ServerSidePaging {
    public paging(req: Request, res: Response, result: any[]): any {
        const { page = 1, pageSize = 100000, sortBy = 'id', sortOrder = 'asc', ...filters } = req.query;

        let filteredResult = [...result];

        Object.entries(filters).forEach(([key, value]) => {
            filteredResult = filteredResult.filter(item => {
                if (typeof item[key] === 'string') {
                    return item[key].toLowerCase().includes((value as string).toLowerCase());
                } else {
                    return item[key] === value;
                }
            });
        });

        if (sortBy) {
            result.sort((a: any, b: any) => {
                let comparison = 0;
                if (typeof a[sortBy as string] === 'string' && typeof b[sortBy as string] === 'string') {
                    comparison = a[sortBy as string].localeCompare(b[sortBy as string]);
                } else {
                    comparison = a[sortBy as string] - b[sortBy as string];
                }
                return sortOrder === 'asc' ? comparison : -comparison;
            });
        }

        const totalCount = result.length;
        const totalPages = Math.ceil(totalCount / Number(pageSize));

        const startIndex = (Number(page) - 1) * Number(pageSize);
        const endIndex = startIndex + Number(pageSize);
        const paginatedData = result.slice(startIndex, endIndex);

        return { paginatedData, paginator: { totalCount, totalPages } }
    }
}

export default new ServerSidePaging()