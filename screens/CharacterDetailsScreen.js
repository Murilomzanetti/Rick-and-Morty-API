import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import portalImageSource from '../assets/Rick_And_Morty_Portal.jpg';

export default function CharacterDetails({navigation}) {
  const rota = useRoute();
  const { characterId } = rota.params;

  const [ character, setCharacter ] = useState(null);
  const[loading, setLoading ] = useState(true);

  const endpoint = `https://rickandmortyapi.com/api/character/${characterId}`;

  useEffect(() => {
    fetch(endpoint)
      .then(resposta => resposta.json())
        .then(json => {
          setCharacter(json);
          setLoading(false);
        })
        .catch(err => {
          console.error("Erro: ", err);
          setLoading(false);
        });
  }, [endpoint]);

  if (loading) {
    return(
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color='#08C952' />
        <Text style={styles.loadingText}>Buscando detalhes do personagem...</Text>
      </View>
    );

    if (!character) {
      return <Text style={styles.errorText}>Personagem não encontrado.</Text>;
    }
  }
  return(
        <View style={styles.container}>
          <TouchableOpacity style={styles.goBackbutton} onPress={() => navigation.goBack()}>
            <Image source={portalImageSource} style={styles.portalImage}/>
            <Text style={styles.goBack}>Go back</Text>
          </TouchableOpacity>
          <Image source={{ uri: character.image }} style={styles.image} />
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.status}>Status:  
            <Text style={[
              styles.statusValue,
              character.status === 'Alive' ? styles.alive :
              character.status === 'Dead' ? styles.dead : styles.unknown
            ]}> 
              {character.status}
            </Text>
          </Text>
          <Text style={styles.species}>Espécie: {character.species}</Text>
          <Text style={styles.gender}>Gênero: {character.gender}</Text>
          <Text style={styles.origin}>Origem: {character.origin.name}</Text>
          <Text style={styles.location}>Localização: {character.location.name}</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 4,
        borderColor: '#08C952',
        marginTop: 10,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FCE46D',
        marginBottom: 20,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    loadingText: {
        color: '#08C952',
        marginTop: 10,
        fontSize: 16,
    },
    errorText: {
        color: '#FF0000',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
    },
    status: { 
        fontSize: 18,
        color: 'white',
    },
    species: {
        fontSize: 18,
        color: 'white',
    },
    gender: {
        fontSize: 18,
        color: 'white',
    },
    origin: {
        fontSize: 18,
        color: 'white',
    },
    location: {
        fontSize: 18,
        color: 'white',
    },
    statusValue: {
        fontWeight: 'bold',
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
    goBackbutton: {
      backgroundColor: '#08C952',
      borderRadius: 125,
      width: 150,
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
    },
    portalImage: {
        position: 'absolute',
        width: '100%', 
        height: '100%',
        resizeMode: 'cover',
    },
    goBack: {
      color: "white",
      fontSize: 18,
      fontWeight: 'bold',
    }
});