import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  table: object[] = []

  setTable(arr: object[]) {
    arr.map(item => this.table.push(item))
  }

  getTable() {
    return this.table
  }

  resetTable() {
    this.table = []
  }

  getItemById(id: number) {
    return this.table[id]
  }

  deleteItemById(id: number) {
    this.table.splice(id, 1)
  }

  liftItemById(id: number) {
    // переместить элемент таблицы на 1 индекс вперед
    [this.table[id - 1], this.table[id]] = [this.table[id], this.table[id - 1]]
  }

  lowerItemById(id: number) {
    // переместить элемент таблицы на 1 индекс назад
    [this.table[id + 1], this.table[id]] = [this.table[id], this.table[id + 1]]
  }

  updateItem(item: object, id: number) {
    this.table[id] = item
  }
}

