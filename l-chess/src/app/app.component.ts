import { Component } from '@angular/core';
import { appService } from './app.service';
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
  constructor(private appService: appService) {
    
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
    console.log("DATA?",data);
    this.date =  data.results.sunrise;
  }
  public sposta() {
    if(this.isPosizioneCorretta(this.posizionePartenza) && this.isPosizioneCorretta(this.posizioneArrivo)){

      var casellaPartenza: number[] = [this.charToNumber[this.posizionePartenza[0]],Number(this.posizionePartenza[1])-1];
      if(this.posizionePartenza !== this.posizioneArrivo){

        var casellaArrivo: number[] = [this.charToNumber[this.posizioneArrivo[0]],Number(this.posizioneArrivo[1])-1];
        if(this.scacchiera[casellaPartenza[1]][casellaPartenza[0]] !== ''){

          if(this.muoviPezzo(this.scacchiera[casellaPartenza[1]][casellaPartenza[0]],casellaArrivo,casellaPartenza)){
            //this.turno === "r" ? this.turno = "b" : this.turno = "r";
            if(this.flagScacco === true){
              this.error = "SEI SOTTO SCACCO!";
            }else{
              this.error = "";
            }
            
            (<HTMLInputElement>document.getElementById("inputStart")).value = "";
            (<HTMLInputElement>document.getElementById("inputArrive")).value = "";
          }else{
            this.error = "Il pezzo selezionato non può muoversi in questo modo, riprovare";
          }
        }else{
          this.error = "non puoi muovere una casella vuota <br> riprovare";
        }
      }else{
        this.error = "Non puoi muovere nella<br> stessa casella il pezzo";
      }
    }else{
      this.error = "Inserire una posizione<br> esistente nella scacchiera";
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

  public isMoveCavallo(casellaPart:number[], casellaArr:number[]) : boolean{
    if((casellaArr[0] === casellaPart[0]+1 || casellaArr[0]=== casellaPart[0]-1) && (casellaArr[1] === casellaPart[1]+2 || casellaArr[1] === casellaPart[1]-2 ) ){
      return true;
    }else if((casellaArr[0] === casellaPart[0]+2 || casellaArr[0]=== casellaPart[0]-2) && (casellaArr[1] === casellaPart[1]+1 || casellaArr[1] === casellaPart[1]-1 ) ){
      return true;
    }
    return false;
  }
  public isMovePedone(casellaPart:number[], casellaArr:number[]):boolean{
    if(this.turno === "b"){
      if(casellaArr[0] === casellaPart[0] && casellaArr[1] === casellaPart[1] +1 ){
        return true;
      }
      return false;
    }else if(this.turno === "r"){
      if(casellaArr[0] === casellaPart[0] && casellaArr[1] === casellaPart[1] -1 ){
        return true;
      }
      return false;
    }
    return false;
    
  }
  public isMoveKing(casellaPart:number[], casellaArr:number[]):boolean{
    if(((casellaArr[0] === casellaPart[0]+1  ||casellaArr[0] === casellaPart[0]-1 ) &&
   (casellaArr[1] === casellaPart[1]+1  ||casellaArr[1] === casellaPart[1]-1 )) || ((casellaArr[0] === casellaPart[0]) && (casellaArr[1] === casellaPart[1]+1 || casellaArr[1]=== casellaPart[1]-1))
    || ((casellaArr[0] === casellaPart[0]+1 || casellaArr[0] === casellaPart[0]-1) && (casellaArr[1] === casellaPart[1]))){
      return true;
    }
    return false;
  }
  public allMoves(pedone:string, casellaArr:number[]) : Moves[]{
  
    var i =0;
    var correctMove :Moves[]=[];
    if(pedone.substring(0,1) === 'P'){
      if(this.scacchiera[casellaArr[1]+1][casellaArr[0]-1] || this.scacchiera[casellaArr[1]+1][casellaArr[0]-1] === '') {
        console.log("ARRIVO QUI1?",casellaArr[0]+1);
       let a:number[]= [];
       a[0] = casellaArr[0]-1;
       a[1] = casellaArr[1]+1
        correctMove[i] = {
          move :a
        } ;
        i++;
      }
  
      if(this.scacchiera[casellaArr[1]+1][casellaArr[0]+1] || this.scacchiera[casellaArr[1]+1][casellaArr[0]+1] === '') {
        console.log("ARRIVO QUI2?");
        let a:number[]= [];
       a[0] = casellaArr[0]+1;
       a[1] = casellaArr[1]+1
        correctMove[i] = {
          move :a
        } ;
        i++;
      }
      console.log(correctMove);
      return correctMove; 
    }/*else if(pedone.substring(0,1) === 'C'){
      if(this.scacchiera[casellaArr[0]+1][casellaArr[1]-1] !== undefined) {
       
        correctMove[i][0] = casellaArr[0]+1;
        correctMove[i][1] = casellaArr[1]-1
        i++;
      }
  
      if(this.scacchiera[casellaArr[0]+1][casellaArr[1]+1] !== undefined) {
        correctMove[i][0] = casellaArr[0]+1;
        correctMove[i][1] = casellaArr[1]-1
        i++;
      }
      
      return correctMove; 
    }*/
    return correctMove; 
  }

  public isScacco(pedone:string, casellaArr:number[]):boolean{
    let possibleMoves:Moves[] = this.allMoves(pedone,casellaArr);
    let scacco = false
      
    if(pedone.substring(1,2) === 'r'){
      possibleMoves.forEach((pedina) => {
        console.log("scacchiera1",this.scacchiera[pedina.move[1]][pedina.move[0]]);
        if(this.scacchiera[pedina.move[1]][pedina.move[0]] === 'Kb'){
          scacco = true;

        }
      })
      return scacco;
    }else{
      possibleMoves.forEach((pedina) => {
        if(this.scacchiera[pedina.move[1]][pedina.move[0]] === 'Kr'){
          console.log("scacchiera1",this.scacchiera[pedina.move[1]][pedina.move[0]]);
          scacco = true;
        }
      })
      return scacco;
    }
    
    
  }

  public muoviPezzo(pedone:string,casellaArr:number[],casellaPart:number[]): boolean{
    //if(pedone.substring(1,2) !== this.turno){
   //   return false;
   // }
    if(pedone === 'Pr' || pedone === 'Pb' ){
      console.log("Arrivo1?");
      if(this.isMovePedone(casellaPart,casellaArr) ){
        console.log("Arrivo2?");
        if(pedone.substring(1,2) !== this.scacchiera[casellaArr[1]][casellaArr[0]].substring(1,2)){
          this.scacchiera[casellaArr[1]][casellaArr[0]] = this.scacchiera[casellaPart[1]][casellaPart[0]];
          this.scacchiera[casellaPart[1]][casellaPart[0]] = '';
          if(this.isScacco(pedone,casellaArr)){
            this.flagScacco=true;
          }else{
            this.flagScacco=false;
          }
          return true;
        }
        return false;
        
      }else {
        return false;
      }
    }else if(pedone === 'Cr' || pedone === 'Cb'){
      if(this.isMoveCavallo(casellaPart, casellaArr)){
        if(pedone.substring(1,2) !== this.scacchiera[casellaArr[1]][casellaArr[0]].substring(1,2)){
          this.scacchiera[casellaArr[1]][casellaArr[0]] = this.scacchiera[casellaPart[1]][casellaPart[0]];
          this.scacchiera[casellaPart[1]][casellaPart[0]] = '';
          if(this.isScacco(pedone,casellaArr)){
            this.flagScacco=true;
          }else{
            this.flagScacco=false;
          }
          return true;
        }
       
        return false;
      }else {
        return false;
      }
    }else if(pedone === 'Kr' || pedone === 'Kb'){
      if(this.isMoveKing(casellaPart, casellaArr)){
        if(pedone.substring(1,2) !== this.scacchiera[casellaArr[1]][casellaArr[0]].substring(1,2)){
          this.scacchiera[casellaArr[1]][casellaArr[0]] = this.scacchiera[casellaPart[1]][casellaPart[0]];
          this.scacchiera[casellaPart[1]][casellaPart[0]] = '';
          return true;
        }
        return false;
      }
      return false;
    }else{
      return false;
    }
    
  }
  
}
