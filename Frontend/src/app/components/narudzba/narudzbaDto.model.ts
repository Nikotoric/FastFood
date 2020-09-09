import { NarudzbaJela } from '../../servisi/narudzba-jela.model';

export class NarudzbaDto{

  brojNarudzbe: string;
  nacinPlacanje: string;
  nacinIsporuke: string;
  ukupanIznos: number;
  stavkeNarudzbe: NarudzbaJela[];
}
