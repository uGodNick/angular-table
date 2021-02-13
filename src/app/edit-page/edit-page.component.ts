import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableService} from '../services/table.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html'
})
export class EditPageComponent implements OnInit {

  item: any = {}
  id!: number

  changedValue: any[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    // поиск элемента таблицы по параметру
    this.route.params.subscribe((params) => {

      this.id = params.id
      this.item = this.tableService.getItemById(this.id)

      // копирование значений в новый массив
      // для хранения изменений этих значений
      for (let key in this.item) {
        this.changedValue.push(this.item[key])
      }
    })
  }

  onDelete() {
    this.tableService.deleteItemById(this.id)
    this.router.navigate(['/table'])
  }

  onSave() {
    const changedItem: any = {}
    let i = 0;
    // копирование измененных значений в новый элемент таблицы
    for (let key in this.item) {
      changedItem[key] = this.changedValue[i]
      i++
    }
    this.tableService.updateItem(changedItem, this.id)
  }
}
