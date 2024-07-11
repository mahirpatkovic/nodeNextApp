import { Order } from '../entities/Order';
import * as exceljs from 'exceljs';
import * as path from 'path';
import * as moment from 'moment/moment';

export class ExcelExportReport {
    public async toExcel(orders: Order[]): Promise<string> {
        const workbook: exceljs.Workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Orders');

        worksheet.columns = [
            { header: 'Order Number', key: 'orderNumber', width: 15 },
            { header: 'Customer', key: 'customer', width: 30 },
            { header: 'Total Amount', key: 'totalAmount', width: 15 },
            { header: 'Order Date', key: 'orderDate', width: 20 },
        ];

        orders.forEach((order: Order) => {
            worksheet.addRow({
                orderNumber: order.order_number,
                customer: order.user.username,
                totalAmount: order.total_amount,
                orderDate: moment(order.order_date).format('DD.MM.YYYY HH:mm'),
            });
        });

        const filePath: string = path.join(
            __dirname,
            `../../tmp/orders_export_${Date.now()}.xlsx`,
        );
        await workbook.xlsx.writeFile(filePath);

        return filePath;
    }
}
