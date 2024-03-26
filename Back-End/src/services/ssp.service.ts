import { Request, Response } from 'express';


class SSP {
    public async paging(req: Request, res: Response, result: any[]): Promise<void> {
        const { page = 1, pageSize = 10, sortBy = 'id', sortOrder = 'asc' } = req.query;

        if (sortBy) {
            result.sort((a: any, b: any) => {
                let comparison = 0;
                if (typeof a[sortBy as any] === 'string' && typeof b[sortBy as any] === 'string') {
                    comparison = a[sortBy as any].localeCompare(b[sortBy as any]);
                } else {
                    comparison = a[sortBy as any] - b[sortBy as any];
                }
                return sortOrder === 'asc' ? comparison : -comparison;
            });
        }

        const startIndex = (Number(page) - 1) * Number(pageSize);
        const endIndex = startIndex + Number(pageSize);
        const paginatedData = result.slice(startIndex, endIndex);

        res.status(200).json({ code: 1, data: paginatedData });
    }
}

export default new SSP()