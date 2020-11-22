export interface DataPage<Item> {
  items: Item[]
  previousIndex?: number
  currentIndex: number
  nextIndex?: number
  lastIndex?: number
}
