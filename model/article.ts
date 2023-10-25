export default class Article {
    public title: string;
    public url: string | undefined;
    public source: string;

    constructor(title: string, url: string | undefined, source: string) {
        this.title = title;
        this.url = url;
        this.source = source;
    }
}