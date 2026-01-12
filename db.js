// Fake in-memory database

let fakeData = [
  {
    _id: "1",
    name: "John",
    email: "john@example.com",
    age: 25
  },
  {
    _id: "2",
    name: "Sara",
    email: "sara@example.com",
    age: 30
  }
];

const db = {
  collection: () => ({
    find: () => ({
      toArray: async () => fakeData
    }),

    findOne: async (query) => {
      return fakeData.find(item => item._id === query._id);
    },

    insertOne: async (data) => {
      const newData = { _id: Date.now().toString(), ...data };
      fakeData.push(newData);
      return { acknowledged: true, insertedId: newData._id };
    },

    updateOne: async (query, update) => {
      const index = fakeData.findIndex(item => item._id === query._id);
      if (index === -1) return { matchedCount: 0 };

      fakeData[index] = { ...fakeData[index], ...update.$set };
      return { matchedCount: 1, modifiedCount: 1 };
    },

    deleteOne: async (query) => {
      const lengthBefore = fakeData.length;
      fakeData = fakeData.filter(item => item._id !== query._id);

      return {
        deletedCount: lengthBefore - fakeData.length
      };
    }
  })
};

export default db;
