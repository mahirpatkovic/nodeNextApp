import * as path from 'path';
import * as moment from 'moment';
import { create } from 'xmlbuilder2';
import { Order } from '../entities/Order';
import { XmlSchema } from '../interfaces/reporting/XmlSchema';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';

export class XmlExportReport {
    private defaultSchema: XmlSchema = {
        order: {
            orderNumber: 'order_number',
            customer: 'user.username',
            totalAmount: 'total_amount',
            orderDate: 'order_date',
        },
    };

    public async toXml(
        orders: Order[],
        customSchema?: XmlSchema,
    ): Promise<string> {
        const schema: XmlSchema = customSchema || this.defaultSchema;

        const root: XMLBuilder = create({ version: '1.0' }).ele('Orders');

        for (const order of orders) {
            const orderElement = root.ele('Order');

            for (const [key, value] of Object.entries(schema.order)) {
                const fieldValue = this.getFieldValue(order, value);
                orderElement.ele(key).txt(fieldValue);
            }
        }

        const xml: string = root.end({ prettyPrint: true });

        const filePath: string = path.join(
            __dirname,
            `../../tmp/orders_export_${Date.now()}.xml`,
        );
        require('fs').writeFileSync(filePath, xml);

        return filePath;
    }

    private getFieldValue(order: Order, fieldPath: string): string {
        const fields = fieldPath.split('.');
        let value: any = order;

        fields.forEach((field) => {
            value = value[field];
        });

        if (value instanceof Date) {
            value = moment(value).format('DD.MM.YYYY HH:mm');
        }

        return value.toString();
    }
}
