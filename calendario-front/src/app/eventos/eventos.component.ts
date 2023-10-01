import { UsuarioService } from './../usuarios.service';
import { Component, Input, OnInit } from '@angular/core';
import { Evento } from '../eventos.model';
import { EventoService } from '../eventos.service';
import { Usuario } from '../usuarios.model';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  @Input() usuarios: any[] = [];

  usuario: Usuario = new Usuario(0, '', '');

  usuarioSeleccionado: number = 0;

  eventos : any[] = [];

  evento: Evento = new Evento(0, '', '', new Date(), '', 0);


  constructor(private eventoService: EventoService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.obtenerUsuario();
    this.obtenerEventos();
  }

  cambiarUsuarioSeleccionado(){
    console.log("Cambiando usuario seleccionado a: " + this.usuarioSeleccionado);
    console.log('Contenido de "this.usuarios":', this.usuarios);
    const usuarioSeleccionado = this.usuarios.find(u => { return u.id == this.usuarioSeleccionado });
    console.log('Usuario seleccionado encontrado:', usuarioSeleccionado);
    if (usuarioSeleccionado) {
      // Actualizamos los campos de entrada con los valores del usuario seleccionado
      this.usuario.id = usuarioSeleccionado.id;
      this.usuario.nombre = usuarioSeleccionado.nombre;
      this.usuario.correo = usuarioSeleccionado.correo;
      this.obtenerEventosDeUsuario();
    } else {
      // Si no se selecciona un usuario, restablecemos los campos a valores vacíos
      this.usuario.id = 0;
      this.usuario.nombre = '';
      this.usuario.correo = '';
      this.eventos = [];
    }
  }

  obtenerUsuario() {
    console.log("Obteniendo todos los usuarios");
    this.usuarioService.obtenerUsuarios()
      .subscribe((response) => {
        console.log('Usuarios obtenidos exitosamente:', response);
        this.usuarios.push(...response);
        console.log('Usuarios agregados:', this.usuarios);
      }, (error) => {
        console.log('Error al obtener usuarios:', error);
      });
  }

  agregarEvento() {
    if (!this.evento.titulo || !this.evento.descripcion || !this.evento.fecha || !this.evento.lugar) {
      alert('Por favor, completa todos los campos del evento.');
      return; // Detenemos la ejecución si falta algún campo.
    }

    this.evento.usuarioId = this.usuario.id;
    console.log("Agregando :" + JSON.stringify(this.evento));
    this.eventoService.guardarEvento(this.evento)
      .subscribe((response) => {
        console.log('Evento agregado exitosamente:', response);
        this.eventos = [];
        this.obtenerEventosDeUsuario();
        this.evento = new Evento(0, '', '', new Date(), '', 0);
      }, (error) => {
        console.log('Error al agregar evento:', error);
      });
  }

  obtenerEventos() {
    console.log("Obteniendo todos los eventos");
    this.eventoService.obtenerEventos()
      .subscribe((response) => {
        console.log('Eventos obtenidos exitosamente:', response);
        this.eventos.push(...response);
        console.log('Eventos agregados:', this.eventos);
      }, (error) => {
        console.log('Error al obtener eventos:', error);
      });
  }

  obtenerEventosDeUsuario() {
    console.log("Obteniendo todos los eventos del usuario ", this.usuario);
    this.eventoService.obtenerEventosDeUsuario(this.usuario)
      .subscribe((response) => {
        console.log('Eventos obtenidos exitosamente:', response);
        this.eventos = [];
        var eventosMapeados : Evento[] = response.map((e) => {
          return new Evento(e.id, e.titulo, e.descripcion, e.fecha, e.lugar, e.usuario.id);
        });
        this.eventos.push(...eventosMapeados);
        console.log('Eventos agregados:', this.eventos);
      }, (error) => {
        console.log('Error al obtener eventos:', error);
      });
  }

  eliminarEvento(evento : Evento){
    console.log("Eliminando :" + JSON.stringify(evento));
    this.eventoService.eliminarEvento(evento.id).subscribe((response) => {
      console.log('Evento eliminado exitosamente:', response);
      this.eventos = [];
      this.obtenerEventosDeUsuario();
    }, (error) => {
      console.log('Error al eliminar evento:', error);
    });
  }

}
