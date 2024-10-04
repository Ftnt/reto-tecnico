export class PersonajeTransformador {
  transformar(data: any) {
    return {
      nombre: data.name,
      altura: data.height,
      masa: data.mass,
      color_pelo: data.hair_color,
      color_piel: data.skin_color,
      color_ojos: data.eye_color,
      año_nacimiento: data.birth_year,
      genero: data.gender,
      mundo_natal: data.homeworld,
      creado: data.created,
      editado: data.edited,
      url: data.url,
    };
  }
}
