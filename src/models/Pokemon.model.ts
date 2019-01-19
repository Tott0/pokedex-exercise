import { string } from "prop-types";

export class Pokemon {
  id?: string;
  name?: string;
  img?: string;
  url?: string;
  types?: Type[];
  stats?: number[];
  abilities?: Ability[];

  constructor(pokemon?: Partial<Pokemon>) {
    if(pokemon){
      ({
        id: this.id,
        name: this.name,
        img: this.img,
        url: this.url,
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

export class Type {
  id?: number;
  name?: string;
  url?: string;
  damageRelations?: [number];

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