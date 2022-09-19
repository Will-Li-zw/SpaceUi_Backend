import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

class block extends Entity {}
let schema = new Schema(
  block,
  {
    wheather: { type: 'string' },
    type: { type: 'string' },
    connector: { type: 'string' },
    peopleDensity: { type: 'string' },
    carDensity: { type: 'string' },
    bikeDensity: { type: 'string' },
    description: { type: 'string', textSearch: true },
    spaceObjects: { type: 'string' },
    movingObjects: { type: 'string' },
  },
  {
    dataStructure: 'JSON',
  }
);

export async function createBlock(data) {
    await connect();
  
    const repository = client.fetchRepository(schema)
  
    const block = repository.createEntity(data);
  
    const id = await repository.save(block);
    return id;
}