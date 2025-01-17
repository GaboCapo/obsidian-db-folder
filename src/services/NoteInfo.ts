import { RowDataType, TableColumn } from "cdm/FolderModel";
import { InputType, MetadataColumns } from "helpers/Constants";
import { TFile } from "obsidian";
import { DataviewService } from "services/DataviewService";
import { Literal } from "obsidian-dataview/lib/data-model/value";
import { LocalSettings } from "cdm/SettingsModel";
import { resolve_tfile } from "helpers/FileManagement";
import { NoteInfoPage } from "cdm/DatabaseModel";
/**
 * Keep info about a note and offer methods to manipulate it
 */

export default class NoteInfo {
    public filepath: string;
    private page: NoteInfoPage;
    constructor(page: NoteInfoPage) {
        this.page = page;
        this.filepath = page.file.path;
    }

    getRowDataType(columns: TableColumn[], config: LocalSettings): RowDataType {
        /** Mandatory fields */
        const aFile: RowDataType = {
            __note__: this
        }
        const dataviewFile = this.page;
        dataviewFile
        /** Metadata fields */
        aFile[MetadataColumns.FILE] = `${dataviewFile.file.link.fileName()}|${dataviewFile.file.link.path}`;
        aFile[MetadataColumns.CREATED] = dataviewFile.file.ctime;
        aFile[MetadataColumns.MODIFIED] = dataviewFile.file.mtime;
        aFile[MetadataColumns.TASKS] = dataviewFile.file.tasks;
        aFile[MetadataColumns.OUTLINKS] = dataviewFile.file.outlinks;
        aFile[MetadataColumns.INLINKS] = dataviewFile.file.inlinks;
        /** Parse data with the type of column */
        columns.forEach(column => {
            if (dataviewFile[column.key] !== undefined) {
                aFile[column.key] = DataviewService.parseLiteral((dataviewFile[column.key]) as Literal, column.input, config, column.config.isInline);
            }
        });
        return aFile;
    }

    getAllRowDataType(config: LocalSettings): RowDataType {
        /** Mandatory fields */
        const aFile: RowDataType = {
            __note__: this
        }
        /** Optional fields */
        /** Parse data with the type of column */
        Object.keys(this.page)
            .filter(key => !["file"].includes(key))
            .forEach(property => {
                const value = DataviewService.parseLiteral((this.page[property]) as Literal, InputType.TEXT, config, false);
                aFile[property] = value;
            });

        return aFile;
    }

    getFile(): TFile {
        return resolve_tfile(this.filepath);
    }
}