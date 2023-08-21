import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';
import { DetalleComponent } from '../detalle/detalle.component';

const URL = environment.imgPath;

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent  implements OnInit {

  @Input() id: any;

  peliculasRecientesPoster: Pelicula[] = [];
  populares: Pelicula[] = [];

  constructor( private moviesService: MoviesService, private modalCtrl: ModalController ) { }
  
  //Logica Para mostrar las Imagenes
  ngOnInit() {
    this.moviesService.getFeature().subscribe( 
      ( resp: any) => {
        
        this.peliculasRecientesPoster = resp.results;

        this.peliculasRecientesPoster.forEach(( pelicula: any)=> {

          if( !pelicula.poster_path ){
            // console.log('a');
            pelicula['imgPosterP']='assets/no-image-banner.jpg';
          }else { 
            pelicula['imgPosterP']= `${ URL }${ pelicula.poster_path }`
            // console.log(pelicula);
          }
        })
      }
    );

    this.getPopulares();
  }
  //Boton para ver mas..
  onClick(){
    this.cargarMas();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() { 
    this.moviesService.getPopulares().subscribe( ( resp: any) =>{

      const arrTemp = [ ...this.populares, ...resp.results ];

      this.populares = arrTemp;
      // console.log( 'PopularesGrandes', resp );
    } )
  }

  async verDetalle( id: number ){

    const modal = await this.modalCtrl.create({  
      component: DetalleComponent,
      componentProps:{
        id
      }
    });

    modal.present();

  }

  

}
