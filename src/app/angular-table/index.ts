import {
  createTable,
  RowData,
  Table,
  TableOptions,
  TableOptionsResolved,
} from '@tanstack/table-core';

export function createAngularTable<TData extends RowData>(
  options: TableOptions<TData>
): Table<TData> {
  const resolvedOptions: TableOptionsResolved<TData> = {
    state: {}, // Dummy state
    onStateChange: () => {}, // noop
    renderFallbackValue: null,
    ...options,
  };

  const table = createTable(resolvedOptions);
  const { initialState: state } = table;
  table.setOptions((prev) => ({
    ...prev,
    ...options,
    state: {
      ...state,
      ...options.state,
    },
    onStateChange: (updater) => {
      options.onStateChange?.(updater);
    },
  }));

  return table;
}
