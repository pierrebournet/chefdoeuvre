export class CreateAddressDto {
  userId: number; // ID de l'utilisateur associé à cette adresse
  street: string; // Rue de l'adresse
  city: string; // Ville de l'adresse
  zip_code: string; // Code postal de l'adresse
  country: string; // Pays de l'adresse
}
