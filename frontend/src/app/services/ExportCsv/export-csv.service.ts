import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportCsvService {

  exportAsCsvFile(json: unknown[], csvFileName: string): void {
    if (!json || !json.length) {
      return;
    }

    const separator = ';';
    const keys = Object.keys(json[0] as Record<string, unknown>);

    const csvContent = [
      keys.join(separator),
      ...(json as Record<string, unknown>[]).map(row =>
        keys.map(key => {
          let cell = row[key] === null || row[key] === undefined ? '' : String(row[key]);
          cell = cell.replace(/"/g, '""');
          if (cell.includes(separator) || cell.includes('"') || cell.includes('\n') || cell.includes('\r')) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator)
      )
    ].join('\n');

    this.saveAsCsvFile(csvContent, csvFileName);
  }

  private saveAsCsvFile(csvContent: string, fileName: string): void {
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], {
      type: 'text/csv;charset=utf-8;'
    });

    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const dateStr = `${day}-${month}-${year}`;

    const finalFileName = `${fileName}_${dateStr}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = `${finalFileName}.csv`;
    downloadLink.click();
  }
}
