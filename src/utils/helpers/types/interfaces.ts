export interface IFilms {
    title: string;
    release_date: string;
    director: string;
    producer: string;
    episode_id: string;
    characters: string[];
    url: string;
}

export interface ISpecies {
    name: string;
    classification: string;
    eye_colors: string;
    hair_colors: string;
    average_height: string;
    created: string;
    url: string;
}

export interface IPeople {
    name: string;
    birth_year: string;
    gender: string;
    hair_color: string;
    height: string;
    created: string;
    url: string;
}

export interface IStartships {
    name: string;
    model: string;
    class: string;
    passengers: string;
    length: string;
    character: string;
    url: string;
}