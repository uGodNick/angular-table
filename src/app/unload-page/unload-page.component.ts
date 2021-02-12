import {Component} from '@angular/core';
import {TableService} from '../services/table.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-unload-page',
  templateUrl: './unload-page.component.html'
})
export class UnloadPageComponent {

  table: object[] = this.tableService.getTable()
  data: string = JSON.stringify(this.table)
  url: SafeUrl = ''
  format: string = 'json'
  error: string = ''

  constructor(
    private tableService: TableService,
    private sanitizer: DomSanitizer
  ) {}

  onError(err: string) {
    this.error = `Ошибка! ${err}`;
    setTimeout(() => this.error = '', 7000)
  }

  toJson() {
    try {
      this.data = JSON.stringify(this.table)
    } catch (e) {
      this.onError('Не удалось конвертировать в json')
      return
    }
  }

  onDownload(){
    let blobPart
    let type

    if (this.format === 'json') {
      // создание json объекта с ключом "items", в котором хранятся все введенные объекты
      blobPart = JSON.stringify({items: this.table})
      type = 'application/json'
    } else {
      blobPart = this.data
      type = 'text/csv'
    }

    const file = new Blob([blobPart], {type: type})
    const url: string = URL.createObjectURL(file)

    setTimeout(() => URL.revokeObjectURL(url), 500)
    this.url = this.sanitizer.bypassSecurityTrustUrl(url);
  }

  toCsv() {

  }
}
