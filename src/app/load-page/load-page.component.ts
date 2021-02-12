import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TableService} from '../services/table.service';
import {ConversionService} from '../services/conversion.service';

@Component({
  selector: 'app-load-page',
  templateUrl: './load-page.component.html'
})
export class LoadPageComponent {

  error = ''
  format = 'json'
  data = ''

  constructor(
    private router: Router,
    private tableService: TableService,
    private conversion: ConversionService
  ) {}

  onError(err: string) {
    this.error = `Ошибка! ${err}`;
    setTimeout(() => this.error = '', 7000)
  }

  onContinue() {

    // Проверка на заполненность textarea
    if (this.data.trim() === '') {
      this.onError('Вы ничего не ввели')
      return
    }

    let result

    if (this.format === 'json') {
      try {
        result = JSON.parse(this.data)
      } catch (e) {
        this.onError('Запись некорректна')
        return
      }
    }

    if (this.format === 'csv') {
      try {
        result = this.conversion.CsvToJson(this.data)
      } catch (e) {
        this.onError('Запись некорректна')
        return
      }
    }

    this.tableService.resetTable()
    this.tableService.setTable(result)
    this.router.navigate(['table'])
  }

  onLoadFile(fileInput: Event) {

    // переменная с файлом
    const file = (fileInput.target as HTMLInputElement).files![0]

    // переменная с расширением файла
    const type = file.name.replace(/.*(?=\.)/, '')

    if (type !== '.json' && type !== '.csv') {
      this.onError('Неправильный формат файла. Допустимы: .json, .csv')
      return
    }

    // процесс чтения файла
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8")
    fileReader.onload = () => {
      const result: string | ArrayBuffer | null = fileReader.result

      fileReader.onerror = () => {
        this.onError('Не удалось загрузить файл')
        return
      }

      if (type === '.json') {
        this.data = `[\n${result}]`
        this.format = 'json'
      }

      if (type === '.csv') {
        this.data = `${result}`
        this.format = 'csv'
      }

    }
  }
}
