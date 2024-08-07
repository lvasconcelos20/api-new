import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getNewsByQuery } from "../../../lib/api/api";
import { useRouter } from "expo-router";

const AllNews = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const router = useRouter();

  const { isLoading, data, error } = useQuery({
    queryKey: ["everything", searchQuery],
    queryFn: () => getNewsByQuery(searchQuery || "latest"),
    enabled: !!searchQuery,
  });

  const handleSearch = () => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches]);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4c669f" />
        <Text style={styles.loadingText}>Carregando notícias...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Erro ao carregar notícias: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Últimas Notícias</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar notícias..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Seach</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recentSearchesContainer}>
        <Text style={styles.recentSearchesTitle}>Buscas Recentes</Text>
        {recentSearches.map((search, index) => (
          <TouchableOpacity key={index} onPress={() => setSearchQuery(search)}>
            <Text style={styles.recentSearchItem}>{search}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {data && data.articles ? (
        <FlatList
          data={data.articles}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.articleContainer}
              onPress={() =>
                router.push({
                  pathname: `/news/details/[id]${encodeURIComponent(item.id)}`,
                  params: {
                    title: item.title,
                    description: item.description,
                    content: item.content,
                    urlToImage: item.urlToImage,
                  },
                })
              }
            >
              {item.urlToImage && (
                <Image
                  source={{ uri: item.urlToImage }}
                  style={styles.articleImage}
                />
              )}
              <View style={styles.textContainer}>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <Text style={styles.articleDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>Nenhuma notícia encontrada.</Text>
      )}
    </View>
  );
};

export default AllNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  searchButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#4c669f",
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  recentSearchesContainer: {
    marginTop: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  recentSearchesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  recentSearchItem: {
    fontSize: 16,
    color: "#4c669f",
    paddingVertical: 4,
  },
  articleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  articleImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  articleDescription: {
    fontSize: 14,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#4c669f",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#d9534f",
    textAlign: "center",
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 16,
  },
});
