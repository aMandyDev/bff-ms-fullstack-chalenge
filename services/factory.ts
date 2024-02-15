import pokemonService from "./pokemonService";

const factory = (dependencies:any) => ({
    pokemonService: pokemonService(dependencies),
});

export = factory;
