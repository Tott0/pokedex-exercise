import { string } from "prop-types";

export class Pokemon {
  id?: number;
  name?: string;
  img?: string;
  url?: string;
  types?: Type[];
  stats?: Stat[];
  abilities?: Ability[];

  constructor(pokemon?: Partial<Pokemon>) {
    if(pokemon){
      ({
        id: this.id,
        name: this.name,
        img: this.img,
        url: this.url,
        stats: this.stats,
        types: this.types,
        abilities: this.abilities,
      } = pokemon);
    }
    if(this.name){
      this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }
    // Object.assign(this, pokemon);
  }
}

export class Stat{
  name?: string;
  value?: number;
  constructor(stat?: Partial<Stat>) {
    if(stat){
      ({
        value: this.value,
        name: this.name,
      } = stat);
    }
  }
}

export class Type {
  id?: number;
  name?: string;
  url?: string;
  damageRelations?: number[];

  constructor(type?: Partial<Type>) {
    if(type){
      ({
        id: this.id,
        name: this.name,
        url: this.url,
        damageRelations: this.damageRelations,
      } = type);
    }
    if(this.name){
      this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }
    // Object.assign(this, type);
  }
}

export class Ability {
  id?: number;
  name?: string;
  url?: string;
  shortEffect?: string;

  constructor(ability?: Partial<Ability>) {
    if(ability){
      ({
        id: this.id,
        name: this.name,
        url: this.url,
        shortEffect: this.shortEffect,
      } = ability);
    }
    if(this.name){
      this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }
    // Object.assign(this, ability);
  }
}