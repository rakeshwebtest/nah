import { APP_CONFIG } from "src/config";

export function mapImageFullPath(files) {
    if (files && files.length > 0) {
        files.map(f => f.fullPath = APP_CONFIG.SERVERBASEPATH + 'uploads/' + f.fileName);
    }
    return files;
}

export function youtubeUrl2EmbedUrl(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    const urlId = (match && match[2].length === 11)
        ? match[2]
        : null;
    return 'https://www.youtube.com/embed/' + urlId;
}