export class Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  lugar: string;
  usuarioId: number; // ID del usuario al que pertenece el evento

  constructor(id: number, titulo: string, descripcion: string, fecha: Date, lugar: string, usuarioId: number) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.lugar = lugar;
    this.usuarioId = usuarioId;
  }
}
