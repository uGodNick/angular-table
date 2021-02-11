import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableService} from '../table.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html'
})
export class EditPageComponent implements OnInit {

  item: any = {}
  id!: number

  changedValue: any[] = []
  changedItem: any = {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id
      this.item = this.tableService.getById(this.id)
      for (let key in this.item) {
        this.changedValue.push(this.item[key])
      }
    })
  }

  onDelete() {
    this.tableService.deleteById(this.id)
    this.router.navigate(['/table'])
  }

  onSave() {
    let i = 0;
    for (let key in this.item) {

      this.changedItem[key] = this.changedValue[i]
      i++
    }
    this.tableService.updateItem(this.changedItem, this.id)

  }
}
