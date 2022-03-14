import { Item } from './item';
import { Pages } from './pages';

export class Book extends Item {

    constructor(
        private title: string,
        private author: string,
        protected pages: Pages,
    ) {
        super();
    }

    get getTitle(): string {
        return this.title;
    }

    set setTitle(title: string) {
        this.title = title;
    }

    get getAuthor(): string {
        return this.author;
    }

    set setAuthor(author: string) {
        this.author = author;
    }

    toString(): string {
        return `Book: ${this.getTitle} by ${this.getAuthor} with number of pages: ${this.pages.getPageCount}`;
    }
}
