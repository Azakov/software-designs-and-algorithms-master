import { Item } from './item';
import { Pages } from './pages';

export class Comics extends Item {

    constructor(
        private title: string,
        private author: string,
        private artist: string,
        protected pages: Pages,
    ) {
        super();
    }

    get getTitle(): string {
        return this.title;
    }
    get getAuthor(): string {
        return this.author;
    }
    get getArtist(): string {
        return this.artist;
    }

    set setArtist(artist: string) {
        this.artist = artist;
    }

    set setAuthor(author: string) {
        this.author = author;
    }

    set setTitle(title: string) {
        this.title = title;
    }

    toString(): string {
        return `Comics: ${this.getTitle} by ${this.getAuthor}, the artist is ${this.getArtist}, number of pages: ${this.pages.getPageCount}`
    }

}