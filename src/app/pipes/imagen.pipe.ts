import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath;


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(  img: string): string {
    // console.log('asaasasasa');
    if ( !img ) {
      return '';
    }
    const imgUrl:string = `${ URL }/${ img }`;
    // console.log('URL', imgUrl);

    return imgUrl;
  }

}
