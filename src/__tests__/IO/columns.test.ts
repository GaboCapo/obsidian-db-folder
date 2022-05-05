import { obtainMetadataColumns, obtainColumnsFromFolder } from "components/Columns";
import { MetadataColumns } from "helpers/Constants";
import { generateYamlColumns } from "mock/mockUtils";
describe("Columns", () => {
    /** Metadata columns */
    test('obtainMetadataColumns()', async () => {
        // Check if mandatory columns exists
        const columnsRecord = await obtainMetadataColumns(generateYamlColumns(5));
        expect(columnsRecord).toHaveProperty(MetadataColumns.FILE);
        expect(columnsRecord).toHaveProperty(MetadataColumns.ADD_COLUMN);
    });
    /** Table columns */
    test('obtainColumnsFromFolder()', async () => {
        const columnsRecord = await obtainMetadataColumns(generateYamlColumns(5));
        const tableColumns = await obtainColumnsFromFolder(columnsRecord);
        expect(tableColumns.length >= 5).toBeTruthy();
    });
}); 