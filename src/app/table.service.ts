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

  getById(id: number) {
    return this.table[id]
  }

  deleteById(id: number) {
    this.table.splice(id, 1)
  }

  updateItem(item: object, id: number) {
    this.table[id] = item
  }

  resetTable() {
    this.table = []
  }
}

