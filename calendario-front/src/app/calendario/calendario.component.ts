import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  selectedYear: number;
  selectedMonth: number;
  daysInMonth: number;
  daysArray: number[];
  calendarData: any[] = [];

  constructor() {
    const currentDate = new Date();
    this.selectedYear = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth() + 1;
    this.daysInMonth = 0;
    this.daysArray = [];
  }

  ngOnInit() {
    this.calcularDiasEnMes();
  }

  calcularDiasEnMes() {
    const lastDay = new Date(this.selectedYear, this.selectedMonth, 0);
    this.daysInMonth = lastDay.getDate();
    this.daysArray = Array.from({ length: this.daysInMonth }, (_, i) => i + 1);
  }

}
