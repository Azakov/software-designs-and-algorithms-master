import { PagesIterable } from './pagesIterable';

export abstract class Item extends PagesIterable(Object) {
    abstract toString(): string;
}