import { Component } from '@angular/core';
import {TableService} from '../services/table.service';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html'
})
export class TablePageComponent {

  jsonFile: object[] = this.tableService.getTable()

  constructor(
    private tableService: TableService
  ) {}
}
