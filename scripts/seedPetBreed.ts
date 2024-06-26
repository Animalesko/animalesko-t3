import { PrismaClient } from "@prisma/client";

const fciBreeds = [
  "Labrador Retriever",
  "Golden Retriever",
  "Pastor Alemão",
  "Bulldog",
  "Beagle",
  "Poodle",
  "Rottweiler",
  "Boxer",
  "Dachshund",
  "Shih Tzu",
  "Schnauzer",
  "Yorkshire Terrier",
  "Chihuahua",
  "Border Collie",
  "Cocker Spaniel",
  "Dobermann",
  "Husky Siberiano",
  "Pug",
  "Pastor Australiano",
  "Maltês",
  "Buldogue Francês",
  "Akita",
  "Cocker Spaniel Inglês",
  "Pomeranian",
  "Dálmata",
  "Bichon Frisé",
  "Lhasa Apso",
  "West Highland White Terrier (Westie)",
  "São Bernardo",
  "Bernese Mountain Dog",
  "Boston Terrier",
  "Weimaraner",
  "American Staffordshire Terrier",
  "Bloodhound",
  "Basenji",
  "Samoyed",
  "Bullmastiff",
  "Bull Terrier",
  "Cairn Terrier",
  "Cão de Montanha dos Pireneus",
  "Cavalier King Charles Spaniel",
  "Clumber Spaniel",
  "English Springer Spaniel",
  "Fox Terrier",
  "Great Dane (Dog Alemão)",
  "Greyhound",
  "Irish Setter",
  "Jack Russell Terrier",
  "Kerry Blue Terrier",
  "Keeshond",
  "Lhasa Apso",
  "Maltipoo",
  "Mastiff",
  "Newfoundland",
  "Papillon",
  "Pekingese",
  "Petit Basset Griffon Vendéen",
  "Pit Bull Terrier",
  "Plott Hound",
  "Portuguese Water Dog",
  "Pudelpointer",
  "Puli",
  "Rhodesian Ridgeback",
  "Rough Collie",
  "Saluki",
  "Samoyed",
  "Scottish Terrier",
  "Shar-Pei",
  "Shetland Sheepdog",
  "Shiba Inu",
  "Siberian Husky",
  "Silky Terrier",
  "Skye Terrier",
  "Soft Coated Wheaten Terrier",
  "Staffordshire Bull Terrier",
  "Sussex Spaniel",
  "Tibetan Mastiff",
  "Tibetan Spaniel",
  "Tibetan Terrier",
  "Vizsla",
  "Welsh Corgi (Cardigan)",
  "Welsh Corgi (Pembroke)",
  "West Highland White Terrier",
  "Whippet",
  "Wire Fox Terrier",
  "Xoloitzcuintli",
  "Yorkshire Terrier",
  "Affenpinscher",
  "Alaskan Malamute",
  "American Eskimo Dog",
  "Anatolian Shepherd Dog",
  "Australian Terrier",
  "Belgian Malinois",
  "Belgian Sheepdog",
  "Belgian Tervuren",
  "Black and Tan Coonhound",
  "Bloodhound",
  "Border Terrier",
  "Boykin Spaniel",
  "Brussels Griffon",
  "Desconhecido",
];

const main = async () => {
  const prisma = new PrismaClient();

  await prisma.petBreed.createMany({
    data: fciBreeds.map((breed) => ({
      name: breed,
    })),
  });

  const breeds = await prisma.petBreed.findMany();
  console.log(JSON.stringify(breeds));
};

main().catch(console.error);
