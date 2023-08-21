import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];

  constructor(
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService
  ) {}

  ngOnInit() {
    this.formatData();
    console.log('--> movies list', this.peliculas);
  }

  formatData() {
    setTimeout(() => {
      if (this.peliculas.length > 0) {
        this.peliculas.forEach((movie: any) => {
          movie['isSave'] = false;

          if (this.dataLocal.isSave(movie.id)) {
            console.log('--> is saved', movie);
            movie['isSave'] = true;
          }

          
        });
      } else {
        this.formatData();
      }
    }, 100);
  }

  async verDetalle(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id,
      },
    });

    modal.present();
  }
}
