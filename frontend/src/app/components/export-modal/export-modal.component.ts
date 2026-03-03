import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-export-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './export-modal.component.html',
  styleUrl: './export-modal.component.css'
})
export class ExportModalComponent {
  @Input() title: string = 'Exporter les données';
  @Input() availableColumns: { key: string; label: string; selected: boolean }[] = [];
  @Output() confirm = new EventEmitter<string[]>();
  @Output() cancel = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit();
  }

  onConfirm() {
    const selectedKeys = this.availableColumns
      .filter(col => col.selected)
      .map(col => col.key);
    this.confirm.emit(selectedKeys);
  }

  selectAll() {
    this.availableColumns.forEach(col => col.selected = true);
  }

  deselectAll() {
    this.availableColumns.forEach(col => col.selected = false);
  }
}
