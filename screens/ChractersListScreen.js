import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const endpoint = 'https://rickandmortyapi.com/api/character'

export default function ChractersList({navigation}) {
  const [ list, setList ] = useState([]);
  const [ loading, setLoading ] = useState(true);

    useEffect(() => {

            fetch(endpoint)
                .then(resposta => resposta.json())
                    .then( json => {
                        setList(json.results);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error("Erro: ", err);
                        setLoading(false);
                    });
    }, [endpoint]);

    if (loading) {
        return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#08C952" />
        <Text style={styles.loadingText}>Carregando personagens...</Text>
      </View>
    );
    }

    const ChracterCard = ({ item }) => (
        <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('CharacterDetailsScreen', { characterId: item.id })}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>Status: 
            <Text style={[
                styles.statusValue, 
                item.status === 'Alive' ? styles.alive : 
                item.status === 'Dead' ? styles.dead : styles.unknown
            ]}>
                {item.status}
            </Text>
        </Text>
        <Text style={styles.species}>Espécie: {item.species}</Text>
      </View>
    </TouchableOpacity>
    );

  return (
    <FlatList style={styles.list} data={list} renderItem={({ item }) => <ChracterCard item={item} />} 
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.flatListContent}
    />
  )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: '#121212',
    },
    flatListContent: {
        padding: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#2C2C2C',
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#08C952', 
    },
    image: {
        width: 100, 
        height: 100,
    },
    infoContainer: {
        padding: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FCE46D',
    },
    status: {
        fontSize: 14,
        color: 'white',
    },
    statusValue: {
        fontWeight: 'bold',
        marginLeft: 5,
    },
    alive: {
        color: '#00FF00', 
    },
    dead: {
        color: 'red', 
    },
    unknown: {
        color: '#ffa500', 
    },
    species: {
        fontSize: 14,
        color: 'white', 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    loadingText: {
        color: '#08C952', 
        marginTop: 10,
        fontSize: 16,
    }
});