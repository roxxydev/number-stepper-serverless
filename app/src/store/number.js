import Db from '../store';
import { doc as fireStoreDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";

const fetchCurrentNumberValue = async () => {

  const q = query(collection(Db, 'Number'), where('name', '==', 'number'));
  const snapshot = await getDocs(q);

  let numberValue = 0;
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    numberValue = doc.data().value;
  });

  return numberValue;
};

const stepNumberValue = async (action) => {

  console.log('Action', action);
  if (!['increment', 'decrement', 'reset'].includes(action)) {
    throw new Error('Invalid step action. Value should either be increment or decrement only.');
  }

  const q = query(collection(Db, 'Number'), where('name', '==', 'number'));
  const snapshot = await getDocs(q);

  let stepValue = 0;
  if (action === 'increment') {
    stepValue = 1;
  }
  else if (action === 'decrement') {
    stepValue = -1;
  }

  let newNumberValue = 0;
  snapshot.forEach(async (doc) => {

    if (action !== 'reset') {
      const currentNumberValue = doc.data().value;
      newNumberValue = currentNumberValue + stepValue;
    }

    const numberRef = fireStoreDoc(Db, 'Number', doc.id);
    console.log(`Updating ${doc.id} with number: ${newNumberValue}`);
    await updateDoc(numberRef, {
      value: newNumberValue
    });
  });

  return newNumberValue;
};

export {
  fetchCurrentNumberValue,
  stepNumberValue
};
