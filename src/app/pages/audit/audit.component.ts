import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LogEntry } from '../../shared/interfaces/log.interface';
import { AuditService } from '../../shared/services/audit.service';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {
  displayedColumns: string[] = ['timestamp', 'level', 'message', 'context', 'usuario'];
  dataSource = new MatTableDataSource<LogEntry>([]);

  constructor(private auditService: AuditService) { }

  ngOnInit(): void {
    this.auditService.getLogs().subscribe((logs: LogEntry[]) => {
      this.dataSource.data = logs;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
