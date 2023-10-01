import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../usuarios.model';
import { UsuarioService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  @Input() usuarios: any[] = [];

  usuario: Usuario = new Usuario(0, '', '');

  usuarioSeleccionado: number = 0;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.obtenerUsuario();
  }

  cambiarUsuarioSeleccionado() {
    console.log("Cambiando usuario seleccionado a: " + this.usuarioSeleccionado);
    console.log('Contenido de "this.usuarios":', this.usuarios);
    const usuarioSeleccionado = this.usuarios.find(u => { return u.id == this.usuarioSeleccionado });
    console.log('Usuario seleccionado encontrado:', usuarioSeleccionado);
    if (usuarioSeleccionado) {
      // Actualizamos los campos de entrada con los valores del usuario seleccionado
      this.usuario.id = usuarioSeleccionado.id;
      this.usuario.nombre = usuarioSeleccionado.nombre;
      this.usuario.correo = usuarioSeleccionado.correo;
    } else {
      // Si no se selecciona un usuario, restablecemos los campos a valores vacíos
      this.usuario.id = 0;
      this.usuario.nombre = '';
      this.usuario.correo = '';
    }
  }

  eliminarUsuario() {
    console.log("Eliminando :" + JSON.stringify(this.usuario));
    this.usuarioService.eliminarUsuario(this.usuario)
      .subscribe((response) => {
        console.log('Usuario eliminado exitosamente:', response);
        this.usuarios = [];
        this.obtenerUsuario();
        this.usuarioSeleccionado = 0;
      }, (error) => {
        console.log('Error al eliminar usuario:', error);
      });
  }

  agregarUsuario() {
    console.log("Agregando :" + JSON.stringify(this.usuario));
    if (!this.usuario.nombre || !this.usuario.correo) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.usuario.correo)) {
      alert('El correo electrónico no es válido.');
      return;
    }
    this.usuarioService.agregarUsuario(this.usuario)
      .subscribe((response) => {
        console.log('Usuario agregado exitosamente:', response);
        this.usuarios = [];
        this.obtenerUsuario();
        this.usuarioSeleccionado = 0;
      }, (error) => {
        console.log('Error al agregar usuario:', error);
      });
    this.usuario = new Usuario(0, '', '');

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

}
