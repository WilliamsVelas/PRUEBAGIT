import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Cast, Pelicula, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';
import { log } from 'console';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent  implements OnInit {

  @Input() id: any;
  pelicula: PeliculaDetalle ={};
  actores: Cast[] = [];
  oculto = 150;
  

  constructor(  private movieService: MoviesService,
                private modalCtrl: ModalController,
                private dataLocal: DataLocalService ) { }

  ngOnInit() {

    // console.log('ID', this.id);

    this.movieService.getPeliculaDetalle( this.id ).subscribe( (resp: any)=>{
      // console.log('Detalles Pelicula',resp);
      this.pelicula = resp;
    });

    this.movieService.getActoresPeliculas( this.id ).subscribe( (resp: any)=>{
      // console.log('Actores pelicula',resp);
      this.actores = resp.cast;
    });
  }

  regresar(){
      this.modalCtrl.dismiss();
  }

  favorito(){
    this.dataLocal.guardarPelicula(this.pelicula);
  }
}
