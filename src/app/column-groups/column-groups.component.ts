import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core';
import { createAngularTable } from '../angular-table';
import { flexRender } from '../angular-table/flex-render';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const data: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.group({
    id: 'hello',
    header: () => 'Hello',
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor('firstName', {
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => 'Last Name',
        footer: (props) => props.column.id,
      }),
    ],
  }),
  columnHelper.group({
    header: 'Info',
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor('age', {
        header: () => 'Age',
        footer: (props) => props.column.id,
      }),
      columnHelper.group({
        header: 'More Info',
        columns: [
          columnHelper.accessor('visits', {
            header: () => 'Visits',
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor('status', {
            header: 'Status',
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor('progress', {
            header: 'Profile Progress',
            footer: (props) => props.column.id,
          }),
        ],
      }),
    ],
  }),
];

@Component({
  selector: 'app-column-groups',
  templateUrl: './column-groups.component.html',
  styleUrls: ['./column-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnGroupsComponent {
  table = createAngularTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  flexRender<TProps extends {}>(Comp: any, props: TProps) {
    return flexRender(Comp, props);
  }
}
