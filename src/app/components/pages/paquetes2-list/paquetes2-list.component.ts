import { Component, OnInit } from '@angular/core';
import { PaqueteService, Paquete } from '../../../services/paquetes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paquetes2-list',
  templateUrl: './paquetes2-list.component.html',
  styleUrls: ['./paquetes2-list.component.css']
})
export class Paquetes2ListComponent implements OnInit {
  paquetes: any[] = [];

  constructor(private paqueteService: PaqueteService, private router: Router) {}

  ngOnInit(): void {
    this.paqueteService.getPaquetes().subscribe(data => {
      this.paquetes = data;
    });
  }

  verDetalle(id: string) {
    this.router.navigate(['/paquetes2', id]);
  }
}
