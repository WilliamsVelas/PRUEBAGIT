import { Injectable } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];

  constructor(private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
    });
    toast.present();
  }

  guardarPelicula(pelicula: PeliculaDetalle) {
    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter((peli) => peli.id !== pelicula.id);
      mensaje = 'Removido de Favoritos cabron brrrr';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos bebesita uaa';
    }

    this.presentToast(mensaje);
    localStorage.setItem('peliculas', JSON.stringify(this.peliculas));
  }

  getSaveMovies(): any {
    return JSON.parse(String(localStorage.getItem('peliculas')));
  }

  isSave(_id: any) {
    let aux = false;

    this.getSaveMovies().forEach((movie: any) => {
      if (movie.id == _id) {
        aux = true;
      }
    });

    return aux;
  }

  async cargarFavoritos() {
    const peliculas: any = JSON.parse(
      String(localStorage.getItem('peliculas'))
    );
    this.peliculas = peliculas;
  }
}
