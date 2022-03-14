import { Item } from './item';
import { Page } from './page';

export class Pages {
    constructor(private pages: Page[]) { }

    getPages(item: Item): Page[] {
        return this.pages.map((page: Page) => {
            const pageToString = String(page);

            page.toString = () => `${item}, ${pageToString}`;

            return page;
        });
    }

    get getPageCount(): number {
        return this.pages.length;
    }
}