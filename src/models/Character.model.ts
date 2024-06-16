interface Origin {
    name: string;
}

export interface Character {
    id: string;
    name: string;
    status: string;
    image: string;
    species: string;
    gender: string;
    origin: Origin;
    isFavorite?: boolean;
}
