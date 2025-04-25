import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const LocalizacaoAtual = () => {
  const [localizacao, setLocalizacao] = useState(null);

  useEffect(() => {
    const pedirPermissao = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Permissão de localização negada');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        (pos) => {
          setLocalizacao(pos.coords);
        },
        (erro) => {
          console.error(erro);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    pedirPermissao();
  }, []);

  return (
    <View style={styles.container}>
      {localizacao ? (
        <>
          <Text style={styles.texto}>Latitude: {localizacao.latitude}</Text>
          <Text style={styles.texto}>Longitude: {localizacao.longitude}</Text>
        </>
      ) : (
        <Text style={styles.texto}>Buscando localização...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  texto: { fontSize: 16, margin: 10 },
});

export default LocalizacaoAtual;
