import { NextFunction, Request, Response } from 'express';
import { ExportService } from '../services/ExportService';
import * as path from 'path';
import { unlinkSync } from 'fs';
import { ExportReportType } from '../enums/ExportReportType';
import { XmlSchema } from '../interfaces/reporting/XmlSchema';

class ExportController {
    private readonly service: ExportService = new ExportService();

    constructor() {
        this.exportOrders = this.exportOrders.bind(this);
    }

    public async exportOrders(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void | Response> {
        const reportType: ExportReportType =
            req.query.type &&
            req.query.type.toString() !== ExportReportType.XLSX
                ? ExportReportType.XML
                : ExportReportType.XLSX;

        const customSchema: XmlSchema = req.body.customSchema;

        return this.service
            .exportOrders(req.query, reportType, customSchema)
            .then((filePath: string) => {
                if (!filePath) {
                    return res.sendStatus(404);
                }

                const fileName = path.basename(filePath);
                const fileExtension = path.extname(filePath).slice(1);
                res.set({
                    'Content-Type': `application/${fileExtension}`,
                    'Content-Disposition': `attachment; filename=${fileName}`,
                });
                res.download(filePath, () => unlinkSync(filePath));
            })
            .catch((err: Error) => next(err));
    }
}

export default new ExportController();
