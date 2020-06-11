import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgendaServiceService } from '../../services/agenda-service.service';

export interface Contacto {
  idContacto: number;
  nombreCompleto: string;
  telefono: string;
  email: string;
  fechaNacimiento: Date;
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  displayedColumns: string[] = [
    'idContacto',
    'nombreCompleto',
    'telefono',
    'email',
    'fechaNacimiento',
  ];
  dataSource: MatTableDataSource<Contacto>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datos: Contacto[] = [];

  // Data Source
  constructor(private agendaservice: AgendaServiceService) {
    this.agendaservice.getAgenda().subscribe((data: Contacto[]) => {
      console.log(data);
      this.datos = data;
      this.dataSource = new MatTableDataSource(this.datos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
