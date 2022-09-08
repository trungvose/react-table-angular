import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import faker from '@faker-js/faker';
import {
  Column,
  ColumnDef,
  ColumnOrderState,
  getCoreRowModel,
} from '@tanstack/table-core';
import { createAngularTable } from '../angular-table';
import { flexRender } from '../angular-table/flex-render';
import { makeData, Person } from './makeData';

const defaultColumns: ColumnDef<Person>[] = [
  {
    header: 'Name',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => 'Last Name',
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: 'Info',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
      },
      {
        header: 'More Info',
        columns: [
          {
            accessorKey: 'visits',
            header: () => 'Visits',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'progress',
            header: 'Profile Progress',
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
];

@Component({
  selector: 'app-column-ordering',
  templateUrl: './column-ordering.component.html',
  styleUrls: ['./column-ordering.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnOrderingComponent {
  constructor(public cdr: ChangeDetectorRef) {}

  data = makeData(20);
  columns = [...defaultColumns];
  columnVisibility = {};
  columnOrders: ColumnOrderState = [];

  table = createAngularTable({
    data: this.data,
    columns: this.columns,
    // state: {
    //   columnVisibility: this.columnVisibility,
    //   columnOrder: this.columnOrders,
    // },
    onColumnVisibilityChange: (changes) => {
      console.log('onColumnVisibilityChange ', changes);
      // this.table.setOptions((prev) => ({
      //   ...prev,
      //   state: {
      //     ...prev.state,
      //     columnVisibility: changes as any,
      //   },
      // }));
    },
    onColumnOrderChange: (changes) => {
      console.log('onColumnOrderChange ', changes);
    },
    getCoreRowModel: getCoreRowModel(),
    onStateChange: (changes) => {
      console.log('state changed ', changes);
    }
  });

  toggleAllColumnsVisibility() {
    this.table.getAllLeafColumns().forEach((column) => {
      this.toggleColumnVisibility(column);
    });
  }

  toggleColumnVisibility(column: Column<any, any>) {
    this.columnVisibility = {
      ...this.columnVisibility,
      [column.id]: !column.getIsVisible(),
    };
    this.table.setOptions((prev) => ({
      ...prev,
      state: {
        ...prev.state,
        columnVisibility: this.columnVisibility,
      },
    }));
  }

  randomizeColumns() {
    const newOrders = faker.helpers.shuffle(
      this.table.getAllLeafColumns().map((d) => d.id)
    );
    this.columnOrders = newOrders;
    this.table.setColumnOrder(newOrders);
    // this.table.setOptions((prev) => ({
    //   ...prev,
    //   state: {
    //     ...prev.state,
    //     columnOrder: newOrders,
    //   },
    // }));
  }

  flexRender<TProps extends {}>(Comp: any, props: TProps) {
    return flexRender(Comp, props);
  }

  rerender() {
    this.table.setOptions((prev) => ({
      ...prev,
      data: makeData(20),
    }));
  }
}
