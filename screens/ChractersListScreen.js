import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const endpoint = 'https://rickandmortyapi.com/api/character'

export default function ChractersList() {
  const [ list, setList ] = useState([]);
  const [ loading, setloading ] = useState(true);

    useEffect(() => {

            fetch(endpoint)
                .then(resposta => resposta.json())
                    .then( json => setList(json.results))
                    .catch(err => console.error("Erro: ", err));
    }, [endpoint]);

    //const ChracterCard = ({ item }) => 

  return (
    <FlatList style={styles.list} data={list} renderItem={({ item }) => (
        <TouchableOpacity>
            <View>
                <Image source={{uri: item.image}} style={{ width: 100, height: 100 }} />
                <Text>Nome: {item.name}</Text>
                <Text>Status: {item.status}</Text>
            </View>
        </TouchableOpacity>
    )} />
  )
}

const styles = StyleSheet.create({
   
});
