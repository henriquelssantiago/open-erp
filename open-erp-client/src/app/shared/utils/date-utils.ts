export class DateUtils {
  static formatDateToYYYYMMDD(date: Date) {
    const fullYear = date.getFullYear();
    const monthNumber = date.getMonth() + 1;
    const month = (monthNumber.toString().length === 1) ? '0' + monthNumber : monthNumber;
    const day = (date.getDate().toString().length === 1) ? '0' + date.getDate() : date.getDate();
    return `${fullYear}${month}${day}`;
  }

  static formatDateToYYYYDashMMDashDD(date: Date) {
    const fullYear = date.getFullYear();
    const monthNumber = date.getMonth() + 1;
    const month = (monthNumber.toString().length === 1) ? '0' + monthNumber : monthNumber;
    const day = (date.getDate().toString().length === 1) ? '0' + date.getDate() : date.getDate();
    return `${fullYear}-${month}-${day}`;
  }

  static parseYYYYDashMMDashDDToDate(stringDate: string) {
    const splittedDate = stringDate.split('-');
    if (splittedDate.length === 3) {
      const dateMonth = parseInt(splittedDate[2]);
      const month = parseInt(splittedDate[1]) - 1;
      const year = parseInt(splittedDate[0]);
      return new Date(year, month, dateMonth);
    } else {
      throw new Error("Data " + stringDate + " está no formato inválido");
    }
  }
}
