import { OrderFilter } from '../interfaces/filters/OrderFilter';
import { Order } from '../entities/Order';
import { OrderService } from './OrderService';
import { ExcelExportReport } from '../reporting/ExcelExportReport';
import { ExportReportType } from '../enums/ExportReportType';
import { XmlExportReport } from '../reporting/XmlExportReport';
import { XmlSchema } from '../interfaces/reporting/XmlSchema';
import { IPagination } from '../interfaces/models/Pagination';

export class ExportService {
    private readonly orderService: OrderService = new OrderService();

    public async exportOrders(
        filter: OrderFilter,
        type: ExportReportType,
        customSchema?: XmlSchema,
    ): Promise<string> {
        const orders: Order[] = (await this.orderService.getOrderWithFilter(
            filter,
        )) as Order[];

        if (type === ExportReportType.XLSX) {
            const excelExportReport: ExcelExportReport =
                new ExcelExportReport();
            return excelExportReport.toExcel(orders);
        }

        const xmlExportReport: XmlExportReport = new XmlExportReport();
        return xmlExportReport.toXml(orders, customSchema);
    }
}
