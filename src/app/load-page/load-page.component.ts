import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TableService} from '../table.service';

@Component({
  selector: 'app-load-page',
  templateUrl: './load-page.component.html'
})
export class LoadPageComponent {

  error: string = ''
  format: string = 'json'
  data: string = ''

  constructor(
    private router: Router,
    private tableService: TableService
  ) {}

  onError(err: string) {
    this.error = `Ошибка! ${err}`;
    setTimeout(() => this.error = '', 7000)
  }

  onContinue() {

    if (this.data.trim() === '') {
      this.onError('Вы ничего не ввели')
      return
    }

    if (this.format === 'json') {
      let result;
      try {
        result = JSON.parse(this.data)
      } catch (e) {
        this.onError('Запись некорректна')
        return
      }
      this.tableService.resetTable()
      this.tableService.setTable(result)
    }

    if (this.format === 'csv') {
      const lines = this.data.split(/\r\n|\n/)
      const headers: string[] = lines[0].split(',')
      const result = []

      for (let i = 1; i < lines.length; i++) {

        let obj: any = {}
        let currentLine = lines[i].split(",")
        if (currentLine.length !== headers.length) {
          continue
        }
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentLine[j]
        }
        result.push(obj)
      }

      try {
        JSON.stringify(result)
      } catch (e) {
        this.onError('Запись некорректна')
        return
      }
      this.tableService.resetTable()
      this.tableService.setTable(result)
    }

    this.router.navigate(['table'])
  }

  onLoadFile(fileInput: Event) {

    // @ts-ignore
    const file = (fileInput.target as HTMLInputElement).files[0]
    const type = file.name.replace(/.*(?=\.)/, '')

    if (type !== '.json' && type !== '.csv') {
      this.onError('Неправильный формат файла. Допустимы: .json, .csv')
      return
    }

    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8")
    fileReader.onload = () => {

      if (typeof fileReader.result === 'string' && type === '.json') {
        this.data = `[\n${fileReader.result}]`
        this.format = 'json'
      }

      if (typeof fileReader.result === 'string' && type === '.csv') {
        this.data = fileReader.result
        this.format = 'csv'
      }

      fileReader.onerror = () => {
        this.onError('Не удалось загрузить файл')
      }

    }

  }

}
