import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { collection, getDocs, orderBy, query, onSnapshot } from 'firebase/firestore';

import FarmItem from './FarmItem';
import { firestoreDB } from '../firebase';

type DocDataType = {
  id?: string;
  displayName?: string;
  image?: string;
  name?: string;
  phone?: string;
  createdDate?: string | any;
  openHours?: string;
  creator?: string;
};

const FarmsList = () => {
  const [data, setData] = useState<DocDataType[]>([]);
  console.log(data);

  //fetch data list from firestore
  useEffect(() => {
    (async () => {
      try {
        const docsSnap = await getDocs(query(collection(firestoreDB, 'farms'), orderBy('createdDate', 'desc')));
        const docsDataArray: DocDataType[] = [];

        docsSnap.forEach((doc) => {
          const oldData: DocDataType = doc.data();
          docsDataArray.push({ ...oldData, id: doc.id, createdDate: doc.data().createdDate.toDate().toLocaleDateString() });
        });
        setData(docsDataArray);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  //for onSnapShot listener
  useEffect(() => {
    const q = query(collection(firestoreDB, 'farms'), orderBy('createdDate', 'desc'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const docsDataArray: DocDataType[] = [];

      querySnapshot.forEach((doc) => {
        docsDataArray.push({ ...doc.data(), id: doc.id, createdDate: doc.data().createdDate.toDate().toLocaleDateString() });
      });
      console.log('again');
      setData(docsDataArray);
    });

    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.listHeader}>
        Total {data.length} {data.length > 0 ? 'farms' : 'farm'}
      </Text>
      {!!(data.length > 0) && (
        <FlatList
          style={styles.flatListContainer}
          data={data}
          renderItem={({ item }) => <FarmItem key={item.id} {...item} />}
          keyExtractor={(item) => item.id as string}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContentContainer}
        />
      )}
    </View>
  );
};
export default FarmsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    borderRadius: 10,
  },
  flatListContainer: {
    flex: 1,
    borderRadius: 10,
  },
  flatListContentContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  listHeader: {
    margin: 10,
    marginBottom: 0,
    fontWeight: 'bold',
  },
});
