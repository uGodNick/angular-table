import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  JsonToCsv(items: object[]): string {

    // функция, заменяющая пустые значения на ''
    const replacer = (key: any, value: any) => value === null ? '' : value

    const header = Object.keys(items[0])

    return [
      header.join(','),
      ...items.map((row:any) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
  }

  CsvToJson(items: string): object[] {

    const lines = items.split(/\r\n|\n/)
    const headers: string[] = lines[0].split(',')
    const result = []

    for (let i = 1; i < lines.length; i++) {

      let obj: any = {}
      let currentLine = lines[i].split(",")

      // проверка на соответсвия длины строки и заголовка
      if (currentLine.length !== headers.length) {
        continue
      }

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j]
      }
      result.push(obj)
    }
    return result
  }
}
