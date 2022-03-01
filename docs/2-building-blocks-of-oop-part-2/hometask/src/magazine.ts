import { Item } from './item';
import { Pages } from './pages';

export class Magazine extends Item {
    constructor(
        private title: string,
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

    toString(): string {
        return `Magazine: ${this.getTitle} with number of pages: ${this.pages.getPageCount}`;
    }
}
