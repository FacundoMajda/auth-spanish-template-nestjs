export class OrderByDto {
  sortBy: string;
  orderBy: string;

  constructor(sortCriteria: string) {
    this.sortBy = sortCriteria;

    if (this.sortBy.startsWith('+') || this.sortBy.startsWith('-')) {
      this.sortBy = this.sortBy.substring(1);
    }

    this.orderBy =
      sortCriteria && !sortCriteria.startsWith('-') ? 'ASC' : 'DESC';
  }

  getSortBy(): string {
    return this.sortBy;
  }

  getOrderBy(): string {
    return this.orderBy;
  }
}
