import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';


const URL = environment.imgPath;


@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent  implements OnInit {


  peliculasRecientesPoster: Pelicula[] = [];
  populares: Pelicula[] = [];

  


  constructor( private moviesService: MoviesService, private modalCtrl: ModalController ) {}

  ngOnInit(){
    
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

    this.moviesService.getPopulares().subscribe( ( resp: any) =>{
      // console.log( 'Populares', resp );
      this.populares = resp.results;
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
