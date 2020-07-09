import { SERVERBASEPATH } from "src/config";

export function mapImageFullPath(files) {
    if (files && files.length > 0) {
        files.map(f => f.fullPath = SERVERBASEPATH + 'uploads/' + f.fileName);
    }
    return files;
}