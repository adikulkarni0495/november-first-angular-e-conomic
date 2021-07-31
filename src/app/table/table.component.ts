import { Component, OnInit, ViewChild } from '@angular/core';
import * as data from './table-data.json';
import { Invoices } from './table.interface';
import * as moment from 'moment';


@Component({
  selector: 'nf-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  public systemDate = new Date();

  displayedColumns: string[] = ['checkbox', 'dueDate', 'supplier', 'invoice', 'voucher', 'payment', 'status'];

  dataSource = data.invoices;

  constructor() { }

  ngOnInit(): void
  {

  }

  public getStatus(element)
  {
    return Object.keys(element.Errors).length !== 0 ? '#ffcccc' : '#ffffff';
  }

  public checkDueDate(date)
  {
    const dateOne = moment(this.systemDate).format('YYYY-MM-DD');
    const dateTwo = moment(date).format('YYYY-MM-DD');
    return moment(dateOne).isAfter(dateTwo);
  }

  public checkStatus(element)
  {
    let className = '';

    // 1. Rejected class condition
    if ( element.Amount === element.EntryAmount && element.Payments.length > 0 && element.Payments[0].BookkeepingStatus === 2 ) {
      return className = 'rejected';
    }
    
    // 2. Error class condition
    if( Object.keys(element.Errors).length !== 0 ) {
      return className = 'error';
    } 
    
    // 3. Partial Icon condition 
    if ( element.Amount !== element.EntryAmount && element.Amount !== 0 && element.Payments[0].BookkeepingStatus !== 2 ) {
      return className = 'partial';
    }

    // 4. Registered Icon
    if( element.Amount === 0 && element.Payments[0].Amount ===  element.EntryAmount ) {
      return className = 'registered';
    }

    // 5. Partial Pending Icon
    if ( element.Payments.length > 0 && element.Payments[0].BookkeepingStatus === 1 ) {
      return className = 'partial-pending';
    }
    
    // 6. New Icon
    if ( element.Amount === element.EntryAmount && element.Payments.length === 0 ) {
      return className = 'new';
    }

  }

}
