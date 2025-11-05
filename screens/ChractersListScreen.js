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
        <ActivityIndicator size="large" color="orange" />
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
      keyExtractor={item => item.id.toString()} // Garante chaves únicas
      contentContainerStyle={styles.flatListContent}
    />
  )
}

const styles = StyleSheet.create({
   list: {
        flex: 1,
        backgroundColor: '#262626',
    },
    flatListContent: {
        padding: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#444',
        borderRadius: 10,
        marginBottom: 15,
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
        color: '#fff',
    },
    status: {
        fontSize: 14,
        color: '#ccc',
    },
    statusValue: {
        fontWeight: 'bold',
        marginLeft: 5,
    },
    alive: {
        color: '#00ff00',
    },
    dead: {
        color: '#ff0000',
    },
    unknown: {
        color: '#ffa500',
    },
    species: {
        fontSize: 14,
        color: '#ccc',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#262626',
    },
    loadingText: {
        color: '#fff',
        marginTop: 10,
        fontSize: 16,
    }
});
