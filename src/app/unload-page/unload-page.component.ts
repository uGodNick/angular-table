import {Component} from '@angular/core';
import {TableService} from '../services/table.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ConversionService} from '../services/conversion.service';


@Component({
  selector: 'app-unload-page',
  templateUrl: './unload-page.component.html'
})
export class UnloadPageComponent {

  table: object[] = this.tableService.getTable()
  data: string = JSON.stringify(this.table)
  format = 'json'
  error  = ''
  url!: SafeUrl

  constructor(
    private tableService: TableService,
    private sanitizer: DomSanitizer,
    private conversion: ConversionService
  ) {}

  onError(err: string) {
    this.error = `Ошибка! ${err}`;
    setTimeout(() => this.error = '', 7000)
  }

  toJson() {
    if (this.format === 'json') {
      return
    }
    try {
      this.data = JSON.stringify(this.conversion.CsvToJson(this.data))
    } catch (e) {
      this.onError('Не удалось конвертировать в json')
      return
    }
    this.format = 'json'
  }

  toCsv() {
    if (this.format === 'csv') {
      return
    }
    try {
      this.data = this.conversion.JsonToCsv(JSON.parse(this.data))
    } catch (e) {
      this.onError('Не удалось конвертировать в csv')
      return
    }
    this.format = 'csv'
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

    // создание файла
    const file = new Blob([blobPart], {type: type})

    // создание ссылки на файл
    const url: string = URL.createObjectURL(file)

    // таймер удаления ссылки на файл
    setTimeout(() => URL.revokeObjectURL(url), 500)

    // присваивание безопасной ссылки
    this.url = this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
