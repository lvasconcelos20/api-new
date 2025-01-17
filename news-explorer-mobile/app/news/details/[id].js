import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";

const NewsDetails = () => {
  const { title, content, urlToImage, description, source, url } = useLocalSearchParams();
  const [showFullContent, setShowFullContent] = useState(false);

  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const displayContent = showFullContent ? content : `${content?.substring(0, 200)}...`;

  // Função para abrir a URL
  const handleOpenURL = () => {
    if (url) {
      Linking.openURL(url);
    }
  };

  console.log({
    title,
    content,
    urlToImage,
    description,
    source,
    url,
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {urlToImage && (
        <Image source={{ uri: urlToImage }} style={styles.image} />
      )}
      <Text style={styles.source}>Fonte: {source}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.content}>{displayContent}</Text>
      {content?.length > 200 && (
        <TouchableOpacity onPress={handleToggleContent}>
          <Text style={styles.showMoreButton}>
            {showFullContent ? "Mostrar menos" : "Ver mais"}
          </Text>
        </TouchableOpacity>
      )}
      {url && (
        <TouchableOpacity style={styles.readMoreButton} onPress={handleOpenURL}>
          <Text style={styles.readMoreButtonText}>Ler mais</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  source: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  content: {
    fontSize: 14,
    color: "#555",
  },
  showMoreButton: {
    fontSize: 16,
    color: "#1e90ff",
    textAlign: "center",
    marginTop: 10,
  },
  readMoreButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1e90ff",
    borderRadius: 5,
    alignItems: "center",
  },
  readMoreButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
