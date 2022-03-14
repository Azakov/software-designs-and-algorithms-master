import { Pages } from './pages';

type SuperClassType = new (...args: any[]) => {};

export function PagesIterable<T extends SuperClassType>(superclass: T) {
    return class extends superclass {

        protected pages!: Pages;

        *[Symbol.iterator]() {
            const pageItems = this.pages.getPages(this);

            for (let i = 0; i < this.pages.getPageCount; i++) {
                yield pageItems[i].toString();
            }
        }
    }
}

