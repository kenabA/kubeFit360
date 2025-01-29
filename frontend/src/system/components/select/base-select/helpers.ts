export function getValidFilters(
  label: string,
  filters: {
    field: string;
    value: string;
  }[],
  filterField: string
) {
  const existingFilter = filters.find((filter) => filter.field === label);
  if (existingFilter) {
    return filters.map((filter) =>
      filter.field === label ? { ...filter, value: filterField } : filter
    );
  } else {
    return [...filters, { field: label, value: filterField }];
  }
}
