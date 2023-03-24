import { Injectable } from '@angular/core';
type Moves = {
  move:number[];
}
@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor() { }

  public isMoveCavallo(casellaPart:number[], casellaArr:number[],turno:string) : boolean{
    if((casellaArr[0] === casellaPart[0]+1 || casellaArr[0]=== casellaPart[0]-1) && (casellaArr[1] === casellaPart[1]+2 || casellaArr[1] === casellaPart[1]-2 ) ){
      return true;
    }else if((casellaArr[0] === casellaPart[0]+2 || casellaArr[0]=== casellaPart[0]-2) && (casellaArr[1] === casellaPart[1]+1 || casellaArr[1] === casellaPart[1]-1 ) ){
      return true;
    }
    return false;
  }

  public isMovePedone(casellaPart:number[], casellaArr:number[],turno:string):boolean{
    if(turno === "b"){
      if(casellaArr[0] === casellaPart[0] && casellaArr[1] === casellaPart[1] +1 ){
        return true;
      }
      return false;
    }else if(turno === "r"){
      if(casellaArr[0] === casellaPart[0] && casellaArr[1] === casellaPart[1] -1 ){
        return true;
      }
      return false;
    }
    return false;
  }
  
  public isMoveKing(casellaPart:number[], casellaArr:number[], turno:string):boolean{
    if(((casellaArr[0] === casellaPart[0]+1  ||casellaArr[0] === casellaPart[0]-1 ) &&
   (casellaArr[1] === casellaPart[1]+1  ||casellaArr[1] === casellaPart[1]-1 )) || ((casellaArr[0] === casellaPart[0]) && (casellaArr[1] === casellaPart[1]+1 || casellaArr[1]=== casellaPart[1]-1))
    || ((casellaArr[0] === casellaPart[0]+1 || casellaArr[0] === casellaPart[0]-1) && (casellaArr[1] === casellaPart[1]))){
      return true;
    }
    return false;
  }

  public isScacco(pedone:string, casellaArr:number[],scacchiera:string[][], possibleMoves:Moves[]):boolean{
   
    let scacco = false
      
    if(pedone.substring(1,2) === 'r'){
      possibleMoves.forEach((pedina) => {
        if(scacchiera[pedina.move[1]][pedina.move[0]] === 'Kb'){
          scacco = true;

        }
      })
      return scacco;
    }else{
      possibleMoves.forEach((pedina) => {
        if(scacchiera[pedina.move[1]][pedina.move[0]] === 'Kr'){
          scacco = true;
        }
      })
      return scacco;
    }
    
    
  }
}
