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
    name: { type: 'string' },
    wheather: { type: 'string' },
    type: { type: 'string' },
    connector: { type: 'string' },
    peopleNumber: { type: 'string' },
    carNumber: { type: 'string' },
    bikeNumber: { type: 'string' },
    tramNumber: { type: 'string' },
    parentBlock: { type: 'string' },
    description: { type: 'string', textSearch: true },
    spaceObjects: { type: 'string' },
    movingObjects: { type: 'string' },
    eventList: { type:"string[]" }
  },
  {
    dataStructure: 'JSON',
  }
);

export async function createBlock(data) {
    await connect();
    console.log(data)
    const repository = client.fetchRepository(schema)
    const block = repository.createEntity(data);
    const id = await repository.save(block);
    await repository.createIndex();
    return id;
}

export async function createIndex() {
  await connect();
  const repository = new Repository(schema, client);
  await repository.createIndex()
}

export async function searchBlocks(q) {
  await connect();
  const repository = new Repository(schema, client);
  await repository.createIndex();
  const blocks = await repository.search()
      .where('name').eq(q)
      .return.all();
  return blocks;
}

export async function searchChildren(q) {
  await connect();
  const repository = new Repository(schema, client);
  await repository.createIndex();
  const blocks = await repository.search()
      .where('parentBlock').eq(q)
      .return.all();
  return blocks? blocks:[];
}

export async function deleteBlock(q) {
  await connect();
  const repository = new Repository(schema, client);
  await repository.createIndex();
  const blocks = await repository.search()
      .where('name').eq(q)
      .return.all();
  console.log("Delete:", blocks);
  await repository.remove(blocks[0].entityId);
  return blocks;
}