import { Component } from '@angular/core';
import { appService } from './app.service';
import { RulesService } from './rules/rules.service';
type Moves = {
  move:number[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'L-ChessGame';
  name: any;
  error: any;
  scacchiera: string[][];
  posizionePartenza: any;
  posizioneArrivo: any;
  flagWin: boolean=false;
  flagScacco: boolean=false;
  turno: string="b" ;
  date: string="";
  timeZoneObject: any;
    charToNumber:any = {
    'A':0,
    'B':1,
    'C':2,
    'D':3,
    'E':4,
    'F':5,
    'G':6,
    'H':7
  }
  constructor(private appService: appService, private rulesService:RulesService) {
    
    this.appService.getConfig()
      .subscribe({
        next: (data: any) => 
          this.getData(data),// success path
        
        error: error => this.date = error, // error path
      });
    
      //casellaPart[0] RIGA
      //casellaPart[1] COLONNA
      //SI METTE PRIMA LA COLONNA E POI LA RIGA: ESEMPIO : scacchiera[casella[1], casella[0]]
    this.scacchiera = [
      ['Cb','Cb','','Kb','','','Cb',''],
      ['Pb','Pb','Pb','Pb','Pb','Pb','Pb','Pb'],
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['','','Kr','','','','',''],
      ['','','','','','','',''],
      ['Pr','Pr','Pr','Pr','Pr','Pr','Pr','Pr'],
      ['','Cr','','Kr','','','Cr','']
    ];

  }

  public getData(data:any) {
    this.date =  data.results.sunrise;
  }

  public sposta() {
    if(this.isPosizioneCorretta(this.posizionePartenza) && this.isPosizioneCorretta(this.posizioneArrivo)){

      var casellaPartenza: number[] = [this.charToNumber[this.posizionePartenza[0]],Number(this.posizionePartenza[1])-1];
      if(this.posizionePartenza !== this.posizioneArrivo){

        var casellaArrivo: number[] = [this.charToNumber[this.posizioneArrivo[0]],Number(this.posizioneArrivo[1])-1];
        if(this.scacchiera[casellaPartenza[1]][casellaPartenza[0]] !== ''){
          let errorMove = this.muoviPezzo(this.scacchiera[casellaPartenza[1]][casellaPartenza[0]],casellaArrivo,casellaPartenza);
          if(errorMove === ""){
            //this.turno === "r" ? this.turno = "b" : this.turno = "r";
              this.error = "";
            
            
            (<HTMLInputElement>document.getElementById("inputStart")).value = "";
            (<HTMLInputElement>document.getElementById("inputArrive")).value = "";
          }else{
            this.error = errorMove;
          }
        }else{
          this.error = "non puoi muovere una casella vuota <br> riprovare";
        }
      }else{
        this.error = "Non puoi muovere nella</br> stessa casella il pezzo";
      }
    }else{
      this.error = "Inserire una posizione</br> esistente nella scacchiera";
    }
    
  }

  public partenza(x:any) {
    this.posizionePartenza = x.target.value;
  }

  public arrivo(x:any) {
    this.posizioneArrivo = x.target.value;
   
  }

  public isPosizioneCorretta(posizione:any) : boolean{
    if(isNaN(posizione[0]) && (posizione[0] >= 'A' && posizione[0] <='H')){
      if(!isNaN(posizione[1]) && (posizione[1] >= '1' && posizione[1] <='8')){
        return true;
      }else{
        return false;
      }

    }else{
      return false;
    }
  }

  public allMoves(pedone:string, casellaArr:number[]) : Moves[]{
  
    var i =0;
    var correctMove :Moves[]=[];
    //MOVIMENTI DEL PEDONE
    if(pedone.substring(0,1) === 'P'){
      if(this.scacchiera[casellaArr[1]+1][casellaArr[0]-1] || this.scacchiera[casellaArr[1]+1][casellaArr[0]-1] === '') {
       let a:number[]= [];
       a[0] = casellaArr[0]-1;
       a[1] = casellaArr[1]+1
        correctMove[i] = {
          move :a
        } ;
        i++;
      }
  
      if(this.scacchiera[casellaArr[1]+1][casellaArr[0]+1] || this.scacchiera[casellaArr[1]+1][casellaArr[0]+1] === '') {
        let a:number[]= [];
       a[0] = casellaArr[0]+1;
       a[1] = casellaArr[1]+1
        correctMove[i] = {
          move :a
        } ;
        i++;
      }
      return correctMove; 
      //MOVIMENTI DEL CAVALLO
    }else if(pedone.substring(0,1) === 'C'){
      if(this.scacchiera[casellaArr[1]-2][casellaArr[0]+1] || this.scacchiera[casellaArr[1]-2][casellaArr[0]+1] === '') {
        let a:number[]= [];
       a[0] = casellaArr[0]+1;
       a[1] = casellaArr[1]-2
        correctMove[i] = {
          move :a
        } ;
        i++;
      }
      if(this.scacchiera[casellaArr[1]+2][casellaArr[0]+1] || this.scacchiera[casellaArr[1]+2][casellaArr[0]+1] === '' ){
        let a:number[]= [];
       a[0] = casellaArr[0]+1;
       a[1] = casellaArr[1]+2
        correctMove[i] = {
          move :a
        } ;
        i++;
      }  
      if(this.scacchiera[casellaArr[1]+2][casellaArr[0]-1]|| this.scacchiera[casellaArr[1]+2][casellaArr[0]-1] === '' ){
        let a:number[]= [];
       a[0] = casellaArr[0]-1;
       a[1] = casellaArr[1]+2
        correctMove[i] = {
          move :a
        } ;
        i++;
      }   
      if(this.scacchiera[casellaArr[1]-2][casellaArr[0]-1] || this.scacchiera[casellaArr[1]-2][casellaArr[0]-1] === '' ){
        let a:number[]= [];
       a[0] = casellaArr[0]-1;
       a[1] = casellaArr[1]-2
        correctMove[i] = {
          move :a
        } ;
        i++;
      }  
      if(this.scacchiera[casellaArr[1]-1][casellaArr[0]+2] || this.scacchiera[casellaArr[1]-1][casellaArr[0]+2] === '' ){
        let a:number[]= [];
       a[0] = casellaArr[0]-1;
       a[1] = casellaArr[1]+2
        correctMove[i] = {
          move :a
        } ;
        i++;
      }  
      if(this.scacchiera[casellaArr[1]-1][casellaArr[0]-2] || this.scacchiera[casellaArr[1]-1][casellaArr[0]-2] === ''){
        let a:number[]= [];
       a[0] = casellaArr[0]-2;
       a[1] = casellaArr[1]-1
        correctMove[i] = {
          move :a
        } ;
        i++;
      }  
      if( this.scacchiera[casellaArr[1]+1][casellaArr[0]+2] || this.scacchiera[casellaArr[1]+1][casellaArr[0]+2] === ''){
        let a:number[]= [];
       a[0] = casellaArr[0]+2;
       a[1] = casellaArr[1]+1
        correctMove[i] = {
          move :a
        } ;
        i++;
      }  
      if( this.scacchiera[casellaArr[1]+1][casellaArr[0]-2] || this.scacchiera[casellaArr[1]+1][casellaArr[0]-2] === ''){
        let a:number[]= [];
       a[0] = casellaArr[0]-2;
       a[1] = casellaArr[1]+1
        correctMove[i] = {
          move :a
        } ;
        i++;
      }
      
      return correctMove; 
    }
    return correctMove; 
  }
  //this.allMoves(pedone,casellaArr);
  

  public muoviPezzo(pedone:string,casellaArr:number[],casellaPart:number[]): string{
      if(pedone.substring(1,2) !== this.turno){
        return "Stai muovendo un pezzo dell'avversario";
      }
    if(pedone === 'Pr' || pedone === 'Pb' ){
      if(this.rulesService.isMovePedone(casellaPart,casellaArr,this.turno) ){
        if(pedone.substring(1,2) !== this.scacchiera[casellaArr[1]][casellaArr[0]].substring(1,2)){
          this.scacchiera[casellaArr[1]][casellaArr[0]] = this.scacchiera[casellaPart[1]][casellaPart[0]];
          this.scacchiera[casellaPart[1]][casellaPart[0]] = '';
          if(this.rulesService.isScacco(pedone,casellaArr,this.scacchiera,this.allMoves(pedone,casellaArr))){
            this.flagScacco=true;
          }else{
            this.flagScacco=false;
          }
          return "";
        }
        return "Non puoi attaccare una tua pedina!";
        
      }else {
        return "Il pedone non può muoversi così!";
      }
    }else if(pedone === 'Cr' || pedone === 'Cb'){
      if(this.rulesService.isMoveCavallo(casellaPart, casellaArr,this.turno)){
        if(pedone.substring(1,2) !== this.scacchiera[casellaArr[1]][casellaArr[0]].substring(1,2)){
          this.scacchiera[casellaArr[1]][casellaArr[0]] = this.scacchiera[casellaPart[1]][casellaPart[0]];
          this.scacchiera[casellaPart[1]][casellaPart[0]] = '';
          if(this.rulesService.isScacco(pedone,casellaArr,this.scacchiera,this.allMoves(pedone,casellaArr))){
            this.flagScacco=true;
          }else{
            this.flagScacco=false;
          }
          return "";
        }
        return "Non puoi attaccare una tua pedina!";
      }else {
        return "Il cavallo non può muoversi così!";
      }
    }else if(pedone === 'Kr' || pedone === 'Kb'){
      if(this.rulesService.isMoveKing(casellaPart, casellaArr, this.turno)){
        if(pedone.substring(1,2) !== this.scacchiera[casellaArr[1]][casellaArr[0]].substring(1,2)){
          this.scacchiera[casellaArr[1]][casellaArr[0]] = this.scacchiera[casellaPart[1]][casellaPart[0]];
          this.scacchiera[casellaPart[1]][casellaPart[0]] = '';
          return "";
        }
        return "Non puoi attaccare una tua pedina!";
      }
      return "Il re non può muoversi così!";
    }
    return "";
  }
  
}
