import { DatabaseColumn } from "cdm/DatabaseModel";
import { AddColumnModalHandlerResponse } from "cdm/ModalsModel";
import { obtainColumnsFromRows } from "components/Columns";
import { MetadataColumns } from "helpers/Constants";
import { Notice, Setting } from "obsidian";
import { AbstractHandlerClass } from "patterns/AbstractHandler";

export class AddExistingColumnHandler extends AbstractHandlerClass<AddColumnModalHandlerResponse> {
    settingTitle: string = 'Add existing column';
    handle(response: AddColumnModalHandlerResponse): AddColumnModalHandlerResponse {
        const { containerEl, addColumnModalManager } = response;
        const { filters, ddbbConfig } = addColumnModalManager.props;
        const { actions, info } = addColumnModalManager.props.columnsState;
        const columns = info.getAllColumns();
        let selectedColumn: string = "-";
        const promiseOfObtainColumnsFromRows = new Promise<Record<string, DatabaseColumn>>((resolve) => {
            resolve(obtainColumnsFromRows(addColumnModalManager.addColumnModal.view, ddbbConfig, filters, columns));
        });

        promiseOfObtainColumnsFromRows.then((columnsRaw: Record<string, DatabaseColumn>) => {
            // Filter out the columns that are already in the table
            const currentColumns = (info.getValueOfAllColumnsAsociatedWith('id') as string[]).map(id => id);
            const filteredColumns: Record<string, string> = {};
            Object.keys(columnsRaw)
                .sort((a, b) => a.localeCompare(b))
                .filter((columnName: string) => {
                    return !currentColumns.includes(columnName.toLowerCase())
                }).forEach((columnName: string) => {
                    filteredColumns[columnName] = columnName;
                });
            new Setting(containerEl)
                .setName('Select an existing column to add')
                .setDesc('Select an existing column to add not included yet in the table')
                .addDropdown((dropdown) => {
                    dropdown
                    dropdown.addOptions(filteredColumns);
                    dropdown.setValue(selectedColumn);
                    dropdown.onChange((value: string) => {
                        selectedColumn = value;
                    });
                }).addExtraButton((cb) => {
                    cb.setIcon("create-new")
                        .setTooltip("Create the selected column and refresh the table")
                        .onClick(async (): Promise<void> => {
                            if (selectedColumn === "-") {
                                new Notice("You need to select a column to add", 1500);
                                return;
                            }
                            actions.addToLeft(columns.find((o) => o.id === MetadataColumns.ADD_COLUMN), selectedColumn);
                            addColumnModalManager.addColumnModal.enableReset = true;
                            // Refresh the modal to remove the selected column from the dropdown
                            addColumnModalManager.reset(response);
                            new Notice(`"${selectedColumn}" added to the table`, 1500);

                        });
                });
            this.goNext(response);
        });
        return null;
    }
}