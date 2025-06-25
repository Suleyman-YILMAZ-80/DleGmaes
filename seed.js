const { PrismaClient } = require('@prisma/client');
const champions = require('./data/champions.json');
const prisma = new PrismaClient();

async function main() {
  for (const champ of champions) {
    await prisma.champion.create({
      data: {
        ...champ,
        positions: champ.positions,
        species: champ.species,
        region: champ.region
      },
    });
  }
  console.log("Şampiyon verileri başarıyla eklendi!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
