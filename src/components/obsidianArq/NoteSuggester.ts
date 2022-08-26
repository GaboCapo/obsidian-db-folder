import { SUGGESTER_REGEX } from "helpers/Constants";
import { TFile } from "obsidian";
import Fuse from 'fuse.js';

export function suggesterFilesInFunctionOf(text: string): void {
    const files: TFile[] = [];
    // Obtain suggested files from your vault.
    const linkSuggestions = app.metadataCache.getLinkSuggestions().filter(s => s.file !== undefined);
    const fileSearch = new Fuse(linkSuggestions, {
        keys: ['file.basename', 'alias'],
    });
    // let matches = text.match(SUGGESTER_REGEX.LINK);
    // if (matches) {
    //     const fileName = matches[1];
    //     console.log("String is a link!");
    // }
    // matches = text.match(SUGGESTER_REGEX.EMBED);
    // if (matches) {
    //     const fileName = matches[1];
    //     console.log("String is a  Embed link!");
    // }
    // matches = text.match(SUGGESTER_REGEX.LINK_HEADING);
    // if (matches) {
    //     const fileName = matches[1];
    //     console.log("String is a link with a heading!");
    // }
    // matches = text.match(SUGGESTER_REGEX.EMBED_HEADING);
    // if (matches) {
    //     const fileName = matches[1];
    //     console.log("String is a  Embed link with a heading!");
    // }
    // matches = text.match(SUGGESTER_REGEX.LINK_BLOCK);
    // if (matches) {
    //     const fileName = matches[1];
    //     console.log("String is a link with a block!");
    // }
    // matches = text.match(SUGGESTER_REGEX.EMBED_BLOCK);
    // if (matches) {
    //     const fileName = matches[1];
    //     console.log("String is a  Embed link with a block!");
    // }
}
