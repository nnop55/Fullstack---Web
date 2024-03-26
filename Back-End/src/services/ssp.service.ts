import { Request, Response } from 'express';


class SSP {
    public async paging(req: Request, res: Response, result: any[]): Promise<void> {
        const { page = 1, pageSize = 10, sortBy = 'id', sortOrder = 'asc' } = req.query;

        const startIndex = (Number(page) - 1) * Number(pageSize);
        const endIndex = startIndex + Number(pageSize);
        const paginatedData = result.slice(startIndex, endIndex);

        if (sortBy) {
            paginatedData.sort((a: any, b: any) => {
                if (sortOrder === 'desc') {
                    return b[sortBy as any] - a[sortBy as any];
                } else {
                    return a[sortBy as any] - b[sortBy as any];
                }
            });
        }

        res.status(200).json({ code: 1, data: paginatedData });
    }
}

export default new SSP()