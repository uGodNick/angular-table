import {Component} from '@angular/core';
import {TableService} from '../table.service';
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

  toCsv() {
    try {
      JSON.parse(this.data)
    } catch (e) {
      this.onError('Не удалось конвертировать в csv')
      return
    }
    let items = JSON.parse(this.data)

    const replacer = (key: any, value: any) => value === null ? '' : value
    const header = Object.keys(items[0])
    this.data = [
      header.join(','),
      ...items.map((row:any) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
  }

  onDownload(){
    let file

    if (this.format === 'json') {

      file = new Blob(
        [
          JSON.stringify({
            items: this.table
          })
        ], {
          type: 'application/json'
        }
      )
    } else {
      file = new Blob(
        [
          this.data
        ], {
          type: 'text/csv'
        }
      )
    }

    const url: string = URL.createObjectURL(file)

    setTimeout(() => URL.revokeObjectURL(url), 500)

    this.url = this.sanitizer.bypassSecurityTrustUrl(url);
  }


}
