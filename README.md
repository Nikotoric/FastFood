# Fast Food App
Jednostavna jednostranična aplikacija(eng. Single page application; SPA) napravljena u *Angularu*.</br>
Aplikacija je simulacija Fast food narudžbe preko interneta. Sastoji se od dva dijela: serverske i klijentske strane (backend i frontend). Klijentska strana je napisana u Angularu, a serverska u C#, dok će podatci biti pohranjeni u Microsoftovom SQL Server Management Studiu. </br>
## Opis aplikacije
Cilj aplikacije je prikazati naručivanje hrane preko web preglednika. Prilikom pokretanja aplikacije korisnik se prvo treba registrirati. Kad je račun spremljen u bazu podataka, korisnik može koristiti aplikaciju. Prilikom registracije korisnik upisuje vlastito ime i prezime, adresu na koju mu se dostavlja narudžba te korisničko ime i lozinku koje su mu kasnije potrebne za prijavu u aplikaciju.
<p align="center">
  <kbd><img src="./FastFood/slike/prijava_registracija.jpg" alt="Prijava i registracija" width="738", border="5"> </kbd>
</p>
Nakon uspješno napravljene registracije i prijave, korisniku se prikazuje stranica Menu (jelovnik Fast Food-a) kao početna vrijednost. Na zadanoj stranici korisnik ima pregled ponude hrane i pića u Fast foodu. Izgled stranice Menu podijeljen je na tri dijela: na pizze, sendviče i pića. Pored svakog artikla prikazana je cijena u hrvatskoj valuti (kuna; kn) koja je učitana iz baze podataka. Registrirani korisnik ima mogućnost sortiranja artikala po cijeni od jeftinijeg prema skupljem, ali i obrnuto te abecednim redom.
<p align="center">
  <kbd><img src="./FastFood/slike/menu.png" alt="Menu" width="738", border="5"> </kbd>
</p>
</br>
U navigacijskom izborniku pri vrhu aplikacije korisnik može odabrati Menu ili Narudžba. Iako je korisniku vidljivo, jedino administrator ima pravo odabira odlaska na stranicu Ispis narudžbi. Nakon odabira narudžbe u navigacijskom izborniku otvara se stranica s raznim pogodnostima. Korisnik ima uvid u broj narudžbe koji ne može samostalno uređivati, već je nasumično odabran. Nakon toga odabire način plaćanja i isporuke narudžbe. Ima mogućnost biranja plaćanja karticom ili gotovinom te odabir dostave na vlastitu adresu ili preuzimanje narudžbe.
<p align="center">
  <kbd><img src="./FastFood/slike/izgledNarudzbe.png" alt="narudzba" width="738", border="5"> </kbd>
</p>
</br>
Zatim se pritiskom na gumb Dodaj otvara skočni prozor (eng. pop-up window) gdje se odabiru željeni artikli. Popis artikala i njihova cijena se učitava iz baze podataka. Korisnik upisuje količinu artikla kojeg ţeli naručiti. Pri odabiru željenog artikla korisnik odmah vidi budući iznos narudžbe s obzirom na upisanu količinu. Ako se ne slaže s istaknutom cijenom određenog artikla korisnik može i odustati od naručivanja pritiskom na gumb Odustani, a ako je zadovoljan s ponudom pritisnuti će gumb Dodaj.
<p align="center">
  <kbd><img src="./FastFood/slike/dodajArtikal.png" alt="dodaj artikal" width="738", border="5"> </kbd>
</p>
</br>
Nakon dodavanja svih ţeljenih artikala u košaricu korisnik vidi tablični prikaz s odabranim artiklima, količinama i cijenama, a ispod tablice ima na uvid ukupnu cijenu narudţbe. Korisniku preostaje jedino potvrditi narudžbu, što se čini pritiskom na gumb Napravi narudžbu. Međutim, uvijek postoji mogućnost greške u naručivanju pa korisnik može i obrisati određeni artikl pritiskom na crveni gumb Obriši. </br>
Svaka provedena narudžba sprema se u bazu podataka, a jedino administratori imaju uvid u ispis svih narudžbi. Kako bi vidjeli ispis svih narudžbi u aplikacijskom dijelu administratori  trebaju pritisnuti na Ispis narudžbi u navigacijskom izborniku. Administrator ima uvid u jedinstveni broj narudžbe, odabrane načine isporuke i plaćanja te ukupan iznos same narudžbe.
<p align="center">
  <kbd><img src="./FastFood/slike/izgledIspisaNarudzbi.png" alt="ispis narudzbi" width="738", border="5"> </kbd>
</p>
